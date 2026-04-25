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

## Pull requests

1. Open against `main`
2. Use the [PR template](./.github/PULL_REQUEST_TEMPLATE.md)
3. Self-review your diff before requesting review
4. Keep PRs small (< 300 lines diff ideal); huge PRs get rejected at the door
5. **No PR merges without a working `bun dev` confirmed by the author**

For 3-hour hackathon cadence: PRs may be reviewed and merged by the author in solo work, but the template still gets filled out so we have a paper trail for the demo.

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
3. **Run `bun run lint && bun run typecheck`** before committing if you've changed code.
4. **If a Cursor agent makes a structural decision** (new dependency, new directory, architectural shift), document it as a one-paragraph ADR in `docs/decisions/`.

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
