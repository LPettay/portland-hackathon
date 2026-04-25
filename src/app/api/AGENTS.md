# AGENTS.md — `src/app/api/`

Next.js API route handlers. Server-only.

## Index

### Files here

*(none yet)*

### Planned (not yet created)

| File | Method | Purpose | Tracked in |
|---|---|---|---|
| `generate/route.ts` | POST | `{ description: string }` → `{ templateId, palette, copy, icons }` | `docs/architecture.md` |

## Rules

- **Never expose the `OPENAI_API_KEY` to the client.** All LLM calls happen here.
- **Always validate input** with Zod before passing to the LLM.
- **Always validate LLM output** with Zod before returning to the client.
- **Use OpenAI structured outputs** (JSON mode + JSON schema). Never freeform text → JSON.parse.
- **Timeouts:** wrap LLM calls with a 15s timeout. The demo can't hang.

## Error handling

Return shape on error:

```json
{ "error": "human-readable message", "code": "MACHINE_READABLE_CODE" }
```

The client should show a friendly fallback (suggest a retry or pre-baked example).

---

<!-- last-reviewed: a9279ef -->
