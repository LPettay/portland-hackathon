# AGENTS.md — `docs/templates/`

Design briefs for the `src/templates/` SVG motion templates. **One brief per template**, file name matches the template file (e.g. `game-studio.md` ↔ `game-studio.tsx`).

## What lives here

A brief is the **subjective spec** that an implementer (AI or human) works from when authoring the corresponding template. It captures the look, the motion, the parameter knobs, and the open questions — everything you'd want briefed before touching code.

## What does NOT live here

- Implementation code (lives in `src/templates/`)
- The technical contract / authoring rules (lives in `src/templates/AGENTS.md` and `.cursor/rules/svg-templates.mdc`)
- ADRs (live in `docs/decisions/`)
- Anything that changes runtime behavior

If you're tempted to put runtime logic in a brief, you're writing the wrong document.

## Index

| File | Template | Status |
|---|---|---|
| `game-studio.md` | `src/templates/game-studio.tsx` | Brief written, implementation pending — **the canonical first demo** |

When the other three templates (`coffee-shop`, `yoga-studio`, `generic-service`) get briefs, add them here.

## Brief structure (use as a template)

A good brief covers:

1. **What this template is for** — business types, demo prompt, edge cases
2. **The vibe** — references invoked, references avoided, one-line mood
3. **Composition** — layout within the standard `viewBox="0 0 800 600"`
4. **Static stage** — what's drawn before any motion
5. **Motion choreography** — load-time one-shot + 4–6s seamless loop
6. **Parameter knobs** — palette presets, `iconKey` variants, copy structure (mapped to `TemplateProps`)
7. **Walkthrough** — second-by-second of the canonical demo prompt
8. **What this template is NOT** — anti-patterns, edges
9. **Implementation notes** — guardrails, technique recommendations, NOT instructions
10. **Open design questions** — explicit decisions for human sign-off

Keep it opinionated. A brief that hedges everything is useless.

---

<!-- last-reviewed: 1ec8a68 -->
