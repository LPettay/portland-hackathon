# ADR 0005: Every `AGENTS.md` carries a navigable Index

## Status

Accepted — 2026-04-25

## Context

The repo has 12 `AGENTS.md` files (one per meaningful directory, plus root). Reviewing them after the first day of scaffolding revealed two consistent gaps:

1. **No crawl map at the root.** A fresh agent landing in the repo had no single doc that pointed at every other `AGENTS.md`. To learn the layout it had to either `ls -R` (token-expensive) or read the README's prose tree (purpose-light).
2. **"Expected files" tables conflated present and planned.** Several `src/*/AGENTS.md` files listed files like `openai.ts`, `LandingPage.tsx`, `template-selection.ts` as if they existed. They didn't. A fresh agent burned Read calls trying to open files that hadn't been written yet.

Only `scripts/AGENTS.md` and `scripts/lib/AGENTS.md` had a clean per-file index. We want every `AGENTS.md` to match that quality.

## Decision

Every `AGENTS.md` carries an **Index** section near the top with up to three sub-tables, including only the ones that apply:

```markdown
## Index

### Files here
| File | Purpose |
|---|---|
| `foo.ts` | Single-sentence purpose |

### Subdirectories
| Dir | AGENTS.md | Purpose |
|---|---|---|
| `lib/` | [`lib/AGENTS.md`](./lib/AGENTS.md) | Single-sentence purpose |

### Planned (not yet created)
| File | Purpose | Tracked in |
|---|---|---|
| `openai.ts` | LLM client | `docs/architecture.md` |
```

The **root `AGENTS.md`** additionally carries a **Crawl map** — a single ASCII tree of every `AGENTS.md` in the repo with a one-line purpose for each — so an agent can decide where to crawl from one read.

The convention is documented in the root `AGENTS.md`. New `AGENTS.md` files MUST follow it; existing ones were brought into compliance in this PR.

## Consequences

- **Pro:** Fresh-agent orientation goes from N reads (one per AGENTS.md) to 1 read (the root crawl map) plus targeted follow-ups.
- **Pro:** Splitting "Files here" from "Planned" stops agents from wasting Read calls on non-existent files.
- **Pro:** The Index becomes a forcing function for documentation: when a new file is added without an entry in its `AGENTS.md`, the omission is visible at glance.
- **Pro:** Aligns with how `scripts/AGENTS.md` and `scripts/lib/AGENTS.md` were already written — no new precedent, just promotion to project-wide convention.
- **Con:** Slightly more boilerplate per `AGENTS.md`. Acceptable; each Index is < 20 lines.
- **Con:** Convention is enforced by review only for now (not by `bun run check`). If it drifts we can add a `check-index.ts` later — convention first, automation only on evidence of drift.

## Alternatives considered

- **Per-file `// AGENT-NOTE` headers in source files** — denser but invisible at the directory level; would not produce a crawl map. Rejected.
- **A single top-level `INDEX.md` instead of per-directory Index sections** — centralises the map but defeats the locality of `AGENTS.md`. The agent already reads the dir's `AGENTS.md` before editing; folding the index into the same doc is one less hop. Rejected.
- **Generate the Index sections from the filesystem** — tempting, but the per-file *purpose* sentences are exactly the part a script can't write. Rejected for now; revisit if we ever want a `bun run agents:reindex` helper that fills in filenames and leaves humans to write purposes.
- **Drop the "Planned" table entirely; trust agents to read `docs/architecture.md`** — possible, but the Planned table sits exactly where the agent is already looking, so the cost of duplication is low and the cost of an extra hop is real. Rejected.
