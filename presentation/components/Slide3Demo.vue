<script setup lang="ts">
/**
 * Slide 3 — The product + the live link.
 *
 * Closes the deck with what MotionPitch actually does: prompt in, cute
 * SVG gif out. Three illustrative outputs sit beside the URL the judges
 * should open on their phones.
 */
</script>

<template>
  <div class="sd">
    <div class="sd-eyebrow">The product &middot; what comes out</div>
    <h1 class="sd-h1">
      Prompt in. <em>Cute SVG gif</em> out.
    </h1>
    <p class="sd-tag">
      One sentence describing a vibe, person, or thing. Ten seconds later you
      get a looping, hand-feeling SVG you can drop into Slack, a slide, a
      sticker sheet, or a 404 page.
    </p>

    <div class="sd-cols">
      <div class="sd-gallery">
        <div class="sd-card sd-card-1">
          <svg viewBox="0 0 160 120" class="sd-svg">
            <rect width="160" height="120" fill="#fef3c7" />
            <g class="sd-cat">
              <ellipse cx="80" cy="78" rx="32" ry="24" fill="#1c1917" />
              <circle cx="80" cy="50" r="22" fill="#1c1917" />
              <polygon points="64,38 60,22 74,32" fill="#1c1917" />
              <polygon points="96,38 100,22 86,32" fill="#1c1917" />
              <circle cx="73" cy="50" r="3" fill="#fef3c7" />
              <circle cx="87" cy="50" r="3" fill="#fef3c7" />
              <path d="M 76 58 Q 80 62 84 58" stroke="#fef3c7" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <path class="sd-tail" d="M 110 88 q 18 -4 18 -22 q 0 -10 -8 -10" stroke="#1c1917" stroke-width="6" fill="none" stroke-linecap="round" />
            </g>
          </svg>
          <div class="sd-cap">
            <span class="sd-prompt">"a sleepy cat in a coffee shop"</span>
          </div>
        </div>

        <div class="sd-card sd-card-2">
          <svg viewBox="0 0 160 120" class="sd-svg">
            <rect width="160" height="120" fill="#ecfccb" />
            <g class="sd-rocket">
              <polygon points="80,30 92,76 68,76" fill="#fafaf9" stroke="#3f6212" stroke-width="2" />
              <polygon points="80,30 92,76 80,72" fill="#d9f99d" />
              <circle cx="80" cy="56" r="4" fill="#3f6212" />
              <polygon points="68,76 60,90 72,82" fill="#84cc16" />
              <polygon points="92,76 100,90 88,82" fill="#84cc16" />
              <g class="sd-flame">
                <polygon points="74,82 80,100 86,82" fill="#fb923c" />
                <polygon points="76,82 80,94 84,82" fill="#fef3c7" />
              </g>
              <g class="sd-stars" fill="#3f6212">
                <circle cx="30" cy="30" r="1.5" />
                <circle cx="130" cy="42" r="1" />
                <circle cx="22" cy="80" r="1" />
                <circle cx="138" cy="92" r="1.5" />
              </g>
            </g>
          </svg>
          <div class="sd-cap">
            <span class="sd-prompt">"a tiny rocket about to launch"</span>
          </div>
        </div>

        <div class="sd-card sd-card-3">
          <svg viewBox="0 0 160 120" class="sd-svg">
            <rect width="160" height="120" fill="#fce7f3" />
            <g class="sd-ghost">
              <path d="M 60 36 Q 60 18 80 18 Q 100 18 100 36 L 100 90 L 90 82 L 80 90 L 70 82 L 60 90 Z" fill="#fafaf9" stroke="#9d174d" stroke-width="2" />
              <circle cx="74" cy="48" r="3" fill="#9d174d" />
              <circle cx="86" cy="48" r="3" fill="#9d174d" />
              <ellipse cx="80" cy="60" rx="6" ry="3" fill="#9d174d" />
              <circle class="sd-blush" cx="68" cy="58" r="3" fill="#fb7185" opacity="0.7" />
              <circle class="sd-blush" cx="92" cy="58" r="3" fill="#fb7185" opacity="0.7" />
            </g>
          </svg>
          <div class="sd-cap">
            <span class="sd-prompt">"a friendly ghost saying hi"</span>
          </div>
        </div>
      </div>

      <div class="sd-cta">
        <div class="sd-cta-eyebrow">Try it</div>
        <div class="sd-url">motionpitch.vercel.app</div>
        <div class="sd-cta-tag">
          One input box. No login. Refresh for a new vibe.
        </div>

        <div class="sd-meta">
          <div class="sd-meta-row">
            <span class="sd-meta-k">repo</span>
            <span class="sd-meta-v">github.com/LPettay/portland-hackathon</span>
          </div>
          <div class="sd-meta-row">
            <span class="sd-meta-k">built</span>
            <span class="sd-meta-v">3-hour sprint &middot; Cursor + Claude + GPT</span>
          </div>
          <div class="sd-meta-row">
            <span class="sd-meta-k">stack</span>
            <span class="sd-meta-v">Bun &middot; Next.js 15 &middot; Tailwind &middot; Framer Motion</span>
          </div>
        </div>
      </div>
    </div>

    <div class="sd-foot">
      <span><strong>Thanks for judging.</strong> Open the URL on your phone &mdash; the gifs loop forever.</span>
      <span class="sd-foot-pg">3 &nbsp;/&nbsp; 3</span>
    </div>
  </div>
