---
theme: seriph
title: MotionPitch
info: |
  ## MotionPitch
  Type a business. Get a landing page where the hero is custom motion design.

  Cursor Portland Hackathon · Apr 25 2026
class: text-center
transition: fade
mdc: true
fonts:
  sans: 'Inter'
  serif: 'Fraunces'
  mono: 'JetBrains Mono'
---

<style>
  .slidev-layout h1 { font-family: 'Fraunces', serif; }

  /* --- continuous loops; freeze in PDF without looking broken --- */
  .mp-orbit       { animation: mp-orbit 6s linear infinite; transform-origin: 280px 160px; }
  .mp-breathe     { animation: mp-breathe 4s ease-in-out infinite; transform-origin: 280px 160px; }
  .mp-draw        { stroke-dasharray: 220; stroke-dashoffset: 220; animation: mp-draw 4s ease-in-out infinite alternate; }
  .mp-arrow       { animation: mp-arrow 1.8s ease-in-out infinite; }

  @keyframes mp-orbit   { to   { transform: rotate(360deg); } }
  @keyframes mp-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  @keyframes mp-draw    { to   { stroke-dashoffset: 0; } }
  @keyframes mp-arrow   { 0%,100% { transform: translateX(0); opacity: .7; } 50% { transform: translateX(6px); opacity: 1; } }
</style>

# MotionPitch

<div class="text-xl mt-4 opacity-80">
  Type a business in one sentence.<br/>
  Get a landing page whose hero is a <em>custom motion scene</em>.
</div>

<div class="flex justify-center mt-8">
  <svg viewBox="0 0 560 320" width="560" height="320" role="img" aria-label="Animated landing page preview">
    <defs>
      <linearGradient id="mp-hero-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stop-color="#fef3c7"/>
        <stop offset="100%" stop-color="#fcd9a4"/>
      </linearGradient>
      <filter id="mp-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.08"/>
      </filter>
    </defs>

    <!-- browser frame -->
    <g filter="url(#mp-shadow)">
      <rect x="20" y="20" width="520" height="280" rx="14" fill="#ffffff" stroke="#e7e5e4"/>
      <rect x="20" y="20" width="520" height="32" rx="14" fill="#f5f5f4"/>
      <circle cx="40" cy="36" r="5" fill="#fca5a5"/>
      <circle cx="58" cy="36" r="5" fill="#fcd34d"/>
      <circle cx="76" cy="36" r="5" fill="#86efac"/>
    </g>

    <!-- left column: stylized page copy -->
    <g fill="#e7e5e4">
      <rect x="44" y="76"  width="180" height="14" rx="4"/>
      <rect x="44" y="100" width="140" height="8"  rx="4"/>
      <rect x="44" y="116" width="160" height="8"  rx="4"/>
      <rect x="44" y="132" width="120" height="8"  rx="4"/>
    </g>
    <rect x="44" y="170" width="100" height="28" rx="14" fill="#7c2d12"/>
    <text x="94" y="188" text-anchor="middle" font-size="11" font-family="Inter, sans-serif" fill="#fff">Find a cafe</text>

    <!-- right column: animated hero zone -->
    <g class="mp-breathe">
      <rect x="260" y="76" width="240" height="180" rx="12" fill="url(#mp-hero-bg)"/>
      <!-- coffee-bean-ish silhouette, draws in and out on loop -->
      <path
        class="mp-draw"
        d="M 340 130 C 360 110, 400 110, 420 140 C 440 170, 410 200, 380 200 C 350 200, 330 180, 340 130 Z"
        fill="none" stroke="#7c2d12" stroke-width="3" stroke-linecap="round"/>
      <path
        class="mp-draw"
        d="M 360 140 C 375 155, 395 165, 408 180"
        fill="none" stroke="#7c2d12" stroke-width="2.5" stroke-linecap="round" style="animation-delay: .4s"/>
    </g>

    <!-- orbiting accent dot — the always-moving signal -->
    <g class="mp-orbit">
      <circle cx="500" cy="160" r="5" fill="#ea580c"/>
    </g>
  </svg>
</div>

<div class="text-center mt-4 text-sm opacity-60">
  <span class="font-mono">"Stumptown roastery in Portland"</span>
  &nbsp;<span class="mp-arrow inline-block">→</span>&nbsp;
  this, in ~10 seconds
</div>

<div class="abs-bl mx-14 my-8 text-xs opacity-60">
  The website is the wrapper.<br/>
  <strong>The animated SVG hero is the product.</strong>
</div>

<div class="abs-br mx-14 my-8 text-xs opacity-60">
  Cursor Portland Hackathon · Apr 25 2026
</div>

---
layout: two-cols-header
class: pt-8
---

# The trick

LLMs are bad at SVG. So we don't ask them to make any.

::left::

### Human craft <span class="opacity-60 text-base">(the moat)</span>

A small library of hand-authored, parameterized SVG motion templates.

- 4 templates for the demo
- Each one looped, branded, polished
- Adding a template is a creative act, not a prompt

```
src/templates/
  ├── coffee-shop.tsx
  ├── yoga-studio.tsx
  ├── game-studio.tsx
  └── generic-service.tsx
```

::right::

### AI selection <span class="opacity-60 text-base">(the customization)</span>

The LLM only emits structured JSON — never raw SVG.

```json
{
  "templateId": "coffee-shop",
  "palette":    "warm-roast",
  "copy": {
    "title":    "Stumptown",
    "tagline":  "Portland-roasted, daily.",
    "cta":      "Find a cafe"
  },
  "iconKey":    "bean"
}
```

<div class="mt-4 text-sm opacity-70">
  Zod-validated. Failure mode is "wrong template," which still looks good.
</div>

---
layout: center
class: text-center
---

# What's next

<div class="text-xl mt-8 opacity-90 leading-relaxed">
  More templates &nbsp;·&nbsp; refine-the-result editor &nbsp;·&nbsp; export-as-Lottie
</div>

<div class="mt-12 text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
  The motion library is the wedge. Every template we add compounds the
  product without changing the prompt, the model, or the pipeline.
</div>

<div class="mt-20 text-sm opacity-50">
  Built in 3 hours · 1 human · Cursor agents · Apr 25 2026<br/>
  <a href="https://github.com/" class="underline opacity-80">github.com/.../MotionPitch</a>
</div>
