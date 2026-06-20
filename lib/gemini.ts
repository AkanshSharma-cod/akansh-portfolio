import { GoogleGenAI } from '@google/genai';

export const CHAT_MODEL = 'gemini-2.5-flash-lite';
export const EMBED_MODEL = 'gemini-embedding-001';
export const EMBED_DIM = 768;

let client: GoogleGenAI | null = null;

/** Lazily construct the Gemini client so importing this module never throws at build time. */
export function getAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  if (!client) client = new GoogleGenAI({ apiKey });
  return client;
}

/** L2-normalize a vector. Recommended for Gemini embeddings truncated below 3072 dims. */
function normalize(values: number[]): number[] {
  let norm = 0;
  for (const x of values) norm += x * x;
  norm = Math.sqrt(norm);
  if (norm === 0) return values;
  return values.map((x) => x / norm);
}

export type EmbedTask = 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY';

export async function embed(text: string, taskType: EmbedTask): Promise<number[]> {
  const res = await getAI().models.embedContent({
    model: EMBED_MODEL,
    contents: text,
    config: { taskType, outputDimensionality: EMBED_DIM },
  });
  const values = res.embeddings?.[0]?.values;
  if (!values || values.length === 0) throw new Error('Gemini returned no embedding');
  return normalize(values);
}
