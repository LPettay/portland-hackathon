# ADR 0004: All changes go through PRs against a branch-protected `main`

## Status

Accepted — 2026-04-25

## Context

Five commits already landed on `main` directly (the foundation + enforcement scaffolding). Going forward we want every feature/fix/iteration to follow a clear, repeatable cycle so:

- The demo branch is always reviewable
- CI gates every change (no commit to `main` without `bun run check` and `bunx tsc --noEmit` passing)
- The PR template + ADR pattern build an auditable history of decisions
- A teammate (or judge) reviewing the repo can see the work as a sequence of small, intentional PRs rather than a heap of commits

## Decision

`main` is branch-protected on GitHub with:

- **Required status check:** `hygiene` job (runs on every push and PR)
- **Required PR before merge:** approval count = 0 (solo-friendly), but the PR is mandatory
- **`enforce_admins: true`:** owner cannot bypass without explicitly disabling protection
- **No force pushes, no deletions**

Workflow:

```
main (protected)
  ├── feat/<slug>   →  push  →  gh pr create --fill  →  CI green  →  squash-merge
  ├── fix/<slug>    →  ...                                                  ↑
  └── docs/<slug>   →  ...                                                  ↑
                                                                         (history stays
                                                                          one commit per PR)
```

The full procedure lives in [`CONTRIBUTING.md`](../../CONTRIBUTING.md#pull-requests). The protection JSON lives in [`.github/branch-protection.json`](../../.github/branch-protection.json) for re-application after any break-glass.

## Consequences

- **Pro:** No more "oops" pushes to `main`. Every change has a PR with a self-review checklist.
- **Pro:** CI failure surfaces in the PR before merge — `main` stays demo-ready at all times.
- **Pro:** Squash-merge keeps the `main` history readable as a feature log.
- **Pro:** Branch protection JSON is version-controlled — settings can't drift unnoticed.
- **Con:** Extra ~30 seconds per change (push, open PR, wait for CI, merge). Acceptable; CI runs in ~10s.
- **Con:** Solo dev with `enforce_admins: true` means an emergency bypass requires temporarily disabling protection. Documented in CONTRIBUTING; we accept the friction in exchange for the guarantee.

## Alternatives considered

- **No protection, just convention** — relies on memory. Rejected: we already saw 5 direct commits to `main` before this ADR.
- **Require approvals (≥1)** — would block solo work entirely. Rejected.
- **Allow admin bypass (`enforce_admins: false`)** — defeats the point for a solo dev who is the only admin. Rejected.
- **Rebase-merge instead of squash-merge** — keeps individual commit messages but pollutes `main` history with WIP commits. Rejected for hackathon clarity.
