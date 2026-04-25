# AGENTS.md — `presentation/components/`

Vue Single File Components mounted by the Slidev deck. **Slide bodies live here, not in `slides.md`.**

## Index

### Files here

| File | Purpose |
|---|---|
| `Slide1Principles.vue` | Slide 1 body — agentic principles (lead) + 5-layer enforcement chain |
| `Slide2Architecture.vue` | Slide 2 body — data flow + stack table |
| `Slide3Demo.vue` | Slide 3 body — product pitch + live URL + 3 cute SVG examples |
| `EnforcementChain.vue` | Reusable visual: the 5-stop enforcement pipeline (used by Slide 1) |

## Why this directory exists

Slidev parses `slides.md` through markdown-it before handing each slide to Vue. markdown-it has aggressive rules about re-parsing inline HTML — a blank line inside a `<div>` block causes the inner content to be re-interpreted as Markdown and the closing tags to leak out as text. We hit this trying to put complex multi-column layouts directly into `slides.md`.

The fix: each slide body is a Vue SFC. `slides.md` becomes a thin shell of three `<SlideXxx />` mounts plus frontmatter + speaker notes. Slidev auto-imports anything in `components/` (no manual registration needed).

## Conventions

| Rule | Why |
|---|---|
| One `.vue` file per slide body, named `Slide{N}{Topic}.vue` | Easy to find. The number matches the slide order in `slides.md`. |
| Root element is a single `<div class="sX">` (where `X` is the slide number) with `position: absolute; inset: 0;` | Lets the slide fill Slidev's canvas regardless of `layout: none`. |
| `<style scoped>` only | Prevents bleed across slides. |
| Visual tokens (color/font) hard-coded per component | Slidev's UnoCSS theme tokens don't reach inside Vue scoped styles reliably. The brand palette is documented in `../AGENTS.md` — copy/paste the hex values; don't try to share via CSS variables across SFCs. |
| Every keyframe block ends with a `prefers-reduced-motion` reset | Accessibility + judges in motion-sensitive contexts. |
| No external assets (no `<img>`, no `<image>`, no fonts beyond what `slides.md` declares) | PDF export stays small; deck stays portable. |
| Reusable visuals (e.g. `EnforcementChain.vue`) live alongside slide bodies, not in a sub-folder | Three slides, one shared component — sub-folders would be premature structure. |

## Adding a slide

1. Decide what the slide *shows* before writing copy. If you can't sketch it in 30 seconds, the idea isn't ready.
2. Create `Slide{N}{Topic}.vue` with the root `<div class="s{N}">` shell.
3. In `slides.md`, add a slide separator (`---`) and `<Slide{N}{Topic} />`.
4. **Delete a slide first** if the deck is at 3 — the cap is hard.

## What does NOT live here

- The actual product templates → `../../src/templates/`
- Demo script copy → `../../docs/demo-script.md`
- Slidev config or scripts → `../package.json` and frontmatter in `../slides.md`

---

<!-- last-reviewed: e21fde4 -->
