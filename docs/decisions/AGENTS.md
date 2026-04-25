# AGENTS.md — `docs/decisions/`

Architecture Decision Records (ADRs). One markdown file per structural decision.

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

<!-- last-reviewed: 0d84014 -->
