# ADR 0002: Never generate SVG with the LLM

## Status

Accepted — 2026-04-25

## Context

The product wedge is "polished, branded SVG motion as the hero of every generated landing page." If the LLM generates raw SVG, output quality is unreliable, hard to animate cleanly, and indistinguishable from competitors who do the same thing badly.

## Decision

The LLM only outputs structured JSON: `{ templateId, palette, copy, iconKey }`. All SVG paths and animation logic live in hand-crafted React components in `src/templates/`. The human authors them; the LLM only picks among them.

## Consequences

- **Visual quality is bounded by human craft, not LLM reliability** — this is the moat
- Demo never produces broken SVG; failure mode is "wrong template picked," which is recoverable and still looks good
- Adding a new template is a creative human task, not a prompt-engineering task
- Total template count is capped (4 for hackathon) — quality over quantity

## Alternatives considered

- **LLM generates raw SVG** — tried mentally, rejected. Output quality is too variable; can't demo with confidence
- **LLM picks from open-source SVG library** — license risk and visual inconsistency
- **Lottie via prompt** — same generation reliability problem, plus larger runtime
