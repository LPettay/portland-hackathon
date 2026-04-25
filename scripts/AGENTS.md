# AGENTS.md — `scripts/`

Repo-hygiene tooling. **Not** product code. These scripts enforce the conventions documented in every other `AGENTS.md`.

## Files

| File | Purpose |
|---|---|
| `check.ts` | Orchestrator. Runs all enabled checks and reports findings. |
| `stamp.ts` | Writes the `<!-- last-reviewed: SHA -->` footer to AGENTS.md files. |
| `lib/config.ts` | Tunable constants (thresholds, ignored dirs, forbidden files). |
| `lib/walk.ts` | Recursive directory iterator with ignore-list awareness. |
| `lib/git.ts` | Thin wrapper around `git` for SHA + diff queries. |
| `lib/types.ts` | `Finding` + `CheckResult` shapes. |
| `lib/check-presence.ts` | Layer 2a — every dir with files needs an AGENTS.md. |
| `lib/check-forbidden.ts` | Layer 2c — no wrong-package-manager lockfiles, no `.env`. |
| `lib/check-freshness.ts` | Layer 5 — AGENTS.md goes stale after N file changes. |

## Rules

- **No React, no Next.js, no product imports.** This directory must run standalone via `bun run scripts/check.ts`.
- **Pure stdlib + node.** Use `node:fs`, `node:path`, `node:child_process`. No `dependencies`.
- **Exit codes matter.** `0` = pass, `1` = errors, `2` = bad invocation. Pre-commit and CI rely on this.
- **Findings carry `code`, `message`, optional `path`, optional `fix`.** Anything user-visible must include a `fix` hint.
- **Tunables go in `lib/config.ts`.** Never hardcode in checks.

## Adding a new check

1. Add a `lib/check-<name>.ts` exporting a `check<Name>(repoRoot): CheckResult` function.
2. Wire it into `check.ts`'s `ALL` array and dispatch.
3. Add it to `ALL` so `--only=<name>` works.
4. Document it here.

## What does NOT live here

- Product runtime code → `src/`
- Documentation → `docs/`
- CI workflow files → `.github/workflows/`

---

<!-- last-reviewed: 0d84014 -->
