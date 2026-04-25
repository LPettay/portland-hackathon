<!--
Keep PRs small. Hackathon goal: < 300 lines diff, mergeable in < 5 minutes of review.

Only leave a checkbox in the body if you intend to check it. Delete or rewrite
items that don't apply rather than shipping the PR with unchecked boxes — they
read as incomplete tasks.
-->

## What

<!-- One sentence: what does this PR do? -->

## Why

<!-- Why is this change needed? Link to the demo script section, ADR, or issue if relevant. -->

## Demo impact

<!-- Pick exactly one and DELETE the other two lines. -->
- [ ] **Demo path** — directly affects what judges see
- [ ] **Demo support** — improves reliability/polish but invisible to judges
- [ ] **Internal** — refactor, dev tooling, docs only

## Screenshots / clips

<!-- Required for any UI or animation change. Drag-drop a screen recording or PNG. Delete this section for non-UI PRs. -->

## Checklist

<!--
Required for every PR. Strike through (~~item~~) or delete any item that's
genuinely N/A so the remaining boxes are real, checkable tasks.
-->

- [ ] `bun run check` passes (presence + forbidden + freshness)
- [ ] `bun run typecheck` passes
- [ ] CI `hygiene` job is green on this PR — **verify after `gh pr checks --watch`, before `gh pr merge`**
- [ ] `bun dev` runs without errors (only once the Next.js app exists; delete this line until then)
- [ ] Demo flow still works end-to-end (only if Demo path or Demo support; delete otherwise)
- [ ] Updated relevant `AGENTS.md` if I changed structure or conventions in that directory
- [ ] Logged an ADR in `docs/decisions/` if this was a structural decision
- [ ] Working in a dedicated worktree (`bun run wt:add`) if any other agent session is active

## Out-of-scope reminder

<!-- Confirm: this PR does NOT add any of the following. Leave these checked. -->
- [ ] No auth, no database, no persistence
- [ ] No new template beyond the 4-template cap (unless replacing one)
- [ ] No new npm dependency without prior human sign-off
