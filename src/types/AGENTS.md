# AGENTS.md — `src/types/`

Shared TypeScript types and Zod schemas used across `src/`.

## Index

### Files here

*(none yet)*

### Planned (not yet created)

| File | Purpose | Tracked in |
|---|---|---|
| `template-selection.ts` | Zod schema for the LLM's structured output | `docs/architecture.md` |
| `template.ts` | The `TemplateProps` contract | `src/templates/AGENTS.md` |
| `api.ts` | Request/response shapes for `/api/generate` | `docs/architecture.md` |

## Rules

- **Schemas first, types derived.** Use `z.infer<typeof Schema>` to avoid drift.
- **One concept per file.** `template-selection.ts`, `palette.ts`, etc.
- **No runtime code.** Types and schemas only. Helpers go in `src/lib/`.

## Example

```ts
import { z } from 'zod';

export const TemplateSelectionSchema = z.object({
  templateId: z.enum(['coffee-shop', 'tech-saas', 'service-pro', 'retail']),
  palette: z.object({
    primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  }),
  copy: z.object({
    businessName: z.string().min(1).max(40),
    tagline: z.string().min(1).max(80),
  }),
  iconKey: z.string().optional(),
});

export type TemplateSelection = z.infer<typeof TemplateSelectionSchema>;
```

---

<!-- last-reviewed: a9279ef -->
