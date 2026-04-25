# ADR 0001: Use Bun as package manager and runtime

## Status

Accepted — 2026-04-25

## Context

3-hour hackathon. Install time, dev startup, and TypeScript execution speed all matter. Lance has a global preference for Bun over npm/yarn/pnpm.

## Decision

Use Bun ≥ 1.1 as both package manager and runtime. Commit `bun.lockb`. Forbid `npm`, `yarn`, and `pnpm` invocations in the repo.

## Consequences

- Faster `install` and `dev` startup vs. npm
- Native TypeScript execution where applicable
- Vercel deploy still works (Bun-aware build detection)
- Contributors must have Bun installed; documented in README quick start

## Alternatives considered

- **npm** — slower, no upside for this project
- **pnpm** — fast but not Lance's preference and adds an install step for contributors
