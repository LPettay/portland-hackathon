# MotionPitch — Judges Handout Deck

A 3-slide [Slidev](https://sli.dev) deck designed to project alongside the live demo so judges can grok the product in a glance.

## Slides

1. **Principles** — we built the scaffolding before the product (5-layer enforcement, AGENTS.md, ADRs, worktrees)
2. **Architecture** — data flow + stack table; one API route, one schema, one render path
3. **Demo** — "prompt in, cute SVG gif out" + live URL + 3 example outputs

The deck leads with principles because, for this hackathon, the engineering rigor is the differentiator. The product fits in one sentence and lives at [motionpitch.vercel.app](https://motionpitch.vercel.app).

## Run it

> Requires [Bun](https://bun.sh) ≥ 1.1

```bash
cd presentation
bun install
bun dev          # opens http://localhost:3030
```

## Export to PDF (for the judges to keep)

```bash
bun run export-pdf   # writes slides-export.pdf
```

## Edit

- Slide ordering, frontmatter, and speaker notes live in [`slides.md`](./slides.md).
- Each slide body lives in a Vue SFC under [`components/`](./components/) — markdown-it can't be trusted to round-trip nested HTML inside a slide block, so we promote slide bodies to components.
- Style tokens (colors, fonts) are defined per-component using `<style scoped>` and documented in [`AGENTS.md`](./AGENTS.md).

Slidev hot-reloads on save.

## Why a separate sub-project?

Slidev wants its own `package.json` and Vue runtime. Keeping it isolated under `/presentation` means it never tangles with the Next.js app's dependencies. See [`docs/decisions/0003-slidev-for-judges-handout.md`](../docs/decisions/0003-slidev-for-judges-handout.md).
