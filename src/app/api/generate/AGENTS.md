# AGENTS.md — `src/app/api/generate/`

POST handler that turns a one-sentence business idea into the data needed to render the pixel-art coffee mug hero.

## Index

### Files here

| File | Purpose |
|---|---|
| `route.ts` | `POST /api/generate` — validates the prompt, calls Gemini via `@/lib/gemini`, returns `{ businessName, tagline, primaryColor, accentColor }` |

## Contract

Request:

```json
{ "prompt": "A coffee shop in Portland" }
```

Response (200):

```json
{
  "businessName": "Mossy Mug Roasters",
  "tagline": "Fueling your Portland adventures one pour at a time.",
  "primaryColor": "#5C7C73",
  "accentColor": "#2E1B0F"
}
```

Error responses use `{ "error": "human-readable message" }` with HTTP 400 (bad input) or 500 (LLM/parse failure).

## Rules

- **Never expose `GEMINI_API_KEY` to the client.** This route is the only place it's read.
- **Validate prompt length** (≥ 3 chars, sliced to ≤ 500 chars before calling the LLM).
- **`runtime = "nodejs"`** because `@google/genai` needs Node APIs.
- **`maxDuration = 60`** to give Gemini 3.1 Pro Preview thinking time on Vercel.
- **Defensive parsing** of LLM output happens in `@/lib/gemini` (`safeStr` / `safeHex`); this route just surfaces any thrown error to the client.

## Notes

- Originally specified for OpenAI in `docs/architecture.md`; we pivoted to Gemini for the hackathon. Document hasn't been retconned.
- Single-template demo: there is no `templateId` field yet. The client always renders `coffee-shop`.

---

<!-- last-reviewed: e21fde4 -->
