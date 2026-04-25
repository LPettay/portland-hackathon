# AGENTS.md — `src/types/`

Shared TypeScript types and Zod schemas used across `src/`.

## Rules

- **Schemas first, types derived.** Use `z.infer<typeof Schema>` to avoid drift.
- **One concept per file.** `template-selection.ts`, `palette.ts`, etc.
- **No runtime code.** Types and schemas only. Helpers go in `src/lib/`.

## Expected files (hackathon scope)

| File | Purpose |
|---|---|
| `template-selection.ts` | Zod schema for the LLM's structured output |
| `template.ts` | The `TemplateProps` contract |
| `api.ts` | Request/response shapes for `/api/generate` |

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

<!-- last-reviewed: 0d84014 -->
