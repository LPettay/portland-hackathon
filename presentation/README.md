# MotionPitch — Judges Handout Deck

A 3-slide [Slidev](https://sli.dev) deck designed to project alongside the live demo so judges can grok the product in a glance.

## Slides

1. **Hook** — what MotionPitch does, in one line + a visual
2. **The trick** — humans craft the SVG templates, the LLM only picks + customizes
3. **What's next** — the moat (motion library) and the roadmap

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

The whole deck lives in [`slides.md`](./slides.md). Slidev hot-reloads on save.

Style tweaks live in the `<style>` block at the top of `slides.md` and use Tailwind/UnoCSS classes inline.

## Why a separate sub-project?

Slidev wants its own `package.json` and Vue runtime. Keeping it isolated under `/presentation` means it never tangles with the Next.js app's dependencies. See [`docs/decisions/0003-slidev-for-judges-handout.md`](../docs/decisions/0003-slidev-for-judges-handout.md).
