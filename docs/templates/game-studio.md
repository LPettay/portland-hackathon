# Template Brief: `game-studio`

> **Visual archetype:** Pixel Craft.
> **Demo prompt:** `Indie game studio shipping a roguelike` (the canonical first demo — this is the template we lead with).
> **Status:** Design brief. No implementation yet. This document is the spec to work from when an agent or human writes `src/templates/game-studio.tsx`.

---

## What this template is for

`game-studio` is the **bold/playful** archetype in the four-template MotionPitch lineup. It serves indie creative and tech businesses whose brand identity is comfortable with — or actively wants — a low-fi, hand-crafted, slightly-defiant aesthetic.

| Fits well | Stretches | Doesn't fit |
|---|---|---|
| Indie game studio | Podcast / audio show | Law firm |
| Roguelike / pixel game dev | Design studio (with `cursor` icon variant) | Restaurant |
| Dev shop / hacker collective | Kids' music school (playful angle) | Wellness / yoga |
| Itch.io / small-scale publishers | Roller derby / alt sports | Anything corporate |

When in doubt, the `generic-service` template (Confident Mark archetype) is the safer fall-through — `game-studio` is a confident style choice that will look weird for a wedding planner.

---

## The vibe (in words, since we can't sketch)

The mood we're invoking, not literally copying:

- **Stardew Valley / Celeste / Minit** — modern pixel art with soul, not retro for retro's sake
- **Original Game Boy DMG palette** — four greens, deliberately constrained, immediately legible
- **Pico-8 cart art** — the constraint *is* the design; every pixel is a choice
- **Old Sierra adventure-game opening screens** — the "you have entered the dungeon" reveal moment
- **itch.io thumbnails** — what indie devs put on their portfolios when they care

The mood we're avoiding:

- Retro nostalgia for its own sake (no NES logos, no "RAD" sunburst)
- Cute-mascot startup-y vibes (no rounded gradient blobs with eyes)
- AI-generated-illustration look (this is the antithesis — every pixel is committed)
- Anything that reads as "we couldn't afford a designer"

The one-line vibe: **a still moment from a tiny game made with love by two people in a basement.**

---

## Composition (within `viewBox="0 0 800 600"`)

The standard MotionPitch hero geometry: text on the left, animated stage on the right.

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   [TITLE — large pixel font]              ┌──────────────────────┐   │
│                                           │                      │   │
│   [tagline — smaller, regular]            │   PIXEL-ART STAGE    │   │
│                                           │   ~400 × 400 SVG     │   │
│   [CTA pill button]                       │   units              │   │
│                                           │                      │   │
│                                           └──────────────────────┘   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
   ← copy column (≈ 400w) →                  ← stage column (≈ 400w) →
