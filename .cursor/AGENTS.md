# AGENTS.md — `.cursor/`

Cursor-specific configuration: rules and hooks. Not required by the presence check (this dir is outside the enforced roots), but documented here for clarity.

## Index

### Files here

| File | Purpose |
|---|---|
| `hooks.json` | Hook registration (which scripts run on which Cursor events) |

### Subdirectories

| Dir | Contents |
|---|---|
| `rules/` | `core.mdc` (alwaysApply, project-wide), `typescript.mdc` (`**/*.ts(x)`), `react.mdc` (`**/*.tsx`), `svg-templates.mdc` (`src/templates/**/*.tsx`) |
| `hooks/` | `check-agents-md.sh` — postToolUse Write hook that nudges when an agent writes to a dir without `AGENTS.md` |

## Rules conventions

- Keep each rule under 50 lines.
- One concern per rule.
- Frontmatter `alwaysApply: true` only for the smallest possible always-on guidance.
- File-specific rules use `globs` and `alwaysApply: false`.

## Hooks conventions

- **Hooks fail open.** They never block writes — that's pre-commit's job.
- **Hooks must be deterministic.** No LLM calls inside hooks.
- **Hooks must be fast.** Default timeout is 5s; if you need longer, you're doing too much.
- **Hooks need executable bit set:** `chmod +x .cursor/hooks/<name>.sh`.
- **Use `jq` for JSON parsing**, not bash regex. The hook should fail open if `jq` isn't available.
