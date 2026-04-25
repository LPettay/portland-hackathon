# Demo Script

> **This is the contract.** Anything not on this page is out of scope until after the demo.
> Changes require human sign-off.

## Setup (before judges arrive)

- [ ] App is deployed to Vercel and reachable
- [ ] Local dev is also running as backup
- [ ] Browser tab open at the deployed URL, full-screen, presentation mode
- [ ] Wifi tested
- [ ] Three backup prompts pre-tested and known good (see below)

## The 60-second pitch

1. **Hook (0:00–0:10):**
   > "Every small business needs a landing page. They all look the same and feel dead. We bake motion design in."

2. **First demo (0:10–0:30):**
   - Type: `Stumptown roastery in Portland`
   - Wait ~10s while the SVG draws in (this *is* the loading state, not a spinner)
   - Page renders: coffee-themed motion hero, warm palette, business name, tagline

3. **Explanation (0:30–0:45):**
   > "The AI handles taste-matching — picks the right motion template and customizes copy and palette. The motion templates themselves are hand-crafted. Craft stays human; the AI does selection and customization."

4. **Second demo (0:45–0:60):**
   - Type: `Yoga studio in the Pearl District`
   - Different template fires, different palette
   - End on the rendered page

## Backup prompts (pre-tested)

Have these ready to type if a live prompt fails:

1. `Stumptown roastery in Portland`
2. `Yoga studio in the Pearl District`
3. `Indie game studio shipping a roguelike`

## What the judges should NOT see

- A spinner (we use SVG draw-in instead)
- Console errors (test in Chrome devtools beforehand)
- A loading state longer than 12 seconds
- Any page that isn't the input → output flow

## Failure modes & recoveries

| If... | Then... |
|---|---|
| OpenAI is slow (>15s) | Timeout fires, retry button shown, type a backup prompt |
| OpenAI returns invalid JSON | Zod fails, error state shows, retry button |
| Animation doesn't loop cleanly | Switch to a known-good prompt; file P0 issue post-demo |
| Wifi dies | Switch to local backup running on laptop |

## After the demo

If asked "what's next" by a judge:

> "Post-demo: deploy-to-real-domain, more templates, an editor for refining the result, and an export-as-Lottie option for video editors. The wedge is the curated motion library — that's where we'd keep investing."