```

- Stage occupies roughly `x=380 → 780`, `y=100 → 500` (400×400 SVG units, vertically centered).
- Each "pixel" in the art is **8×8 SVG units** so the stage holds a 50×50 pixel canvas. (Scale chosen so individual rects stay manageable in count and the look is unambiguously pixel-art at any browser zoom level.)
- Text uses system stack — no external fonts (rule from `.cursor/rules/svg-templates.mdc`). Pixel feel comes from the stage, not the typography.

---

## The static stage (default scene)

A side-on, 2D-platformer-style scene. From back to front, what's drawn before any animation:

1. **Background fill** — solid dark color from `primaryColor`. The whole stage starts black/very-dark.
2. **Stone-arch dungeon doorway** — centered horizontally in the stage, ~24 pixels wide × 32 pixels tall. Simple two-tone stone (lighter trim, darker interior). Interior is the deepest shade — it's the "calling" light source.
3. **Floor line** — a horizontal band ~4 pixels tall at the bottom of the stage, suggesting cobblestone (alternating two tones).
4. **Wall-mounted torch** — to the left of the doorway, ~4 pixels wide × 6 pixels tall. Sconce in dark stone, flame in `accentColor`.
5. **Character sprite** — standing to the *right* of the doorway after the load animation completes. 16 pixels wide × 24 pixels tall (including held item). Default pose: facing left, slight contrapposto, item held low.
6. **Two ambient particles** — single-pixel motes drifting up from near the torch.
7. **Optional surface detail** — one small treasure-ish element at the character's feet (a tiny chest, a coin, a glowing rune). Scene-anchoring detail; doesn't move.

That's it. **Restraint is the design.** A busier scene would compete with the page copy.

---

## Motion choreography

Two phases: a **one-shot on load** (the loader trick from `docs/demo-script.md`) and a **continuous loop** (4–6 seconds, seamless, per `.cursor/rules/svg-templates.mdc`).

### Phase 1: load (one-shot, ~2 seconds, runs once)

The character is *not* in the stage when the page first paints. Then:

1. `t=0.0s` — Page appears. Stage shows the dungeon, torch, floor, particles drifting. Character is off-stage to the right (or hidden).
2. `t=0.2s` — Character walks in from the right edge, 4-frame walk cycle (~200ms per step), heading left toward the doorway.
3. `t=1.5s` — Character stops next to the doorway, turns to face left (one-frame turn), held item now visible.
4. `t=1.8s` — Item-held pose locks in. Character begins idle breathing.
5. `t=2.0s` — Loop begins.

**This walk-in IS the loading state.** It's the visual replacement for a spinner. The page copy can fade in alongside (typed-in or simple opacity transition) so by `t=2s` the whole hero feels alive.

### Phase 2: loop (6 seconds, repeats forever, seamless)

| Element | Motion | Period | Notes |
|---|---|---|---|
| Character idle | 1px head bob (up at half-cycle, down at full) | 1.0s | 6 cycles per loop = clean wraparound |
| Torch flame | 3-frame flicker (small/medium/large), randomized order within cycle | 0.5s per frame, full cycle 1.5s | 4 cycles per loop |
| Doorway interior glow | Brightness sine wave between `accentColor`-dim and `accentColor`-bright | 6.0s | Once per loop, perfect cycle |
| Particles (×2, offset) | Drift up from torch, fade out at top, restart at bottom | 6.0s each, offset by 3.0s | Always one particle near top, one near bottom |
| Held-item sparkle | Single white pixel travels along the item's edge | 0.4s, fires once at `t=2.5s` of the loop | Off-screen at `t=0` and `t=6.0s` |

**Total animated elements:** ~10 (character bob = 1, torch flame = 1, doorway glow = 1, particles = 2, sparkle = 1, plus a few sub-elements). Well under the 30-element cap in the rules.

**`prefers-reduced-motion`:** when set, skip Phase 1's walk-in (character pre-positioned), drop the torch flicker to a single mid-frame, freeze the particles, freeze the sparkle. Keep only the very-slow doorway breath.

---

## Parameter knobs (the AI's job)

The LLM only outputs `TemplateProps`. Per `src/templates/AGENTS.md`:

```ts
type TemplateProps = {
  businessName: string;    // "Hollow & Bright"
  tagline: string;         // "A turn-based roguelike about losing what you love."
  primaryColor: string;    // hex — drives background + dark stone
  accentColor: string;     // hex — drives torch flame + doorway glow + sparkle
  iconKey?: string;        // template-specific; here: which item the character holds
};
```

### Palette presets (LLM picks one, registry resolves to `primaryColor` + `accentColor`)

| Preset | `primaryColor` | `accentColor` | Best for |
|---|---|---|---|
| `dungeon-amber` *(default)* | `#1a1a1a` (charcoal) | `#d97706` (amber) | Roguelikes, dark-fantasy, "old-school" |
| `synthwave` | `#0d0221` (deep purple) | `#ff006e` (magenta) | Cyberpunk, electronic music, edgy |
| `gameboy` | `#0f380f` (DMG darkest green) | `#9bbc0f` (DMG lightest green) | Game Boy nostalgia, retro-throwback |
| `forest` | `#1a2614` (dark moss) | `#d4a574` (warm tan) | Cozy / Stardew-adjacent / nature-game |

