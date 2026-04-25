<script setup lang="ts">
/**
 * Slide 1 — Agentic principles (the lead).
 *
 * Built before the product. The 5-layer enforcement chain is the headline;
 * three columns underneath name the three rules of engagement that made
 * the AI a teammate instead of a chaos engine.
 */
import EnforcementChain from './EnforcementChain.vue';
</script>

<template>
  <div class="sp">
    <div class="sp-eyebrow">Principles &middot; how the agent earned trust</div>
    <h1 class="sp-h1">
      We built the <em>scaffolding</em> before the product.
    </h1>
    <p class="sp-tag">
      AI does the typing. Conventions, charters, and checks decide what gets
      kept. None of these slides exist by accident.
    </p>

    <EnforcementChain class="sp-chain" />

    <div class="sp-cols">
      <div class="sp-col">
        <div class="sp-col-num">01</div>
        <div class="sp-col-title">Per-directory <code>AGENTS.md</code></div>
        <div class="sp-col-body">
          Every folder ships a charter telling the agent what belongs and
          what doesn't &mdash; and goes <em>stale automatically</em> when the
          code drifts five files past its last review.
        </div>
      </div>

      <div class="sp-col">
        <div class="sp-col-num">02</div>
        <div class="sp-col-title">An ADR for every structural decision</div>
        <div class="sp-col-body">
          Six short, reviewable records in <code>docs/decisions/</code>.
          Bun, no-LLM-SVG, slidev sub-project, branch protection, the index
          convention, worktrees &mdash; all on the record.
        </div>
      </div>

      <div class="sp-col">
        <div class="sp-col-num">03</div>
        <div class="sp-col-title">One <code>git worktree</code> per agent</div>
        <div class="sp-col-body">
          Parallel Cursor sessions get isolated checkouts &mdash; two agents
          on two branches never trample each other's <code>HEAD</code>.
          <code>bun run wt:add &lt;branch&gt;</code>.
        </div>
      </div>
    </div>

    <div class="sp-foot">
      <span><strong>The product is the demo.</strong> The repo is the receipt.</span>
      <span class="sp-foot-pg">1 &nbsp;/&nbsp; 3</span>
    </div>
  </div>
</template>

<style scoped>
.sp {
  position: absolute;
  inset: 0;
  padding: 32px 56px 50px;
  background: #fffbf2;
  color: #1c1917;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

.sp-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #ea580c;
  font-weight: 600;
  margin-bottom: 4px;
}

.sp-h1 {
  font-family: 'Fraunces', serif;
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  font-weight: 600;
  max-width: 22ch;
}
.sp-h1 em { font-style: italic; color: #ea580c; }

.sp-tag {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #57534e;
  margin: 0;
  max-width: 65ch;
}

.sp-chain { margin: 0; flex-shrink: 0; }

.sp-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 4px;
}

.sp-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sp-col-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  color: #ea580c;
  font-weight: 700;
}

.sp-col-title {
  font-family: 'Fraunces', serif;
  font-size: 17px;
  font-weight: 600;
  color: #1c1917;
  line-height: 1.25;
}

.sp-col-body {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 1.55;
  color: #57534e;
}
.sp-col-body code,
.sp-col-title code {
  font-family: 'JetBrains Mono', monospace;
  background: #fef3c7;
  border: 1px solid #fcd9a4;
  color: #7c2d12;
  padding: 0 5px;
  border-radius: 4px;
  font-size: 0.88em;
}
.sp-col-body em { color: #7c2d12; font-style: italic; }

.sp-foot {
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
.sp-foot strong { color: #1c1917; font-weight: 600; }
.sp-foot-pg {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
}
</style>
