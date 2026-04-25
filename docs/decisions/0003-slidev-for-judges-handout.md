# ADR 0003: Slidev sub-project for the judges-handout deck

## Status

Accepted — 2026-04-25

## Context

Judges at the hackathon need a way to grok MotionPitch in 30 seconds without a verbal pitch — both during the live demo (projected nearby) and afterward (PDF handout). The existing `docs/demo-script.md` is a script, not a slide artifact.

Constraints:

- 3-slide cap (anything more is a talk deck, not a handout).
- Must be editable in Markdown so the deck is diff-friendly and stays in sync with copy in the README.
- Must export to PDF cleanly.
- Must not pollute the main Next.js app's dependency graph or build pipeline.

## Decision

Add a `presentation/` sub-project at the repo root containing a self-contained [Slidev](https://sli.dev) deck (`slides.md` + its own `package.json`).

- Theme: `@slidev/theme-seriph` (clean, serif, judge-friendly).
- Source of truth: `presentation/slides.md`.
- Lifecycle scripts: `bun dev`, `bun run build`, `bun run export-pdf`.
- Constraints documented in `presentation/AGENTS.md`.

## Consequences

- **Pro:** Deck lives in-repo, version-controlled with the code; never desynced from the demo.
- **Pro:** Markdown source — easy to keep aligned with `README.md` and `demo-script.md`.
- **Pro:** Isolated dependencies — Slidev's Vue runtime never touches the Next.js bundle.
- **Pro:** PDF export gives judges a takeaway artifact at zero extra effort.
- **Con:** Two `package.json` files in the repo. Mitigated by `presentation/AGENTS.md` making the boundary explicit.
- **Con:** Slidev install pulls ~70 deps. Lives only in the sub-project; CI for the main app is unaffected.

## Alternatives considered

- **Add the deck inline to `docs/`** — Markdown-only, no rendering. Loses the polished projector experience.
- **Marp** — simpler than Slidev but uglier defaults; would need more inline styling to look judge-ready.
- **Reveal.js** — flexible but more boilerplate; Slidev's Markdown-first authoring matches our content model better.
- **Keynote / PowerPoint** — not version-controllable, can't live next to the code.
