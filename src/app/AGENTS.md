# AGENTS.md — `src/app/`

Next.js App Router. Pages, layouts, and API routes only.

## Conventions

- **One route, one folder.** `page.tsx` for the page, `layout.tsx` for nested layouts, `route.ts` for API.
- **Server components by default.** Only add `"use client"` when you need state, effects, or browser APIs.
- **API routes go under `api/`** with `route.ts`.

## Expected routes (hackathon scope)

| Path | Type | Purpose |
|---|---|---|
| `/` | page | The single input box + generated output |
| `/api/generate` | route | POST: business description → JSON template selection |

That's it. **Do not add more routes.** If you think you need one, talk to the human first.

## Loading and error states

- Use `loading.tsx` for the route-level loading state.
- The loading state for `/` should be the SVG draw-in animation — make it part of the experience, not a spinner.

## Metadata

- Set `metadata` in `app/layout.tsx` for OG tags. Hackathon judges screenshot things; nice OG image earns points.
