# AGENTS.md — `src/components/`

Reusable React UI components. Not pages, not API, not templates.

## Index

### Files here

*(none yet)*

### Planned (not yet created)

| File | Purpose | Tracked in |
|---|---|---|
| `InputBox.tsx` | Single text input with submit | `docs/architecture.md` |
| `LandingPage.tsx` | Composes a template + copy into a full page | `docs/architecture.md` |
| `LoadingState.tsx` | SVG draw-in loader (not a spinner) | `docs/demo-script.md` |
| `ErrorState.tsx` | Friendly error fallback | `docs/architecture.md` |

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

<!-- last-reviewed: a9279ef -->
