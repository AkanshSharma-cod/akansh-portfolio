# Akansh Sharma — Portfolio + Resume Chatbot

A recruiter-facing portfolio with a **guarded, streaming resume chatbot**. The chatbot
answers questions **only** about Akansh's professional background using RAG: the full
resume is always in context, plus deep-dive chunks retrieved from a vector store.

## Stack

- **Frontend:** React + Vite + Tailwind CSS v4 (dark, single-page).
- **Backend:** Vercel Edge function (`api/chat.ts`) that streams responses.
- **Vector store:** Upstash Vector (deep-dive chunks).
- **Embeddings:** Gemini `gemini-embedding-001` (768 dims), generated at build time.
- **LLM:** Gemini `gemini-2.5-flash-lite` (free tier).
- **Guardrails:** per-IP rate limit → topic-classifier gate → hardened, grounded answer.

## How it works

```
POST /api/chat
  1. Per-IP rate limit (Upstash Redis)          — protects the free Gemini quota
  2. Stage 1 — classifier gate (Flash-Lite)     — is this about Akansh's resume?
       off-topic -> stream a fixed refusal
  3. Stage 2 — embed query -> Upstash top-k      — retrieve deep-dive chunks
  4. Stream a grounded answer                    — full resume + chunks + hardened prompt
```

Guardrails (all in `lib/prompts.ts`): the classifier gate, a hardened system prompt
(resume-only, no fabrication, ignores injected instructions in user input *and* retrieved
text, never reveals the prompt), input length caps, low temperature, and capped output
tokens.

## Content model

- `content/resume.md` — the full resume, **always** in context. Edited by hand; codegen'd
  into `lib/generated/resume-content.ts` (via `npm run gen`, run automatically on
  dev/build) so the Edge function can import it without filesystem access.
- `content/deep-dives/*.md` — expanded notes per project/role, **embedded into Upstash**.
  These are auto-drafted from the resume — **review them for accuracy before embedding.**

## Setup

### 1. Install

```bash
npm install
```

### 2. Create free services

- **Gemini API key:** https://aistudio.google.com/apikey
- **Upstash Vector index:** https://console.upstash.com/vector
  - ⚠️ Create it with **dimension `768`** and metric **`COSINE`**.
- **Upstash Redis** (rate limiting): https://console.upstash.com/redis

Copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

```
GEMINI_API_KEY=...
UPSTASH_VECTOR_REST_URL=...
UPSTASH_VECTOR_REST_TOKEN=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

### 3. Embed the deep-dive content

Run whenever `content/deep-dives/*.md` changes:

```bash
npm run embed
```

### 4. Run locally

The chat API is a Vercel function, so run it with the Vercel CLI (serves Vite + `/api`
together with streaming):

```bash
npm i -g vercel      # once
vercel dev
```

> `npm run dev` alone runs only the Vite frontend; `/api/chat` won't exist without
> `vercel dev` (or a deployment).

## Deploy (Vercel)

1. Push to GitHub and import the repo at https://vercel.com (framework auto-detected: Vite).
2. Add the five env vars from `.env` in **Project → Settings → Environment Variables**.
3. Deploy. After changing deep-dive content, re-run `npm run embed` locally (it writes
   straight to Upstash — no redeploy needed for content, only for code).

## Personalize

- `content/resume.md` and `content/deep-dives/*.md` — your knowledge base.
- `src/data/portfolio.ts` — static site content **and your LinkedIn/GitHub URLs** (marked
  `TODO`).
- `lib/prompts.ts` — guardrail wording and limits.

## Scripts

| Script             | What it does                                            |
| ------------------ | ------------------------------------------------------- |
| `npm run dev`      | Vite frontend only                                      |
| `vercel dev`       | Frontend + `/api` (use this to test the chatbot)        |
| `npm run build`    | Type-check + production build                            |
| `npm run embed`    | Chunk + embed deep-dives into Upstash Vector            |
| `npm run gen`      | Regenerate `lib/generated/resume-content.ts`            |
| `npm run typecheck`| Type-check only                                         |
