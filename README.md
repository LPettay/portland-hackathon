# MotionPitch

> **Status:** Hackathon project — Cursor Portland Hackathon, Apr 25 2026
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
bun install
cp .env.example .env.local  # fill in OPENAI_API_KEY
bun dev
```

Open <http://localhost:3000>.

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
├── public/             # Static assets
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

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## License

MIT — see [`LICENSE`](./LICENSE).
