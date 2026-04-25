# AGENTS.md — `docs/decisions/`

Architecture Decision Records (ADRs). One markdown file per structural decision.

## Index

### Files here

| File | Decision |
|---|---|
| `0000-template.md` | Template — copy this for new ADRs |
| `0001-use-bun.md` | Use Bun as package manager + runtime |
| `0002-no-llm-svg-generation.md` | LLM emits structured JSON only; never raw SVG |
| `0003-slidev-for-judges-handout.md` | Slidev for the 3-slide judges-handout deck |
| `0004-pr-cycle-on-main.md` | Branch-protected `main`; every change goes through a PR |
| `0005-agents-md-index-convention.md` | Every `AGENTS.md` carries a navigable Index section |
| `0006-git-worktrees-for-parallel-agents.md` | One `git worktree` per concurrent agent session |

When you add an ADR, add a row above and bump the number sequentially.

## Rules

- **One decision per file.** If a PR makes two decisions, write two ADRs.
- **Numbered sequentially.** `0001-use-bun.md`, `0002-no-llm-svg-generation.md`, etc.
- **Filename is `NNNN-kebab-case-title.md`.**
- **Status is one of:** `Proposed`, `Accepted`, `Superseded by ADR-NNNN`, `Deprecated`.
- **Keep them under a screen.** ADRs are read often; long ones don't get read.
- **Never delete an ADR.** Mark it `Superseded` and write the new one. The history is the value.

## Template

Copy `0000-template.md` and fill it in. Required sections: Status, Context, Decision, Consequences. Optional: Alternatives considered.

## When to write one

Write an ADR when you make any of these decisions:

- Adopt or drop a library/framework
- Change directory structure
- Change the LLM contract (prompt or schema)
- Change the demo script
- Add or remove an `AGENTS.md` boundary
- Anything that future-you will ask "wait, why did we do it this way?" about

## When NOT to write one

- Bug fixes
- Internal refactors that don't change behavior
- Style tweaks
- Adding tests

---

<!-- last-reviewed: f4554fe -->
