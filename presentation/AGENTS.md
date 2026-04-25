# AGENTS.md — `presentation/`

The judges-handout deck. Self-contained Slidev project; isolated from the main Next.js app.

## What this is

A **3-slide max** Markdown-driven deck (`slides.md`) projected alongside the live demo so judges can understand MotionPitch in 30 seconds without listening to the speaker.

## Hard constraints

| Concern | Rule |
|---|---|
| Slide count | **Cap at 3.** A judges handout is not a talk deck. If you need a 4th, delete a 1st. |
| Package manager | `bun` only. |
| Tooling | Slidev + Tailwind/UnoCSS classes only. No new frameworks. |
| Source of truth | `slides.md`. Everything else is config. |
| Demo script | This deck must agree with [`../docs/demo-script.md`](../docs/demo-script.md). If they conflict, the demo script wins. |

## Editing rules

- **Tone:** confident, terse, judge-friendly. Cut anything that needs a sentence to explain.
- **No internal jargon.** Judges don't know what Zod or App Router is.
- **Visuals over prose.** Each slide should read in <10 seconds.
- **One idea per slide.** If a slide needs a sub-bullet to clarify the headline, the headline is wrong.

## When to update

- Product copy changed in the README → mirror it here.
- New top-level capability shipped → only update if it changes the elevator pitch.
- Demo script changed → reconcile any contradictions immediately.

## What NOT to do

- Don't add a "team" slide, "thank you" slide, or "Q&A" slide.
- Don't import images larger than necessary (we want PDF export to stay <2MB).
- Don't add transitions fancier than `fade` or `slide-left`.
- Don't bring in a new theme without ADR sign-off.
