# AGENTS.md — `src/templates/`

**This directory is the product's moat. Treat it accordingly.**

## What lives here

Hand-crafted, parameterized SVG motion templates. Each one is a React component using Framer Motion.

## What does NOT live here

- AI-generated SVG (we don't do that — see top-level [`AGENTS.md`](../../AGENTS.md))
- Lottie files
- External image references
- Anything that loads at runtime from a network

## The contract

Every template implements:

```ts
type TemplateProps = {
  businessName: string;
  tagline: string;
  primaryColor: string;   // hex
  accentColor: string;    // hex
  iconKey?: string;
};

export default function MyTemplate(props: TemplateProps): JSX.Element;
```

And is registered in `registry.ts`:

```ts
import CoffeeShop from './coffee-shop';

export const templates = {
  'coffee-shop': {
    component: CoffeeShop,
    description: 'Warm, cozy. Coffee shops, bakeries, brunch spots.',
    palette: { primary: '#5B3A1E', accent: '#D4A574' },
  },
  // ...
} as const;
```

The `description` field is what the LLM reads to pick a template. Make it specific.

## Authoring rules

See `.cursor/rules/svg-templates.mdc` for the full list. Highlights:

- `viewBox="0 0 800 600"` everywhere
- 4–6 second loop, seamless
- Respect `prefers-reduced-motion`
- Max ~30 animated elements
- No comments narrating what shapes are — name your variables clearly instead

## Cap

**4 templates total** for the hackathon. Adding a 5th means removing one. File a `template-request` issue.

---

<!-- last-reviewed: 0d84014 -->