</template>

<style scoped>
.sd {
  position: absolute;
  inset: 0;
  padding: 36px 56px 56px;
  background: #fffbf2;
  color: #1c1917;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sd-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #ea580c;
  font-weight: 600;
  margin-bottom: 4px;
}

.sd-h1 {
  font-family: 'Fraunces', serif;
  font-size: 40px;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  font-weight: 600;
}
.sd-h1 em { color: #ea580c; font-style: italic; }

.sd-tag {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #57534e;
  margin: 0;
  max-width: 64ch;
}

.sd-cols {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 36px;
  margin-top: 16px;
  flex: 1;
  min-height: 0;
}

/* gallery */
.sd-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  align-content: start;
}
.sd-card {
  background: #ffffff;
  border: 1px solid #fde68a;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0 4px 14px -8px rgba(124, 45, 18, 0.18);
}
.sd-svg {
  width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
}
.sd-cap {
  margin-top: 6px;
  padding: 0 2px 2px;
}
.sd-prompt {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #7c2d12;
}

/* card animations */
.sd-tail {
  transform-origin: 110px 88px;
  animation: sd-tail-wag 1.6s ease-in-out infinite;
}
@keyframes sd-tail-wag {
  0%, 100% { transform: rotate(-8deg); }
  50%      { transform: rotate(8deg); }
}

.sd-flame {
  transform-origin: 80px 82px;
  animation: sd-flame-pulse 0.4s steps(2, end) infinite;
}
@keyframes sd-flame-pulse {
  0%, 50%   { transform: scaleY(1) translateY(0); }
  51%, 100% { transform: scaleY(0.7) translateY(-1px); }
}
.sd-stars circle {
  animation: sd-twinkle 1.6s ease-in-out infinite;
}
.sd-stars circle:nth-child(1) { animation-delay: 0s; }
.sd-stars circle:nth-child(2) { animation-delay: 0.4s; }
.sd-stars circle:nth-child(3) { animation-delay: 0.8s; }
.sd-stars circle:nth-child(4) { animation-delay: 1.2s; }
@keyframes sd-twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); transform-origin: center; }
  50%      { opacity: 1;   transform: scale(1.1); }
}

.sd-ghost {
  animation: sd-float 3s ease-in-out infinite;
}
@keyframes sd-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}
.sd-blush { animation: sd-blush-pulse 2.5s ease-in-out infinite; }
@keyframes sd-blush-pulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 0.85; }
}

/* CTA column */
.sd-cta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
  border: 1px solid #fcd9a4;
  border-radius: 14px;
  padding: 24px 28px;
  box-shadow: 0 12px 28px -16px rgba(124, 45, 18, 0.35);
}
.sd-cta-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #ea580c;
  font-weight: 700;
  margin-bottom: 6px;
}
.sd-url {
  font-family: 'Fraunces', serif;
  font-size: 26px;
  font-weight: 600;
  color: #1c1917;
  letter-spacing: -0.02em;
  white-space: nowrap;
  line-height: 1.05;
}
.sd-cta-tag {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #7c2d12;
  margin-top: 8px;
}

.sd-meta {
  margin-top: 18px;
  border-top: 1px dashed #fcd9a4;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
}
.sd-meta-row {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 8px;
  color: #57534e;
}
.sd-meta-k {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #a8a29e;
  padding-top: 1px;
}
.sd-meta-v code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.92em;
  color: #7c2d12;
}

.sd-foot {
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
.sd-foot strong { color: #1c1917; font-weight: 600; }
.sd-foot-pg {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
}
</style>
