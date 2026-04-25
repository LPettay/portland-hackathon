# AGENTS.md — `src/`

Application source. Everything that ships to the user lives under here.

## Index

### Files here

*(none — `src/` is a container; all code lives in subdirectories)*

### Subdirectories

| Dir | AGENTS.md | Purpose |
|---|---|---|
| `app/` | [`app/AGENTS.md`](./app/AGENTS.md) | Next.js App Router — pages, layouts, API routes |
| `components/` | [`components/AGENTS.md`](./components/AGENTS.md) | Reusable React UI (input box, page chrome, loading states) |
| `templates/` | [`templates/AGENTS.md`](./templates/AGENTS.md) | Hand-crafted SVG motion templates. **The moat.** |
| `lib/` | [`lib/AGENTS.md`](./lib/AGENTS.md) | LLM client, prompt builders, utilities |
| `types/` | [`types/AGENTS.md`](./types/AGENTS.md) | Shared TypeScript types and Zod schemas |

Read each subdirectory's `AGENTS.md` before editing inside it.

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

---

<!-- last-reviewed: 1ec8a68 -->
