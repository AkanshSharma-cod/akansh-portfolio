/**
 * POST /api/chat — guarded, streaming resume chatbot.
 *
 * Pipeline:
 *   1. Per-IP rate limit (protects the free Gemini quota).
 *   2. Stage 1 — cheap classifier gate: is the question about Akansh's resume?
 *   3. Off-topic  -> stream a fixed refusal (no retrieval, no second model call).
 *   4. On-topic   -> embed query, retrieve deep-dive chunks, stream a grounded answer.
 *
 * Runs on the Vercel Edge runtime so responses can stream token-by-token.
 */
import { CHAT_MODEL, embed, getAI } from '../lib/gemini';
import { getRatelimit, getVectorIndex } from '../lib/upstash';
import { getResumeMarkdown } from '../lib/resume';
import {
  buildAnswerSystemInstruction,
  buildGateInput,
  GATE_SYSTEM_INSTRUCTION,
  GENERIC_ERROR_MESSAGE,
  MAX_HISTORY_TURNS,
  MAX_INPUT_CHARS,
  MAX_OUTPUT_TOKENS,
  OFF_TOPIC_REFUSAL,
  RATE_LIMIT_MESSAGE,
  RETRIEVAL_TOP_K,
  type RetrievedChunk,
} from '../lib/prompts';

export const config = { runtime: 'edge' };

interface ClientMessage {
  role: 'user' | 'assistant';
  content: string;
}

const encoder = new TextEncoder();

/** A streaming Response that emits a single fixed string (used for refusals/errors). */
function streamText(text: string, status = 200): Response {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? '127.0.0.1';
}

/** Convert UI messages to Gemini's content format, trimmed to recent turns. */
function toGeminiContents(messages: ClientMessage[]) {
  return messages.slice(-MAX_HISTORY_TURNS * 2).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

/** Fail-closed JSON parse of the gate response. Anything unexpected => off-topic. */
function parseOnTopic(raw: string): boolean {
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return false;
    const parsed = JSON.parse(match[0]);
    return parsed?.on_topic === true;
  } catch {
    return false;
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // --- Parse & validate input ------------------------------------------------
  let messages: ClientMessage[];
  try {
    const body = (await req.json()) as { messages?: ClientMessage[] };
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  const question = (lastUser?.content ?? '').trim().slice(0, MAX_INPUT_CHARS);
  if (!question) {
    return new Response('No question provided', { status: 400 });
  }

  // --- Rate limit ------------------------------------------------------------
  const limiter = getRatelimit();
  if (limiter) {
    const { success } = await limiter.limit(getClientIp(req));
    if (!success) return streamText(RATE_LIMIT_MESSAGE, 429);
  }

  try {
    const ai = getAI();

    // --- Stage 1: topic gate -------------------------------------------------
    const gate = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: buildGateInput(question),
      config: {
        systemInstruction: GATE_SYSTEM_INSTRUCTION,
        temperature: 0,
        maxOutputTokens: 20,
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    if (!parseOnTopic(gate.text ?? '')) {
      return streamText(OFF_TOPIC_REFUSAL);
    }

    // --- Stage 2: retrieve deep-dive chunks ----------------------------------
    let chunks: RetrievedChunk[] = [];
    try {
      const queryVector = await embed(question, 'RETRIEVAL_QUERY');
      const results = await getVectorIndex().query({
        vector: queryVector,
        topK: RETRIEVAL_TOP_K,
        includeMetadata: true,
      });
      chunks = results
        .map((r) => r.metadata)
        .filter((m): m is NonNullable<typeof m> => Boolean(m?.text))
        .map((m) => ({ title: m.title, source: m.source, text: m.text }));
    } catch (err) {
      // Retrieval is best-effort: the full resume is always in context anyway.
      console.error('Retrieval failed, continuing with resume only:', err);
    }

    // --- Stage 2: stream grounded answer -------------------------------------
    const systemInstruction = buildAnswerSystemInstruction(getResumeMarkdown(), chunks);
    const geminiStream = await ai.models.generateContentStream({
      model: CHAT_MODEL,
      contents: toGeminiContents(messages),
      config: {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of geminiStream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          console.error('Streaming error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Chat handler error:', err);
    return streamText(GENERIC_ERROR_MESSAGE, 500);
  }
}
