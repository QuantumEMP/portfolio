<script setup lang="ts" />

<template>
  <div class="jc stock" role="img" aria-label="The Joker card">
    <span class="jc-index jc-index--tl" aria-hidden="true">JOKER</span>
    <span class="jc-index jc-index--br" aria-hidden="true">JOKER</span>

    <div class="jc-face">
      <HarlequinPattern :size="46" />
      <div class="jc-medal">
        <!-- Arlecchino jester hat -->
        <svg class="jc-hat" viewBox="0 0 220 140" aria-hidden="true">
          <g stroke="var(--color-ink)" stroke-width="4" stroke-linejoin="round">
            <path fill="var(--color-primary)" d="M40 118 C36 80 22 52 8 36 C42 40 70 64 84 106 Z" />
            <path fill="var(--color-ink)" d="M72 110 C80 62 96 28 110 10 C124 28 140 62 148 110 Z" />
            <path fill="var(--color-primary)" d="M180 118 C184 80 198 52 212 36 C178 40 150 64 136 106 Z" />
            <rect x="34" y="104" width="152" height="30" rx="8" fill="var(--color-gold)" />
            <circle cx="10" cy="34" r="11" fill="var(--color-gold)" />
            <circle cx="110" cy="10" r="11" fill="var(--color-gold)" />
            <circle cx="210" cy="34" r="11" fill="var(--color-gold)" />
          </g>
        </svg>
        <span class="jc-name">Joker</span>
      </div>
    </div>
  </div>
</template>

<style>
.jc {
  --blk-drop: var(--color-gold);
  position: relative;
  width: min(21rem, 70vw);
  aspect-ratio: 5 / 7;
  border-width: 4px;
  border-radius: 1.4rem;
  box-shadow: 12px 12px 0 var(--blk-drop);
}
.pal-club .jc,
.pal-diamond .jc { --blk-drop: var(--color-ink); }

.jc-index {
  position: absolute;
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-family: var(--font-serif);
  font-size: 0.875rem;
  line-height: 1;
  letter-spacing: -0.1em;
  color: var(--color-primary);
}
.jc-index--tl { top: 0.6rem; left: 0.55rem; }
.jc-index--br { bottom: 0.6rem; right: 0.55rem; rotate: 180deg; }

.jc-face {
  position: absolute;
  inset: 9%;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 3px solid var(--color-ink);
  border-radius: 0.6rem;
}
.jc-face > .harlequin {
  position: absolute;
  inset: 0;
}
.jc-medal {
  position: relative;
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 0.1rem;
  width: 70%;
  aspect-ratio: 1;
  border: 4px solid var(--color-ink);
  border-radius: 50%;
  background: var(--color-paper);
}
.jc-hat {
  width: 58%;
}
.jc-name {
  font-family: var(--font-kings);
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1;
  color: var(--color-ink);
}
</style>
