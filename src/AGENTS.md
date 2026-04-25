# AGENTS.md — `src/`

Application source. Everything that ships to the user lives under here.

## Subdirectories

| Dir | Purpose |
|---|---|
| `app/` | Next.js App Router — pages, layouts, API routes |
| `components/` | Reusable React UI (input box, page chrome, loading states) |
| `templates/` | Hand-crafted SVG motion templates. **The moat.** |
| `lib/` | LLM client, prompt builders, utilities |
| `types/` | Shared TypeScript types and Zod schemas |

Each has its own `AGENTS.md` — read it before editing.

## Cross-cutting rules

- **Imports use `@/` alias** (mapped to `src/` in `tsconfig.json`).
- **Server vs client boundary:** keep LLM/API calls on the server. Templates render on the client (Framer Motion needs the browser).
- **No file should import from `app/` outside of `app/` itself.** `app/` depends on everything; nothing depends on `app/`.

## Dependency direction

```
app/  →  components/  →  templates/
   ↘                  ↗
       lib/  ←  types/
```

If you find yourself wanting to import upward, you've put something in the wrong place.
