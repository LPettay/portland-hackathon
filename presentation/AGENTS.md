# AGENTS.md — `presentation/`

The judges-handout deck. Self-contained Slidev project; isolated from the main Next.js app.

## Index

### Files here

| File | Purpose |
|---|---|
| `slides.md` | Source of truth — frontmatter + 3 thin slide shells that mount Vue components |
| `package.json` | Slidev install + dev/build/export scripts |
| `README.md` | How to run the deck locally and export to PDF |
| `.gitignore` | Slidev build artifacts |

### Subdirectories

| Dir | Purpose |
|---|---|
| `components/` | One Vue SFC per slide body, plus reusable visuals (`EnforcementChain.vue`) |

#### `components/` files

| File | Purpose |
|---|---|
| `Slide1Principles.vue` | Slide 1 — "we built the scaffolding before the product" + 5-layer chain |
| `Slide2Architecture.vue` | Slide 2 — data flow + stack table |
| `Slide3Demo.vue` | Slide 3 — "prompt in, cute SVG gif out" + live URL + 3 example outputs |
| `EnforcementChain.vue` | Reusable visual: the 5-stop enforcement pipeline (used by Slide 1) |

## What this is

A **3-slide max** Slidev deck projected alongside the live demo so judges can understand MotionPitch in 30 seconds without listening to the speaker. The deck order leads with **agentic principles**, then the **architecture**, then the **product + live URL** — because for this hackathon the engineering rigor is the differentiator, and the product fits in one sentence.

## Hard constraints

| Concern | Rule |
|---|---|
| Slide count | **Cap at 3.** A judges handout is not a talk deck. If you need a 4th, delete a 1st. |
| Package manager | `bun` only. |
| Tooling | Slidev + Vue SFC components + UnoCSS classes. No new frameworks. |
| Slide bodies | Each slide body lives in a Vue SFC under `components/`. Slidev's markdown renderer eats nested HTML on blank lines, so we keep `slides.md` thin and let Vue render the rest. |
| Source of truth | `slides.md` for ordering, frontmatter, and speaker notes. `components/Slide*.vue` for layout + content. |
| Demo script | This deck must agree with [`../docs/demo-script.md`](../docs/demo-script.md). If they conflict, the demo script wins. |

## Visual identity

| Token | Value |
|---|---|
| Background | `#fffbf2` (warm cream) |
| Ink | `#1c1917` (charcoal) |
| Accent | `#ea580c` (amber-600) |
| Accent dark | `#7c2d12` (amber-900) |
| Surface | `#fef3c7` (amber-100) |
| Border | `#fde68a` (amber-200) |
| Serif | `Fraunces` (titles, URL) |
| Sans  | `Inter` (body) |
| Mono  | `JetBrains Mono` (eyebrows, code, pills) |

Eyebrow style: 11px JetBrains Mono, uppercase, 2.5px letter-spacing, accent color. Use it once per slide above the H1.

## Editing rules

- **One Vue SFC per slide body.** Don't try to nest complex HTML inside `slides.md` — markdown-it will mangle it.
- **Tone:** confident, terse, judge-friendly. Cut anything that needs a sentence to explain.
- **No internal jargon.** Judges don't know what Zod or App Router is — but they will see them mentioned, so make sure the *role* is clear from context.
- **Visuals over prose.** Each slide should read in <10 seconds.
- **One idea per slide.**
- **Animations must respect `prefers-reduced-motion`.** Every keyframe block in this directory ends with a `@media (prefers-reduced-motion: reduce)` reset.

## When to update

- Product copy changed in the README → mirror it on slide 3.
- Live demo URL changes → update `Slide3Demo.vue`.
- New top-level capability shipped → only update if it changes the elevator pitch.
- Demo script changed → reconcile any contradictions immediately.
- Stack picks change → update the stack table on slide 2.

## What NOT to do

- Don't add a "team" slide, "thank you" slide, or "Q&A" slide.
- Don't import images (SVG and CSS only — keeps PDF export <2MB).
- Don't add transitions fancier than `fade` or `slide-left`.
- Don't bring in a new theme without ADR sign-off.
- Don't put complex multi-line HTML directly in `slides.md` — promote it to a Vue SFC.

---

<!-- last-reviewed: e21fde4 -->
