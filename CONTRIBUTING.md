# Contributing

This is a hackathon project with a 3-hour build window. These conventions exist to keep the team (humans + AI agents) coordinated and shipping.

---

## Hackathon ground rules

1. **No scope creep.** If it's not on the [demo script](./docs/demo-script.md), don't build it. Open a `nice-to-have` issue instead.
2. **Demo path always works.** Anything that breaks the live demo flow is a P0.
3. **Visible progress every 30 min.** Push to `main` (or merge a PR) at least every half hour so everyone can see momentum.
4. **The hand-crafted templates are the moat.** Polish them. Don't let the LLM touch raw SVG.

---

## Branching

- `main` is always demo-ready
- Feature branches: `feat/<short-description>` (e.g. `feat/template-coffee-shop`)
- Fix branches: `fix/<short-description>`
- Docs branches: `docs/<short-description>`
- Chore branches: `chore/<short-description>`

---

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/). Imperative mood, lowercase, no trailing period.

```
feat: add coffee shop motion template
fix: handle empty LLM response gracefully
docs: update demo script with backup prompts
chore: bump framer-motion to 11.5
```

For multi-line commits, use a HEREDOC:

```bash
git commit -m "$(cat <<'EOF'
feat: add coffee shop motion template

- 4-second loop with steam particles and brewing fill
- Parameterized palette and businessName props
- Tested with prompts: "Stumptown roastery", "Heart Coffee"
EOF
)"
```

---

## Parallel agents → one worktree per agent

A single git checkout has **one `HEAD`**. Two Cursor sessions sharing the same checkout will trample each other's `git switch`, and you'll silently end up with branches rooted at the wrong tip. We've already been bitten by this once.

The rule: **one worktree per concurrent agent.** If you're spinning up a parallel session, create a worktree for it first.

```bash
# from the primary checkout
bun run wt:add feat/coffee-shop          # creates ../<repo>-wt/feat-coffee-shop on a new branch
bun run wt:add docs/preso-scaffolding-slide   # picks up an existing local or remote branch automatically

bun run wt:list                          # see all worktrees
bun run wt:remove feat/coffee-shop       # tear down (deletes branch only if merged to origin/main)
```

Then open the printed worktree path in a new Cursor window. That session's agent now has its own independent `HEAD`, index, stash, and pre-commit hook invocation. Branches can no longer cross-contaminate.

The primary checkout (`~/PortlandHackathon`) should stay on `main`, used only for pulls and admin. All real work happens in worktrees.

Rationale: [`docs/decisions/0006-git-worktrees-for-parallel-agents.md`](./docs/decisions/0006-git-worktrees-for-parallel-agents.md).

---

## Pull requests

`main` is **branch-protected**. You cannot push directly. Every change goes through this loop:

```bash
git switch main && git pull --ff-only         # start from latest main
git switch -c feat/<short-slug>               # new branch per change
# ... do the work ...
bun run check                                 # quick local sanity (pre-commit will too)
git add . && git commit -m "feat: ..."        # conventional commit
git push -u origin HEAD                       # push the branch
gh pr create --fill --web                     # open PR using the template
# ... wait for CI (~10s) ...
gh pr merge --squash --delete-branch          # merge once green
git switch main && git pull --ff-only         # sync local main
```

### Rules (enforced by GitHub branch protection)

1. **Open against `main`** — direct pushes are blocked
2. **Use the [PR template](./.github/PULL_REQUEST_TEMPLATE.md)** — `gh pr create --fill` will populate it
3. **CI must pass** (`hygiene` job: repo checks + typecheck) before merge
4. **Self-review your diff** before merging — `gh pr diff` or the web UI
5. **Keep PRs small** (< 300 lines diff ideal); huge PRs get rejected at the door
6. **Confirm `bun dev` works** for any PR that touches product code

### Solo-merge is allowed

Approval count is set to **0** so solo work isn't blocked, but the PR is still required and CI still gates the merge. The PR template is the paper trail.

### Squash-merge always

