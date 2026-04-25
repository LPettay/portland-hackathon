<!--
Keep PRs small. Hackathon goal: < 300 lines diff, mergeable in < 5 minutes of review.
-->

## What

<!-- One sentence: what does this PR do? -->

## Why

<!-- Why is this change needed? Link to the demo script section, ADR, or issue if relevant. -->

## Demo impact

<!-- Pick one and delete the others -->
- [ ] **Demo path** — directly affects what judges see
- [ ] **Demo support** — improves reliability/polish but invisible to judges
- [ ] **Internal** — refactor, dev tooling, docs only

## Screenshots / clips

<!-- Required for any UI or animation change. Drag-drop a screen recording or PNG. -->

## Checklist

- [ ] `bun run lint` passes
- [ ] `bun run typecheck` passes
- [ ] `bun dev` runs without errors
- [ ] Demo flow still works end-to-end (if Demo path or Demo support)
- [ ] Updated relevant `AGENTS.md` if I changed structure or conventions
- [ ] Logged an ADR in `docs/decisions/` if this was a structural decision

## Out-of-scope reminder

<!-- Confirm: this PR does NOT add any of the following -->
- [ ] No auth, no database, no persistence
- [ ] No new template beyond the 4-template cap (unless replacing one)
- [ ] No new npm dependency without prior human sign-off
