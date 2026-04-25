# AGENTS.md — `src/lib/`

Utilities, the LLM client, and the prompt builder. Pure logic — no React.

## Expected files (hackathon scope)

| File | Purpose |
|---|---|
| `openai.ts` | Single OpenAI client instance, configured for structured outputs |
| `prompt.ts` | Builds the system + user prompt from the input description |
| `palette.ts` | Color manipulation helpers (e.g. derive accent from primary) |
| `errors.ts` | Custom error classes (`LlmError`, `ValidationError`) |

## Rules

- **No React imports.** This directory must be importable from server-only code.
- **No `process.env` access except in `openai.ts`.** Centralize env reads.
- **Pure functions when possible.** Easier to reason about, easier to test if we get there.
- **Export named functions**, not default.

## Logging

Use `console.error` for failures with structured objects:

```ts
console.error('LLM call failed', { error: e, prompt: redacted(prompt) });
```

For a hackathon we don't need a logger lib. Don't add one.