We squash-merge so `main` history stays one-commit-per-PR. Conventional Commit titles on the PR become the commit message on `main`.

### Branch naming

| Prefix | Use |
|---|---|
| `feat/` | New capability or feature |
| `fix/` | Bug fix |
| `docs/` | Docs only |
| `chore/` | Tooling, config, refactor with no behavior change |
| `revert/` | Reverting a prior change |

### Emergency bypass

Branch protection has `enforce_admins: true` — there is **no escape hatch.** If you absolutely must commit straight to `main` (broken CI blocking the demo, etc.), the only path is:

1. Temporarily disable protection: `gh api -X DELETE /repos/<owner>/<repo>/branches/main/protection`
2. Push the fix
3. **Immediately** re-enable protection (use the JSON in [`.github/branch-protection.json`](./.github/branch-protection.json))

Document why in the commit message. Re-enable before walking away from the keyboard.

---

## Code style

- **TypeScript strict mode** is on. No `any` without a `// eslint-disable-next-line` and a comment explaining why.
- **Functional React components** only. No class components.
- **No comments that narrate code.** Comments explain *why*, not *what*.
- **Tailwind for styling.** No CSS modules unless absolutely necessary.
- **Server components by default.** Add `"use client"` only when you need interactivity or browser APIs.
- **One concern per file.** If a file exceeds ~200 lines, consider splitting.

See [`.cursor/rules/`](./.cursor/rules/) for the enforceable version of these.

---

## AI agent workflow

This repo is built with Cursor agents. To keep them effective:

1. **Read the `AGENTS.md`** in the directory you're working in before making changes.
2. **Prefer editing existing files** over creating new ones.
3. **Run `bun run check`** before committing — and the pre-commit hook will run it for you anyway.
4. **If a Cursor agent makes a structural decision** (new dependency, new directory, architectural shift), document it as a one-paragraph ADR in `docs/decisions/`.

## Enforcement

Conventions in this repo are enforced by a 5-layer system. You don't have to remember them — the tooling will tell you when something's off.

| Layer | What it catches | When |
|---|---|---|
| **1. Documentation** | Intent only — describes the rules | Always |
| **2. `bun run check`** | Missing AGENTS.md, forbidden lockfiles, stale stamps | Manual or pre-commit |
| **3. Pre-commit (lefthook)** | Runs `bun run check` automatically | Every `git commit` |
| **4. Cursor hook** | Live nudge when an agent writes to a dir without AGENTS.md | While Cursor is editing |
| **5. CI (GitHub Actions)** | Backstop — same checks plus typecheck | Every push & PR |

### The freshness contract

Every `AGENTS.md` carries a footer:

```markdown
<!-- last-reviewed: 0d84014 -->
```

When more than **5 non-AGENTS files** in its directory change after that SHA, the doc is considered stale and `bun run check` will fail until you:

1. **Read the current `AGENTS.md`** for that directory
2. **Read what changed** in the directory since the stamp: `git diff <sha>..HEAD -- <dir>`
3. **Edit the AGENTS.md if it no longer accurately reflects the directory**
4. **Re-stamp it:** `bun run agents:stamp <path-to-agents-md>`

To stamp every AGENTS.md at once (after a sweeping review): `bun run agents:stamp-all`.

To see what's currently stale: `bun run agents:stale`.

### Bypassing checks

If you absolutely must commit through a failure, use `git commit --no-verify` and document **why** in the commit body. CI will still catch it on push.

---

## Stack constraints (do not violate)

- **Package manager: bun.** Never npm, yarn, or pnpm. `bun.lockb` is committed.
- **Runtime: Bun preferred, Node compatible.**
- **Framework: Next.js 15 (App Router).**
- **Animation: Framer Motion.** No GSAP (license + bundle size).
- **LLM: OpenAI structured outputs (JSON mode).** Never request raw SVG from the model.

---

## Filing issues

Use the [issue templates](./.github/ISSUE_TEMPLATE/) when available. For a hackathon, GitHub issues may be replaced by a shared note doc — confirm with the team before filing.
