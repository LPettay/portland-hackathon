# MotionPitch

> _**Type a coffee shop. Get a custom-named, custom-tinted, slowly-oscillating pixel mug.**_
>
> Cursor Portland Hackathon · Apr 25 2026 · shipped in ~3 hours.

**Live demo:** [motionpitch.vercel.app](https://motionpitch.vercel.app)

```text
            . ' .
             '.'
              '
           ___|___
          |       |\
          |       | )
          |_______|/
```

---

## What it does

1. You type one sentence about a coffee shop.
2. Gemini 3.1 Pro Preview returns a JSON object: `{ businessName, tagline, primaryColor, accentColor }`.
3. A hand-crafted React + Framer Motion pixel-art template renders a steaming mug, tinted with your colors, with the generated name and tagline beneath it.
4. The mug oscillates ±22° on the Y-axis, almost-3D, like a tiny rotating Animal Crossing item.

That's the whole product.

### Try these

| Prompt | What you get |
|---|---|
| `A coffee shop in Portland` | The default. We've seen "Moss & Bean", "Mossy Mug Roasters", "Raindrop Roasters". |
| `Stumptown roastery in Portland` | Original spec prompt, on-brand. |
| `An espresso bar near the Burnside Bridge` | "Bridgehead Espresso" — concrete, Portland-y, lets Gemini stretch. |

---

## Why this exists (and why it's just mugs)

The original pitch was an **AI landing-page generator** where every site shipped with a custom motion-design hero. The wedge: stop generating raw SVG with the LLM (it's bad at that) and instead let the LLM _select and parameterize_ from a hand-crafted template library. Craft stays human. Selection and customization are AI.

Then the hackathon clock made its opinion known. We shipped:

- One template (coffee shop)
- Dynamic name, tagline, and palette per prompt
- A black background and a single input box

We did **not** ship: template routing, multiple themes, image export, or a landing-page wrapper. Those are roadmap. The architecture is built for them.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Runtime | **Bun** | One toolchain for install, run, scripts |
| Framework | **Next.js 15 App Router** | Server components by default, edge-friendly API routes |
| Language | **TypeScript** strict | Zod-validated at the LLM boundary |
| Styling | **Tailwind v4** | No design-system overhead in a 3-hour build |
| Motion | **Framer Motion** | License-clear, declarative, reduced-motion aware |
| LLM | **Google Gemini 3.1 Pro Preview** | Structured outputs (JSON mode) bound to a schema |
| Deploy | **Vercel** | Preview per branch, zero-config Next.js |

What we deliberately don't have: database, auth, cache, analytics, image generation.

---

## Quick start

> Requires [Bun](https://bun.sh) ≥ 1.1 and a [Google AI Studio](https://aistudio.google.com/app/apikey) API key.

```bash
bun install                  # also installs lefthook git hooks
echo "GEMINI_API_KEY=..." > .env.local
bun dev                      # http://localhost:3000
```

Open the page, type a coffee shop, wait ~8 seconds, watch a mug appear.

### Useful scripts

| Command | Purpose |
|---|---|
| `bun run check` | All repo-hygiene checks (AGENTS.md presence, forbidden artifacts, freshness) |
| `bun run agents:stale` | Show which AGENTS.md files are stale and what changed |
| `bun run agents:stamp <path>` | Mark an AGENTS.md as reviewed at current HEAD |
| `bun run agents:stamp-all` | Mark every AGENTS.md as reviewed (after a sweep review) |
| `bun run wt:add <branch>` | Spin up a git worktree for parallel agent work |

---

## Architecture (one-liner)

```text
InputBox → /api/generate (Gemini, JSON mode, Zod-checked)
        → { businessName, tagline, primaryColor, accentColor }
        → <CoffeeShop /> (Framer Motion + SVG, reduced-motion aware)
```

See [`docs/architecture.md`](./docs/architecture.md) for the full diagram and the original (more ambitious) plan.

---

## Repo layout

```
.
├── .cursor/rules/      # Persistent Cursor agent rules (TS, React, etc.)
├── .github/            # PR template, issue templates, CI
├── docs/               # Architecture, ADRs, demo script
│   ├── decisions/      # ADRs (one short markdown per structural choice)
│   └── templates/      # Per-template design briefs
├── presentation/       # Slidev judges-handout deck (self-contained sub-project)
├── scripts/            # Repo-hygiene tooling (check, stamp, worktree helpers)
├── src/
│   ├── app/            # Next.js App Router (page + /api/generate route)
│   ├── components/     # InputBox
│   ├── templates/      # coffee-shop.tsx (the only one, for now)
│   ├── lib/            # gemini.ts client + schema
│   └── types/          # Shared TypeScript types
├── AGENTS.md           # Top-level agent instructions
├── CONTRIBUTING.md     # PR + workflow conventions
└── README.md
```

Every meaningful directory has its own `AGENTS.md` with scope-specific guidance for the AI agent. Read those before editing within a directory.

---

## How this was built

This is a multi-agent Cursor experiment. The repo is set up so several Claude / GPT sessions can work in parallel using git worktrees, each owning one issue, each shipping one PR. The `bun run check` gate, the per-directory `AGENTS.md` files, and the freshness stamps are all there to keep parallel agents from stepping on each other.

It mostly worked. We had a 17-issue MVP plan, ruthlessly cut it to "one mug, one prompt, one deploy" with ~30 minutes left, and shipped.

---

## Demo script & judges handout

- Live walkthrough script: [`docs/demo-script.md`](./docs/demo-script.md)
- Slidev deck (3 slides, also exports to PDF):

  ```bash
  cd presentation
  bun install
  bun dev
  ```

  See [`presentation/README.md`](./presentation/README.md).

---

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## License

MIT — see [`LICENSE`](./LICENSE).
