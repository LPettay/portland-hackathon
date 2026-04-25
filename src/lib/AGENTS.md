# AGENTS.md — `src/lib/`

Utilities, the LLM client, and the prompt builder. Pure logic — no React.

## Index

### Files here

*(none yet)*

### Planned (not yet created)

| File | Purpose | Tracked in |
|---|---|---|
| `openai.ts` | Single OpenAI client instance, configured for structured outputs | `docs/architecture.md` |
| `prompt.ts` | Builds the system + user prompt from the input description | `docs/architecture.md` |
| `palette.ts` | Color manipulation helpers (e.g. derive accent from primary) | `docs/architecture.md` |
| `errors.ts` | Custom error classes (`LlmError`, `ValidationError`) | `docs/architecture.md` |

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

---

<!-- last-reviewed: a9279ef -->
