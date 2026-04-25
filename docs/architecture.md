# Architecture

> One-page system overview. Update when the data flow changes.

## Data flow

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  User types  │────▶│  POST            │────▶│  OpenAI         │
│  one-line    │     │  /api/generate   │     │  (JSON mode,    │
│  business    │     │                  │     │   schema-bound) │
└──────────────┘     └──────────────────┘     └─────────────────┘
                              │                        │
                              │   ◀────────────────────┘
                              │   { templateId, palette,
                              │     copy, iconKey }
                              ▼
                     ┌──────────────────┐
                     │  Validate w/ Zod │
                     └──────────────────┘
                              │
                              ▼
                     ┌──────────────────┐     ┌─────────────────┐
                     │  Return to       │────▶│  <LandingPage>  │
                     │  client          │     │   composes      │
                     └──────────────────┘     │   <Template/>   │
                                              │   + copy        │
                                              └─────────────────┘
```

## Key components

- **Input** (`src/components/InputBox.tsx`) — the single text field
- **API** (`src/app/api/generate/route.ts`) — calls OpenAI, validates output
- **LLM client** (`src/lib/openai.ts`) — wraps OpenAI SDK with structured output config
- **Templates** (`src/templates/*.tsx`) — hand-crafted SVG motion components
- **Registry** (`src/templates/registry.ts`) — the lookup the API uses to resolve `templateId`
- **Renderer** (`src/components/LandingPage.tsx`) — composes selected template with copy

## Why this shape

- **Structured outputs** prevent SVG-from-LLM disasters
- **Hand-crafted templates** guarantee visual quality regardless of LLM quirks
- **Single API route** keeps the surface area trivial for a 3-hour build
- **Server components by default** keeps the bundle small; client only where needed

## What's deliberately missing

No DB, no auth, no caching, no telemetry. See [`AGENTS.md`](../AGENTS.md) anti-scope-creep firewall.
