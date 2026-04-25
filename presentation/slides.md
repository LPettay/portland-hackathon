---
theme: seriph
title: MotionPitch
info: |
  ## MotionPitch
  Prompt in. Cute SVG gif out. Cursor Portland Hackathon · Apr 25 2026.
transition: fade
mdc: true
colorSchema: light
fonts:
  sans: 'Inter'
  serif: 'Fraunces'
  mono: 'JetBrains Mono'
themeConfig:
  primary: '#ea580c'
layout: none
---

<style>
  :root { --slidev-theme-primary: #ea580c; }
  .slidev-layout { background: #fffbf2 !important; padding: 0 !important; }
</style>

<Slide1Principles />

<!--
Lead with the principles. Judges should leave knowing we built scaffolding
before product: AGENTS.md per directory, ADRs for every decision, one git
worktree per parallel agent, and a 5-layer enforcement chain that fails
PRs that would weaken any of it.
-->

---
layout: none
---

<Slide2Architecture />

<!--
Why this stack: Bun (one toolchain), Next.js 15 App Router (server-by-default),
Tailwind 4 (no design system overhead), Framer Motion (license-clear),
OpenAI structured outputs (schema-bound, never raw SVG). Single API route
keeps surface area trivial for a 3-hour build. PR-cycle on protected main.
-->

---
layout: none
---

<Slide3Demo />

<!--
Land on the product and the URL. Read the prompt, point at the gif, point at
the URL. The three example outputs each run a different motion idiom (tail
wag, flame flicker, gentle float) so judges see range without us listing
features. End on the invitation: open the URL on your phone.
-->
