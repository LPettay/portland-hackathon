# AGENTS.md — `src/components/`

Reusable React UI components. Not pages, not API, not templates.

## What lives here

- `InputBox.tsx` — the single text input with submit
- `LandingPage.tsx` — the wrapper that composes a template + copy into a full page
- `LoadingState.tsx` — the SVG draw-in loader
- `ErrorState.tsx` — friendly error fallback

That's the expected set for the hackathon. Add more only if essential.

## Conventions

- **One component per file.** Filename matches component name.
- **Functional components, named exports.**
- **Props typed inline** unless shared across files (then move to `src/types/`).
- **`"use client"`** at the top when needed.
- **Tailwind for styling.** No CSS modules.

## What does NOT live here

- SVG motion templates → `src/templates/`
- API logic → `src/app/api/`
- Page-specific layout → `src/app/`
- Pure utilities → `src/lib/`

---

<!-- last-reviewed: 0d84014 -->
