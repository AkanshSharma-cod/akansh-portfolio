/**
 * Build-time embedding pipeline.
 *
 * Reads content/deep-dives/*.md, chunks them by heading, embeds each chunk with Gemini,
 * and upserts into Upstash Vector. Run with `npm run embed` whenever content changes.
 *
 * Requires (in .env or the shell): GEMINI_API_KEY, UPSTASH_VECTOR_REST_URL,
 * UPSTASH_VECTOR_REST_TOKEN. The Upstash index must be created with dimension 768 / COSINE.
 */
import 'dotenv/config';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { embed, EMBED_DIM } from '../lib/gemini';
import { getVectorIndex, type ChunkMetadata } from '../lib/upstash';

const __dirname = dirname(fileURLToPath(import.meta.url));
const deepDivesDir = resolve(__dirname, '../content/deep-dives');

const MAX_CHUNK_CHARS = 1800; // ~400-500 tokens
const OVERLAP_CHARS = 200;

interface Chunk {
  id: string;
  text: string;
  title: string;
  source: string;
}

/** Split markdown into heading-anchored sections, then size-bound each section. */
function chunkMarkdown(body: string): string[] {
  // Split on level-2/3 headings while keeping the heading line with its section.
  const sections = body
    .split(/\n(?=#{1,3}\s)/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  for (const section of sections) {
    if (section.length <= MAX_CHUNK_CHARS) {
      chunks.push(section);
      continue;
    }
    // Section too large: sliding window with overlap.
    let start = 0;
    while (start < section.length) {
      chunks.push(section.slice(start, start + MAX_CHUNK_CHARS));
      start += MAX_CHUNK_CHARS - OVERLAP_CHARS;
    }
  }
  return chunks;
}

function loadChunks(): Chunk[] {
  const files = readdirSync(deepDivesDir).filter((f) => f.endsWith('.md'));
  const all: Chunk[] = [];

  for (const file of files) {
    const raw = readFileSync(resolve(deepDivesDir, file), 'utf8');
    const { data, content } = matter(raw);
    const source = basename(file, '.md');
    const title = (data.title as string) || source;

    chunkMarkdown(content).forEach((text, i) => {
      all.push({ id: `${source}#${i}`, text: text.trim(), title, source });
    });
  }
  return all;
}

async function main() {
  console.log(`Embedding model dimension: ${EMBED_DIM}`);
  const chunks = loadChunks();
  console.log(`Loaded ${chunks.length} chunks from ${deepDivesDir}`);

  const index = getVectorIndex();

  // Embed sequentially to stay comfortably within free-tier rate limits.
  const vectors = [];
  for (const chunk of chunks) {
    const vector = await embed(chunk.text, 'RETRIEVAL_DOCUMENT');
    const metadata: ChunkMetadata = {
      text: chunk.text,
      title: chunk.title,
      source: chunk.source,
    };
    vectors.push({ id: chunk.id, vector, metadata });
    console.log(`  embedded ${chunk.id} (${chunk.text.length} chars)`);
  }

  // Deterministic IDs => re-running updates in place rather than duplicating.
  await index.upsert(vectors);
  console.log(`Upserted ${vectors.length} vectors into Upstash Vector.`);

  const info = await index.info();
  console.log(`Index now reports ${info.vectorCount} vectors.`);
}

main().catch((err) => {
  console.error('Embedding failed:', err);
  process.exit(1);
});
