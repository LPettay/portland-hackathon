# MotionPitch

> **Status:** Hackathon project — Cursor Portland Hackathon, Apr 25 2026.
> Next.js app scaffolded and rendering a placeholder homepage; LLM pipeline + SVG templates land next.
> **Working name:** MotionPitch (subject to change)

Type a business in one sentence, get a one-page landing site whose hero is a custom-animated SVG scene generated for that business.

The website is the wrapper. **The animated SVG hero is the product.**

---

## Why this exists

LLM-generated websites are everywhere (v0, Lovable, Bolt). They all output static layouts with stock imagery. The unique wedge here is **motion design baked in** — every generated site ships with a custom, branded SVG animation as the hero.

The trick: the LLM doesn't generate raw SVG (it's bad at that). It picks from a hand-crafted, parameterized template library and customizes copy, colors, and icon choices. **Craft stays human; selection and customization are AI.**

---

## Quick start

> Requires [Bun](https://bun.sh) ≥ 1.1

```bash
bun install                  # also installs lefthook git hooks
bun dev                      # Next.js dev server on http://localhost:3000
```

The homepage is currently a placeholder — the input box, LLM pipeline, and animated templates land in subsequent PRs.

Repo-hygiene check (also runs on pre-commit and CI):

```bash
bun run check
```

Once the LLM pipeline is wired up, you'll also need:

```bash
cp .env.example .env.local   # fill in OPENAI_API_KEY
```

### Useful scripts

| Command | Purpose |
|---|---|
| `bun run check` | All repo-hygiene checks (AGENTS.md presence, forbidden artifacts, freshness) |
| `bun run agents:stale` | Show which AGENTS.md files are stale and what changed |
| `bun run agents:stamp <path>` | Mark an AGENTS.md as reviewed at current HEAD |
| `bun run agents:stamp-all` | Mark every AGENTS.md as reviewed (after sweep review) |

---

## Architecture (one-liner)

`Input box → /api/generate (LLM, JSON mode) → { templateId, palette, copy, icons } → React renders selected motion template`

See [`docs/architecture.md`](./docs/architecture.md) for the full diagram.

---

## Repo layout

```
.
├── .cursor/rules/      # Persistent Cursor agent rules (TS, React, etc.)
├── .github/            # PR template, issue templates, CI
├── docs/               # Architecture, ADRs, demo script
│   ├── decisions/      # ADRs (one short markdown per structural choice)
│   └── templates/      # Per-template design briefs (one per src/templates/*)
├── presentation/       # Slidev judges-handout deck (self-contained sub-project)
├── scripts/            # Repo-hygiene tooling (check, stamp, worktree helpers)
├── src/
│   ├── app/            # Next.js app router (pages + API routes)
│   ├── components/     # React UI components
│   ├── templates/      # Hand-crafted SVG motion templates
│   ├── lib/            # LLM client, utilities, prompt builders
│   └── types/          # Shared TypeScript types
├── AGENTS.md           # Top-level agent instructions
├── CONTRIBUTING.md     # PR + workflow conventions
└── README.md
```

Every meaningful directory has its own `AGENTS.md` with scope-specific guidance for the AI agent. Read those before editing within a directory.

---

## Demo script

See [`docs/demo-script.md`](./docs/demo-script.md).

---

## Judges handout deck

A 3-slide [Slidev](https://sli.dev) deck for projecting alongside the live demo (and for export as a PDF takeaway):

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
