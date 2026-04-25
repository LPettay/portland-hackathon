# AGENTS.md — `docs/`

Living documentation for the project. Read these before making structural decisions.

## Files

| File | Purpose |
|---|---|
| `architecture.md` | High-level system diagram and data flow |
| `demo-script.md` | The exact 60-second demo. Source of truth for "is this in scope?" |
| `decisions/` | ADRs (Architecture Decision Records) — one short markdown per decision |

## Rules

- **Update `architecture.md`** when you add/remove a directory or change the data flow.
- **Update `demo-script.md`** only with human sign-off. It's the contract.
- **Append a new ADR** when you make a structural choice (new dep, new pattern, new schema).

## ADR format

Files in `decisions/` are numbered: `0001-use-bun.md`, `0002-framer-motion-not-gsap.md`, etc.

Each one is short:

```markdown
# ADR 0001: Use Bun

## Status
Accepted — 2026-04-25

## Context
Hackathon project. Need fast install + run.

## Decision
Use Bun as package manager and runtime.

## Consequences
- Faster `install` and `dev` startup
- Vercel deploy still works (Bun-aware build)
- Contributors must have Bun installed
```

Keep them under a screen.