The LLM doesn't need to know the hex values — it picks a preset name. The mapping lives in `src/templates/registry.ts`.

### Held-item variants (`iconKey`)

| `iconKey` | What it is | Best for |
|---|---|---|
| `sword` *(default)* | Pixel-art short sword | Roguelikes, RPGs, action games |
| `mic` | Vintage radio mic | Podcasts, audio shows |
| `cursor` | Classic Mac arrow cursor | Dev shops, design studios, productivity tools |
| `controller` | NES-style D-pad | General gaming, fan sites, esports |

Each item is a separately-authored sub-sprite (~8×8 to 8×12 pixels). Same character, different held thing. **The `iconKey` swap is the lightest-touch personalization** — don't add more variants without a strong reason.

### Copy

The LLM writes three strings:

- `businessName` — 1–3 words ideally; longer is acceptable but the layout starts to break above ~24 chars
- `tagline` — one sentence, ~6–14 words
- CTA label is currently *not* in the contract — it needs to be added or generated from a sensible default. **Open question, see below.**

---

## Walkthrough: `Indie game studio shipping a roguelike`

What actually happens on the judge's screen, second by second.

```
t = 0.0s    User submits the prompt. Input collapses, page transitions
            to the result view. (Behind the scenes: /api/generate fires.)

t = 0.0–10s LOADING — page shows a minimal scaffold (header, frame for
            the hero zone). NOT a spinner. We're holding back here on
            purpose so the reveal lands.

            (~10s of OpenAI roundtrip; this happens regardless.)

t ≈ 10.0s   JSON arrives. Page paints the hero template:
              palette: dungeon-amber  (charcoal background, amber accent)
              iconKey: sword
              copy:    title "Hollow & Bright"
                       tagline "A turn-based roguelike about losing
                                what you love."
                       cta   "Wishlist on Steam"

t = 10.2s   Character walk-in begins from the right edge of the stage.
            Page copy fades in on the left.

t = 11.5s   Character reaches the dungeon doorway, turns to face it.

t = 11.8s   Sword visible in hand. Idle pose locks in.

t = 12.0s   Loop begins. Torch flickers. Doorway glow breathes.
            Particles drift up. Every ~6s a single white sparkle
            travels along the sword's edge.

steady-state The judge sees: "a tiny moment from someone's actual game."
            Not a stock landing page. Not a spinner. Not LLM-slop.
            ~6 seconds in, they've absorbed the brand.
```

This is the demo prompt we lead with. Everything about this walkthrough should feel intentional from the moment of paint.

---

## What this template is NOT

