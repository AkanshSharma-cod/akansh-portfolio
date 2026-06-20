import { Index } from '@upstash/vector';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export interface ChunkMetadata {
  text: string;
  title: string;
  source: string;
  [key: string]: unknown;
}

let index: Index<ChunkMetadata> | null = null;

/** Lazily construct the Upstash Vector client. */
export function getVectorIndex(): Index<ChunkMetadata> {
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
  if (!url || !token) {
    throw new Error('UPSTASH_VECTOR_REST_URL / UPSTASH_VECTOR_REST_TOKEN are not set');
  }
  if (!index) index = new Index<ChunkMetadata>({ url, token });
  return index;
}

let ratelimit: Ratelimit | null = null;

/**
 * Per-IP rate limiter. Returns null if Redis is not configured, so the chat
 * endpoint degrades gracefully (no limiting) rather than failing.
 */
export function getRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(20, '10 m'),
      prefix: 'portfolio-chat',
      analytics: false,
    });
  }
  return ratelimit;
}
