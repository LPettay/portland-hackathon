<script setup lang="ts">
/**
 * Slide 2 — Architecture & tech stack.
 *
 * Left half: the data flow as a vertical pipeline (input → API → LLM → SVG → page).
 * Right half: the deliberate stack choices, each with a one-line "why."
 */

const stack = [
  { layer: 'Runtime',  pick: 'Bun',           why: 'one toolchain for install, run, scripts' },
  { layer: 'Framework', pick: 'Next.js 15',   why: 'App Router, server components by default' },
  { layer: 'Lang',     pick: 'TypeScript',    why: 'strict mode; Zod for LLM I/O at the boundary' },
  { layer: 'Style',    pick: 'Tailwind 4',    why: 'no CSS modules, no design system overhead' },
  { layer: 'Motion',   pick: 'Framer Motion', why: 'license-clear, declarative, reduced-motion aware' },
  { layer: 'LLM',      pick: 'OpenAI (JSON)', why: 'structured outputs, schema-bound, retryable' },
  { layer: 'Deploy',   pick: 'Vercel',        why: 'preview per branch, zero-config Next.js' },
];
</script>

<template>
  <div class="sa">
    <div class="sa-eyebrow">Architecture &middot; the smallest thing that ships</div>
    <h1 class="sa-h1">
      One API route, one schema, one render path.
    </h1>
    <p class="sa-tag">
      Built for a 3-hour window. Every box on the left has a single owner;
      every choice on the right has a single reason.
    </p>

    <div class="sa-cols">
      <div class="sa-col-flow">
        <div class="sa-col-eyebrow">
          <span class="sa-num">A</span>
          Data flow
        </div>

        <div class="sa-flow">
          <div class="sa-step">
            <div class="sa-step-mark">✦</div>
            <div>
              <div class="sa-step-title">User input</div>
              <div class="sa-step-meta"><code>&lt;InputBox/&gt;</code> &middot; one text field</div>
            </div>
          </div>

          <div class="sa-step">
            <div class="sa-step-mark">→</div>
            <div>
              <div class="sa-step-title">POST <code>/api/generate</code></div>
              <div class="sa-step-meta">edge-friendly route handler &middot; server-only</div>
            </div>
          </div>

          <div class="sa-step">
            <div class="sa-step-mark">⌬</div>
            <div>
              <div class="sa-step-title">OpenAI &middot; JSON mode</div>
              <div class="sa-step-meta">prompt &rarr; structured output &middot; bound to <code>GenerationSchema</code></div>
            </div>
          </div>

          <div class="sa-step">
            <div class="sa-step-mark">✓</div>
            <div>
              <div class="sa-step-title">Validate with Zod</div>
              <div class="sa-step-meta">retry on parse failure &middot; never trusts the wire</div>
            </div>
          </div>

          <div class="sa-step">
            <div class="sa-step-mark">★</div>
            <div>
              <div class="sa-step-title">Render the SVG gif</div>
              <div class="sa-step-meta">React server component &middot; CSS-driven loop</div>
            </div>
          </div>
        </div>
      </div>

      <div class="sa-col-stack">
        <div class="sa-col-eyebrow">
          <span class="sa-num">B</span>
          Stack
        </div>

        <table class="sa-stack-table">
          <tbody>
            <tr v-for="row in stack" :key="row.layer">
              <td class="sa-layer">{{ row.layer }}</td>
              <td class="sa-pick">{{ row.pick }}</td>
              <td class="sa-why">{{ row.why }}</td>
            </tr>
          </tbody>
        </table>

        <div class="sa-norules">
          <span class="sa-no">no</span>
          database &middot; auth &middot; cache &middot; analytics &middot; image gen
        </div>
      </div>
    </div>

    <div class="sa-foot">
      <span><strong>One feature &middot; one branch &middot; one PR &middot; one squash.</strong> CI gates every merge to main.</span>
      <span class="sa-foot-pg">2 &nbsp;/&nbsp; 3</span>
    </div>
  </div>
</template>

<style scoped>
.sa {
  position: absolute;
  inset: 0;
  padding: 32px 56px 56px;
  background: #fffbf2;
  color: #1c1917;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sa-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #ea580c;
  font-weight: 600;
  margin-bottom: 4px;
}

.sa-h1 {
  font-family: 'Fraunces', serif;
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  font-weight: 600;
}

.sa-tag {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #57534e;
  margin: 0;
  max-width: 65ch;
}

.sa-cols {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 36px;
  margin-top: 16px;
  flex: 1;
  min-height: 0;
}

.sa-col-eyebrow {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: 'Fraunces', serif;
  font-size: 18px;
  font-weight: 600;
  color: #1c1917;
  margin-bottom: 10px;
}
.sa-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  color: #ea580c;
  font-weight: 700;
}

/* flow */
.sa-flow {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.sa-step {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  align-items: center;
  background: #ffffff;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 1px 2px rgba(124, 45, 18, 0.04);
}
.sa-step-mark {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fef3c7;
  border: 1px solid #fcd9a4;
  color: #ea580c;
  display: grid;
  place-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
}
.sa-step-title {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #1c1917;
}
.sa-step-meta {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #78716c;
  margin-top: 2px;
}
.sa-step-meta code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.92em;
  background: #fef3c7;
  border: 1px solid #fcd9a4;
  color: #7c2d12;
  padding: 0 4px;
  border-radius: 3px;
}

/* stack table */
.sa-stack-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
}
.sa-stack-table tr {
  border-bottom: 1px dashed #fde68a;
}
.sa-stack-table tr:last-child { border-bottom: none; }
.sa-stack-table td {
  padding: 7px 0;
  vertical-align: top;
}
.sa-layer {
  width: 70px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #a8a29e;
  padding-top: 9px !important;
}
.sa-pick {
  width: 110px;
  font-weight: 600;
  color: #1c1917;
}
.sa-why {
  color: #57534e;
  line-height: 1.5;
}

.sa-norules {
  margin-top: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #78716c;
  background: #fef3c7;
  border: 1px dashed #fcd9a4;
  padding: 8px 12px;
  border-radius: 8px;
}
.sa-no {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  color: #ea580c;
  text-transform: uppercase;
  margin-right: 6px;
  font-weight: 700;
}

.sa-foot {
  position: absolute;
  left: 56px;
  right: 56px;
  bottom: 18px;
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #a8a29e;
}
.sa-foot strong { color: #1c1917; font-weight: 600; }
.sa-foot-pg {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
}
</style>
