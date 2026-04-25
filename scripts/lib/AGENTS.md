# AGENTS.md — `scripts/lib/`

Helper modules used by the check and stamp scripts. Pure functions, stdlib only.

## Files

| File | Exports | Purpose |
|---|---|---|
| `config.ts` | `config`, `formatStamp`, `parseStamp` | Tunables and stamp format |
| `walk.ts` | `walkDirs`, `dirHasFiles`, `DirEntry` | Recursive directory iterator |
| `git.ts` | `headSha`, `shaExists`, `changedFilesIn` | Thin git wrappers via `child_process` |
| `types.ts` | `Severity`, `Finding`, `CheckResult`, `ok` | Shared shapes |
| `check-presence.ts` | `checkPresence` | Layer 2a — every dir needs AGENTS.md |
| `check-forbidden.ts` | `checkForbidden` | Layer 2c — no wrong-PM lockfiles, no `.env` |
| `check-freshness.ts` | `checkFreshness` | Layer 5 — stale stamps fail the build |

## Rules

- **No `dependencies`.** Stdlib (`node:fs`, `node:path`, `node:child_process`) only. Bun runs TypeScript natively, no transpile step.
- **No React, no Next.js, no product imports.**
- **Each check exports a single `check<Name>(repoRoot, opts?)` function** returning a `CheckResult`.
- **Tunables go in `config.ts`** so all knobs are in one place.
- **Side-effects are limited to `git.ts`** (which shells out to `git`) and `stamp.ts` (which writes files).

## Adding a new check

1. New file `check-<name>.ts` exporting `check<Name>(repoRoot): CheckResult`.
2. Wire into `../check.ts`: add to the `ALL` const and the dispatch.
3. Document it in `../AGENTS.md`.
4. Add the human-readable explanation to `CONTRIBUTING.md` under the Enforcement section.

---

<!-- last-reviewed: 58bbdc9 -->
