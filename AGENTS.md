# AGENTS.md — Repo Root

Authoritative agent instructions for this repository. Cursor and other AI agents should read this before any non-trivial edit.

Each subdirectory has its own `AGENTS.md` with scope-specific guidance — read those too when working within that directory.

---

## Crawl map (every `AGENTS.md` in the repo)

Read this once and you know where to go next. Every entry below is a real `AGENTS.md` with its own scoped Index — see [Index convention](#index-convention) for the format.

```
.
├── AGENTS.md                       ← you are here (constraints, time budget, scope firewall)
├── .cursor/AGENTS.md               Cursor rules + hooks layout (rules/, hooks/)
├── docs/AGENTS.md                  Architecture + ADR conventions
│   └── decisions/AGENTS.md         ADR format + when to write one
├── presentation/AGENTS.md          Slidev judges-handout deck (3-slide cap)
├── scripts/AGENTS.md               Repo-hygiene scripts (check, stamp)
│   └── lib/AGENTS.md               Check helper modules (config, walk, git, types, checks)
└── src/AGENTS.md                   App source root (dependency direction, alias)
    ├── app/AGENTS.md               Next.js App Router pages + layouts
    │   └── api/AGENTS.md           API route handlers (server-only, validates LLM I/O)
    ├── components/AGENTS.md        Reusable React UI (input, page, loader, error)
    ├── lib/AGENTS.md               LLM client + utilities (no React)
    ├── templates/AGENTS.md         Hand-crafted SVG motion templates ★ moat
    └── types/AGENTS.md             Shared types + Zod schemas
```

---

## Project at a glance

**MotionPitch** — Type a business in one sentence, get a one-page landing site whose hero is a custom-animated SVG scene generated for that business. Built for the Cursor Portland Hackathon (3-hour sprint).

**The wedge:** the animated SVG hero is the product. The website wrapper is supporting cast.

**The implementation trick:** LLMs are bad at raw SVG. So:
- A human (Lance) hand-crafts a small library of parameterized SVG motion templates.
- The LLM only picks a template and fills in copy/colors/icons via structured JSON output.
- Craft stays human; selection and customization are AI.

---

## Hard constraints (do not violate)

| Concern | Rule |
|---|---|
| Package manager | **`bun` only.** Never `npm`, `yarn`, `pnpm`. |
| Runtime | Bun preferred. Node compatibility required for Vercel deploy. |
| Framework | Next.js 15, App Router. No Pages Router. |
| Language | TypeScript, strict mode. No `any` without justification. |
| Styling | Tailwind. No CSS modules unless absolutely necessary. |
| Animation | Framer Motion. **No GSAP** (license + bundle). |
| LLM | OpenAI structured outputs (JSON mode). **Never request raw SVG from the model.** |
| Comments | Explain *why*, not *what*. No narrating comments. |
| Components | Functional only. Server components by default; `"use client"` only when needed. |

---

## Time budget (3 hours total)

| Window | Goal |
|---|---|
| 0:00–1:00 | Hand-build 3–4 SVG motion templates. **This is the moat.** |
| 1:00–2:00 | LLM pipeline: input → JSON → template selection → render. |
| 2:00–2:30 | Polish: typography, loading state (use SVG draw-in as the loader), spacing. |
| 2:30–3:00 | Deploy to Vercel, rehearse demo with 3 pre-tested backup prompts. |

If you are about to do something not on this list during hours 0–2, **stop and confirm with the human** first.

---

## Definition of "done" for the demo

The judge can:
1. Type a one-sentence business description into a single input box.
2. Within ~10 seconds see a polished landing page render with a custom animated SVG hero.
3. See a different template + palette when they type a different business type.
4. Watch the loading state and have it feel intentional, not janky.

If any of those four are broken, that's a P0. Everything else is a P2 or lower.

---

## Anti-scope-creep firewall

These features are **explicitly out of scope** for the hackathon:

- User accounts, login, auth
- Saving/persisting generated sites
- A database of any kind
- Editing/customizing the output after generation
- Multiple pages per generated site
- Image generation (only SVG motion)
- More than 4 templates
- Mobile-specific layouts (desktop demo only)
- Analytics, telemetry, error tracking

If a contributor (human or AI) proposes one of these, redirect to the demo script.

---

## How to work here as an agent

1. **Always read the relevant directory's `AGENTS.md`** before editing files in it.
2. **Prefer editing existing files** over creating new ones.
3. **Before suggesting a new dependency**, check if Bun + Next.js + Framer Motion + Tailwind already covers it. They usually do.
4. **Before running `bun add <pkg>`**, confirm with the human.
5. **After substantive edits**, run `bun run check` (the pre-commit hook will too). Fix anything you broke.
6. **If you make a structural decision** (new directory, new dependency, schema change), append a one-paragraph ADR to `docs/decisions/`.
7. **Commit messages** follow Conventional Commits (see [CONTRIBUTING.md](./CONTRIBUTING.md)).
8. **Never commit directly to `main`** — it's branch-protected. Every change goes through a PR (see [CONTRIBUTING.md](./CONTRIBUTING.md#pull-requests)). One feature = one branch = one PR = one squash-merge.

## Index convention

Every `AGENTS.md` in this repo carries an **Index** section near the top with up to three sub-tables — include only the ones that apply:

- **Files here** — files that actually exist in the directory today, one-line purpose each.
- **Subdirectories** — direct subdirs, each linked to its own `AGENTS.md`, one-line purpose each.
- **Planned (not yet created)** — files that the directory's design calls for but that haven't been written yet, with a pointer to where the plan lives. Agents should NOT try to read these.

When you add a file, add an entry. When you create a file from "Planned", move its row from Planned to Files here. Rationale: [`docs/decisions/0005-agents-md-index-convention.md`](./docs/decisions/0005-agents-md-index-convention.md).

## Enforcement (you can't lie to the repo)

Five layers stop bad commits. You don't need to memorize them — `bun run check` reports everything and tells you how to fix it. Highlights:

- **AGENTS.md is mandatory** for every directory under `src/`, `docs/`, `scripts/`, and `presentation/` that contains files. The presence check fails commits that skip this.
- **AGENTS.md goes stale** after >5 non-AGENTS file changes in its directory since the last stamp. Re-review and re-stamp with `bun run agents:stamp <path>`.
- **A Cursor `postToolUse` hook** nudges you in real time when you write a file to a directory without an AGENTS.md.
- **No `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`** — bun only.
- **No committed `.env*` files** except `.env.example`.

Full details: [`CONTRIBUTING.md`](./CONTRIBUTING.md#enforcement).

---

## What to ask the human about

Decisions that need human sign-off:
- Adding a new SVG motion template (taste call)
- Changing the system prompt for the LLM (affects output quality)
- Anything that touches the demo script
- Any new npm dependency
- Anything that delays deploy past 2:30

Decisions you can make autonomously:
- Bug fixes
- TypeScript type tightening
- Internal refactors that don't change behavior
- Adding tests
- Documentation improvements
- Tailwind class adjustments for spacing/typography

---

<!-- last-reviewed: a9279ef -->
