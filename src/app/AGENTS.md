# AGENTS.md — `src/app/`

Next.js App Router. Pages, layouts, and API routes only.

## Index

### Files here

*(none yet — Next.js app not scaffolded)*

### Subdirectories

| Dir | AGENTS.md | Purpose |
|---|---|---|
| `api/` | [`api/AGENTS.md`](./api/AGENTS.md) | API route handlers (server-only; validates LLM I/O with Zod) |

### Planned (not yet created)

| File | Purpose | Tracked in |
|---|---|---|
| `layout.tsx` | Root layout, metadata, OG tags | `docs/architecture.md` |
| `page.tsx` | The single input box + generated output | `docs/architecture.md` |
| `loading.tsx` | SVG draw-in loader (not a spinner) | `docs/demo-script.md` |
| `api/generate/route.ts` | POST: business description → JSON template selection | `docs/architecture.md` |

## Conventions

- **One route, one folder.** `page.tsx` for the page, `layout.tsx` for nested layouts, `route.ts` for API.
- **Server components by default.** Only add `"use client"` when you need state, effects, or browser APIs.
- **API routes go under `api/`** with `route.ts`.

## Route cap (hackathon scope)

`/` and `/api/generate`. **Do not add more routes.** If you think you need one, talk to the human first.

## Loading and error states

- Use `loading.tsx` for the route-level loading state.
- The loading state for `/` should be the SVG draw-in animation — make it part of the experience, not a spinner.

## Metadata

- Set `metadata` in `app/layout.tsx` for OG tags. Hackathon judges screenshot things; nice OG image earns points.

---

<!-- last-reviewed: a9279ef -->
