# ADR 0006: One git worktree per concurrent agent session

## Status

Accepted — 2026-04-25

## Context

While building the scaffolding layer we ran two Cursor sessions against the same on-disk checkout — one writing the judges-handout slide, one writing the AGENTS.md Index convention. The result was a silent cross-contamination: when session A ran `git switch -c <branch>`, it moved the shared `HEAD`, and when session B subsequently ran its own `git switch -c <other-branch>`, the new branch was rooted at session A's tip rather than `main`. Session B then committed work that included session A's commit by accident, pushed it under a misnamed remote ref, and only the diff comparison caught it.

The root cause is structural: **a git checkout has exactly one `HEAD`**. Two agents sharing one checkout share one HEAD. Any coordination scheme built on top of "remember to switch to `main` before branching" is one missed step away from the same failure.

## Decision

Every concurrent agent session works in its own `git worktree`. The primary checkout (`~/PortlandHackathon`) stays on `main` and is used only for pulls and admin. All real work happens in sibling worktrees at `~/PortlandHackathon-wt/<slug>/`, each with its own independent `HEAD`, index, stash, and pre-commit invocation.

A small helper (`scripts/worktree.ts`, exposed as `bun run wt:add | wt:list | wt:remove`) wraps `git worktree` with the naming convention and handles three cases automatically:

- **New branch** — branched from `origin/main` after a fetch.
- **Existing local branch** — checked out into the new worktree as-is.
- **Existing remote branch** — created locally tracking `origin/<branch>`.

The branch keeps its slash (`feat/coffee-shop`); the worktree directory flattens it (`feat-coffee-shop`).

## Consequences

- **Pro:** Cross-session contamination becomes structurally impossible. Each session's `HEAD` lives in its own working directory.
- **Pro:** Each worktree runs its own pre-commit hook against its own diff — no more "whichever session committed last won the race."
- **Pro:** `git stash` is per-worktree, so two agents can't pop each other's WIP.
- **Pro:** Onboarding a new parallel session is a single command: `bun run wt:add <branch>`.
- **Pro:** `gh pr create`, `gh pr merge`, and lefthook all work transparently — `.git/` is shared, only the working tree is per-worktree.
- **Con:** Each worktree gets its own `node_modules` (Bun's CAS keeps disk impact small, but `bun install` runs once per worktree).
- **Con:** Agents must learn to run all repo commands from inside their worktree, not from the primary checkout. The Cursor "Open Folder" picker mostly handles this naturally.
- **Neutral:** The primary checkout becomes a coordination point rather than a workspace. This matches how teams use `main` in practice anyway.

## Alternatives considered

- **Convention-only ("always switch to `main` before branching")** — that's what we tried implicitly; it failed within the first day. Any rule that requires every session to remember a step is one missed step from the same outcome. Rejected.
- **One Cursor session at a time** — defeats the point of having parallel agents on a 3-hour build window. Rejected.
- **Per-session clones** (full `git clone` per agent into separate directories) — works but is heavyweight: every clone re-fetches all refs, and pushing/pulling between clones requires `origin` round-trips. Worktrees share `.git/` so refs and objects are unified. Rejected for being needlessly heavy.
- **Lockfile / mutex on `.git/HEAD`** — clever but invents a coordination protocol git already solved with worktrees. Rejected.
