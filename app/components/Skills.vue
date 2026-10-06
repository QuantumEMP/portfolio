<script setup lang="ts">
import type { ISkill } from '~~/types/alters'
import { skillSuits } from '~/data/skills'

const caught = ref(0)
const suit = computed(() => skillSuits[caught.value]!)

// Children (e.g. WordPress → Elementor) sit in the same row of chips
const flat = (skills: ISkill[]): ISkill[] => skills.flatMap(s => [s, ...(s.children ?? [])])
const count = (skills: ISkill[]) => flat(skills).length

// Balls alternate suit, gold and paper
const ballColours = ['primary', 'paper', 'gold'] as const

const isExternal = (url: string) => url.startsWith('http')
</script>

<template>
  <section id="skills" class="jg blk blk-base">
    <div class="wrap">
      <h2 class="sec-title">The juggler</h2>
      <p class="sec-sub">Six suits of skills in the air. Catch one to see what's inside.</p>

      <div class="jg-air">
        <svg class="jg-arc" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M40 380 C240 -60 760 -60 960 380" />
        </svg>
        <ul class="jg-balls">
          <li v-for="(s, i) in skillSuits" :key="s.category" :style="{ '--i': i }">
            <button
              type="button"
              class="jg-ball"
              :class="`jg-ball--${ballColours[i % 3]}`"
              :aria-pressed="caught === i"
              aria-controls="juggler-catch"
              @click="caught = i"
            >
              <SuitIcon :suit="s.suit" class="jg-ball-suit" />
              <span class="jg-ball-name">{{ s.category }}</span>
              <span class="jg-ball-count">{{ count(s.skills) }} skills</span>
            </button>
          </li>
        </ul>
      </div>

      <div id="juggler-catch" class="jg-sheet stock" aria-live="polite">
        <h3 class="jg-sheet-title">
          <SuitIcon :suit="suit.suit" :class="suitClass(suit.suit)" />
          {{ suit.category }}
        </h3>
        <p class="jg-hint">Gold ones link to live work.</p>
        <ul class="jg-chips">
          <li v-for="skill in flat(suit.skills)" :key="skill.name">
            <NuxtLink
              v-if="skill.example"
              :to="skill.example"
              :target="isExternal(skill.example) ? '_blank' : undefined"
              class="jg-chip jg-chip--live"
            >
              {{ skill.name }}
            </NuxtLink>
            <span v-else class="jg-chip">{{ skill.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
.jg-air {
  position: relative;
  margin-block: 3rem;
}
.jg-arc {
  display: none;
}
.jg-ball {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0.2rem;
  width: var(--ball);
  aspect-ratio: 1;
  border: 4px solid var(--color-ink);
  border-radius: 50%;
  box-shadow: 6px 6px 0 var(--color-drop);
  cursor: pointer;
  transition: translate 0.2s ease;
}
.jg-ball--primary { background: var(--color-primary); color: var(--color-paper); }
.jg-ball--paper   { background: var(--color-paper);   color: var(--color-ink); }
.jg-ball--gold    { background: var(--color-gold);    color: var(--color-ink); }
.jg-ball[aria-pressed="true"] {
  border-color: var(--color-gold);
  border-width: 6px;
  box-shadow: 6px 6px 0 var(--color-gold);
}
.jg-ball-suit { font-size: 1.4rem; }
.jg-ball-name {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  line-height: 1.1;
}
.jg-ball-count {
  font-weight: 700;
  font-size: 0.8125rem;
}

/* Mobile: balls zigzag down the screen */
.jg-balls {
  --ball: 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0;
}
.jg-balls li:nth-child(odd) { justify-self: start; }
.jg-balls li:nth-child(even) { justify-self: end; margin-top: 3.5rem; }
.jg-balls li:nth-child(n + 3) { margin-top: -1.5rem; }
.jg-balls li:nth-child(even):nth-child(n + 3) { margin-top: 2rem; }

/* Desktop: balls in the air along one arc */
@media (min-width: 1024px) {
  .jg-air { height: 26rem; }
  .jg-arc {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .jg-arc path {
    fill: none;
    stroke: var(--color-gold);
    stroke-width: 3;
    stroke-dasharray: 2 14;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }
  .jg-balls {
    --ball: 10rem;
    position: absolute;
    inset: 0;
    display: block;
  }
  .jg-balls li,
  .jg-balls li:nth-child(n) {
    position: absolute;
    margin: 0;
    translate: -50% -50%;
  }
  .jg-balls li:nth-child(1) { left: 6%;  top: 80%; }
  .jg-balls li:nth-child(2) { left: 22%; top: 30%; }
  .jg-balls li:nth-child(3) { left: 41%; top: 9%; }
  .jg-balls li:nth-child(4) { left: 59%; top: 9%; }
  .jg-balls li:nth-child(5) { left: 78%; top: 30%; }
  .jg-balls li:nth-child(6) { left: 94%; top: 80%; }
  .jg-ball:hover { translate: 0 -0.75rem; }
}

/* ── What was caught ── */
.jg-sheet {
  --blk-drop: var(--color-drop);
  display: grid;
  gap: 1rem;
  padding: 2rem;
  border-width: 4px;
  border-radius: 1.25rem;
  box-shadow: 10px 10px 0 var(--color-drop);
}
.jg-sheet-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 2.25rem;
  line-height: 1.1;
}
.jg-sheet-title .suit-icon { font-size: 1.5rem; }
.jg-hint { font-size: 0.9375rem; }
.jg-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.jg-chip {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 2.5px solid var(--color-ink);
  border-radius: 999px;
  background: var(--color-paper);
  font-weight: 700;
  font-size: 0.9375rem;
}
.jg-chip--live {
  background: var(--color-gold);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.jg-chip--live:hover { box-shadow: 3px 3px 0 var(--color-ink); }

@media (prefers-reduced-motion: reduce) {
  .jg-ball { transition: none; }
}
</style>
