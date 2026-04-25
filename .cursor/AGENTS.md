# AGENTS.md — `.cursor/`

Cursor-specific configuration: rules and hooks. Not required by the presence check (this dir is outside `src/` and `docs/`), but documented here for clarity.

## Layout

```
.cursor/
├── rules/                       # Persistent agent rules (.mdc)
│   ├── core.mdc                 # alwaysApply: true — project-wide
│   ├── typescript.mdc           # globs: **/*.ts(x)
│   ├── react.mdc                # globs: **/*.tsx
│   └── svg-templates.mdc        # globs: src/templates/**/*.tsx
├── hooks/
│   └── check-agents-md.sh       # postToolUse Write hook
└── hooks.json                   # hook registration
```

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
