<script setup lang="ts">
/**
 * Slide 3 visual: the 5-layer "kept the AI honest" enforcement chain.
 *
 * Each layer is a labeled stop along a horizontal pipeline. A token pulses
 * down the line so the slide reads as a flow, not a static list. This is
 * the engineering rigor signal — we want judges to register it instantly.
 */

const layers = [
  { code: 'AGENTS.md',     when: 'authoring',       what: 'per-dir agent charter' },
  { code: 'bun run check', when: 'manual',          what: 'presence + freshness'  },
  { code: 'pre-commit',    when: 'every git commit', what: 'block bad commits'    },
  { code: 'IDE hook',      when: 'live',            what: 'nudge in Cursor'       },
  { code: 'CI on main',    when: 'every PR',        what: 'protected backstop'    },
];
</script>

<template>
  <div class="ec-wrap">
    <div class="ec-rail">
      <div class="ec-line" />
      <div class="ec-token" aria-hidden="true" />
      <div
        v-for="(layer, i) in layers"
        :key="layer.code"
        class="ec-stop"
        :style="{ left: `calc(${(i / (layers.length - 1)) * 100}% )` }"
      >
        <div class="ec-stop-dot" />
        <div class="ec-stop-label">
          <div class="ec-stop-num">0{{ i + 1 }}</div>
          <div class="ec-stop-code">{{ layer.code }}</div>
          <div class="ec-stop-when">{{ layer.when }}</div>
          <div class="ec-stop-what">{{ layer.what }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ec-wrap {
  width: 100%;
  padding: 22px 28px 24px;
}

.ec-rail {
  position: relative;
  height: 8px;
  margin: 0 24px 86px;
}

.ec-line {
  position: absolute;
  top: 3px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #fed7aa 0%, #fb923c 50%, #ea580c 100%);
  border-radius: 2px;
}

.ec-token {
  position: absolute;
  top: -3px;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ea580c;
  box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.18);
  animation: ec-flow 5.5s ease-in-out infinite;
}

@keyframes ec-flow {
  0%   { left: 0%;   transform: translateX(0); }
  90%  { left: 100%; transform: translateX(-100%); }
  100% { left: 100%; transform: translateX(-100%); opacity: 0; }
}

.ec-stop {
  position: absolute;
  top: -4px;
  transform: translateX(-50%);
  width: 120px;
  text-align: center;
}

.ec-stop-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #ea580c;
  margin: 0 auto;
}

.ec-stop-label {
  margin-top: 14px;
}

.ec-stop-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
  color: #ea580c;
  font-weight: 700;
}

.ec-stop-code {
  margin-top: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: #1c1917;
}

.ec-stop-when {
  margin-top: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #a8a29e;
}

.ec-stop-what {
  margin-top: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #57534e;
  line-height: 1.35;
}

@media (prefers-reduced-motion: reduce) {
  .ec-token { animation: none; opacity: 0; }
}
</style>