- **Not parallax.** No layered scrolling backgrounds. We're a static stage.
- **Not an actual game.** No interactivity. No keyboard input. The character does not respond to clicks.
- **Not procedurally generated.** Same JSON in → same pixels out. No randomness in the SVG output (visual randomness in the *flicker timing* is fine because it's bounded and re-runs the same way per render).
- **Not Mario / not any IP.** Generic enough character silhouette to dodge. Original sprite design.
- **Not realistic.** This is *intentionally* low-fidelity. The pixel-art look is a deliberate aesthetic choice, not a budget constraint.
- **Not ornate.** When in doubt, take detail away.

---

## Implementation notes (for whoever writes the code later)

These are guardrails, not instructions. The actual implementation is downstream of this brief.

### Pixel-art-in-SVG technique

The "no external assets" rule (`.cursor/rules/svg-templates.mdc`) forbids `<image>` references — so a base64 PNG is **out**. Pure SVG paths and shapes only. Three viable approaches:

1. **Per-pixel `<rect>` elements.** A 50×50 pixel canvas at full coverage = up to 2,500 rects. We don't paint background; only non-background pixels need rects. Realistically: ~150–250 rects per frame. Verbose but simple.
2. **`<symbol>` + `<use>` for the pixel.** Define `<symbol id="px"><rect width="8" height="8"/></symbol>` once, then `<use href="#px" x=".." y=".." fill=".."/>` for each visible pixel. Same element count but smaller authored payload.
3. **Run-length-encoded paths.** Group same-color contiguous pixels into a single `<path d="M.. h.. v.. h.. z"/>`. ~10x fewer DOM elements but harder to author and edit.

**Recommendation:** start with approach (1) — per-pixel `<rect>` — since it's the most legible to whoever maintains the file. Optimize to (3) only if performance shows it's needed (very unlikely at this scale).

### Animation technique

Per project rules, use Framer Motion. For pixel-art that needs to look *crisp*, NOT *smooth*:

- Movement should be in **whole-pixel steps** (multiples of 8 SVG units). Sub-pixel interpolation defeats the aesthetic.
- Use `style={{ shapeRendering: "crispEdges" }}` on the SVG to disable anti-aliasing.
- Frame-based animations (walk cycle, torch flicker) are best modeled as **toggling visibility on a stack of pre-positioned `<g>` groups** rather than interpolating positions.
- The doorway glow is the one continuous interpolation — fade between two `accentColor` values, not movement.

### CTA button

The `TemplateProps` contract doesn't currently include a CTA label. Options:

- **(a)** Add `ctaLabel: string` to `TemplateProps` (affects all four templates — coordinate before doing).
- **(b)** Have each template own a sensible default and let the LLM override via a generic `extras` field.
- **(c)** No CTA in the hero; CTA lives in a separate page section outside this template.

**Open question — see below.**

---

## Open design questions

For the human (Lance) to weigh in on before/during implementation:

1. **Is "character walks in from right" the right load animation?** Alternative: character is already there, but the *scene* draws in (door materializes first, then floor, then character pops in last). Walk-in feels more "alive" to me; draw-in feels more "magic." Pick one and commit.

2. **Should the sword sparkle be tied to the held-item key?** I.e., does `mic` get a sparkle? Does `cursor` get a click ripple? Each variant having its own micro-animation would be more delightful but ~2× the work. Recommendation: ship the demo with sparkle-on-sword only; add per-item flourishes post-demo.

3. **CTA label — option (a), (b), or (c) above?** This affects the `TemplateProps` contract and therefore all four templates. Calls for a quick decision and possibly an ADR. (a) is cleanest; (c) is simplest. (b) is too clever for a hackathon.

4. **Do we want a "name tag" floating above the character?** I removed it from the static stage description but it could be a charming detail (the character's "@handle" appearing as a pixel-font label). Worth deciding before implementation since it affects spacing.

5. **What's the page state during the 10-second OpenAI roundtrip?** This is *upstream* of this template (lives in the page-level loading UI, not in the template itself), but the brief assumes "minimal scaffold, hold back the reveal." If we instead show a partial template (e.g., the dungeon without the character) during loading, the walk-in becomes the *only* signal that the result has arrived — which could be very effective. Worth a separate decision.

6. **Should this brief commit to specific sprite art now, or leave that to implementation?** Right now I've described the character abstractly ("16×24, side-view, contrapposto"). An honest pixel-art template lives or dies by the actual sprite design. The strongest version of this brief includes a hand-drawn sprite reference; the version we have leaves room for the implementer (AI or human) to design within the spec. **Recommendation:** if Lance has a specific sprite reference in mind, drop it here before implementation starts.

---

## Cross-references

- Template contract & authoring rules: [`src/templates/AGENTS.md`](../../src/templates/AGENTS.md), [`.cursor/rules/svg-templates.mdc`](../../.cursor/rules/svg-templates.mdc)
- Why no LLM-generated SVG: [`docs/decisions/0002-no-llm-svg-generation.md`](../decisions/0002-no-llm-svg-generation.md)
- The 60-second demo this template anchors: [`docs/demo-script.md`](../demo-script.md)
- Visual archetype taxonomy (informal): the four-archetype framework lives in chat history, not yet in repo. If we commit to it as a structural choice, it deserves an ADR.
