<script setup lang="ts">
import { alters } from '~/data/alters'

const picked = ref(0)
const alter = computed(() => alters[picked.value]!)
const next = computed(() => alters[(picked.value + 1) % alters.length]!)
</script>

<template>
  <section id="system" class="tr blk blk-primary">
    <div class="wrap">
      <h2 class="sec-title">The troupe</h2>
      <p class="sec-sub">Six alters, one body. Pick a card to meet them.</p>

      <div class="tr-grid">
        <div class="tr-table">
          <ul class="tr-hand">
            <li v-for="(a, i) in alters" :key="a.name" :style="{ '--i': i }">
              <button
                type="button"
                class="tr-card"
                :class="{ 'tr-card--back': a.hidden }"
                :aria-pressed="picked === i"
                aria-controls="troupe-spotlight"
                @click="picked = i"
              >
                <template v-if="a.hidden">
                  <span class="tr-back"><HarlequinPattern :size="26" /></span>
                  <span class="sr-only">A face-down card</span>
                </template>
                <template v-else>
                  <span class="tr-index" :class="suitClass(a.suit)" aria-hidden="true">
                    {{ a.name[0] }}
                    <SuitIcon :suit="a.suit" />
                  </span>
                  <SuitIcon :suit="a.suit" class="tr-pip" :class="suitClass(a.suit)" />
                  <span class="tr-name">{{ a.name.split(' ')[0] }}</span>
                </template>
              </button>
            </li>
          </ul>
        </div>

        <article id="troupe-spotlight" class="tr-spot stock" aria-live="polite">
          <h3 class="tr-spot-name">
            <SuitIcon :suit="alter.suit" :class="suitClass(alter.suit)" />
            {{ alter.name }}
          </h3>
          <p class="tr-role">{{ alter.role }}</p>
          <p v-for="(line, i) in alter.description" :key="i">{{ line }}</p>
          <button type="button" class="tr-next" @click="picked = (picked + 1) % alters.length">
            Next card: {{ next.hidden ? 'face down' : next.name.split(' ')[0] }}
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<style>
.tr-grid {
  display: grid;
  gap: 2.5rem;
  margin-top: 3rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .tr-grid { grid-template-columns: 1.6fr 1fr; gap: 2.5rem; margin-top: 3.5rem; }
}

/* ── The card table (desktop: the hand fanned over the felt) ── */
.tr-table {
  position: relative;
}
.tr-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: var(--card-w);
  aspect-ratio: 5 / 7;
  padding: 0.6rem;
  border: 3px solid var(--color-ink);
  border-radius: 0.75rem;
  background: var(--color-paper);
  color: var(--color-ink);
  box-shadow: 5px 5px 0 var(--color-ink);
  cursor: pointer;
  transition: translate 0.2s ease;
}
.tr-card[aria-pressed="true"] {
  border-color: var(--color-gold);
  border-width: 5px;
}
.tr-index {
  display: grid;
  justify-items: center;
  justify-self: start;
  align-self: flex-start;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  line-height: 1;
}
.tr-index .suit-icon { font-size: 0.9rem; margin-top: 0.2rem; }
.tr-pip {
  margin: auto;
  font-size: 3.25rem;
}
.tr-name {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  text-align: center;
}
.tr-back {
  position: absolute;
  inset: 0.5rem;
  overflow: hidden;
  border-radius: 0.4rem;
}

@media (min-width: 1024px) {
  .tr-table {
    height: 30rem;
  }
  .tr-table::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 18rem;
    border: 6px solid var(--color-gold);
    border-radius: 50%;
    background: var(--color-ink);
  }
  .tr-hand {
    --card-w: 8.25rem;
    position: absolute;
    inset: 0;
  }
  .tr-hand li {
    position: absolute;
    left: 50%;
    top: 9.5rem;
    margin-left: calc(var(--card-w) / -2);
    transform-origin: 50% calc(100% + 16rem);
    rotate: calc((var(--i) - 2.5) * 10deg);
  }
  .tr-card[aria-pressed="true"],
  .tr-card:hover {
    translate: 0 -2.5rem;
  }
}

/* Mobile: the hand becomes a row you swipe */
@media (max-width: 1023px) {
  .tr-hand {
    --card-w: 7.5rem;
    display: flex;
    gap: 0.25rem;
    margin-inline: -1.5rem;
    padding: 2.5rem 1.5rem 1.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
  .tr-hand li {
    flex: none;
    scroll-snap-align: start;
    rotate: calc(-4deg + mod(var(--i), 2) * 8deg);
  }
  .tr-card[aria-pressed="true"] { translate: 0 -1.5rem; }
}

/* ── Spotlight ── */
.tr-spot {
  display: grid;
  gap: 0.9rem;
  padding: 2rem;
  border-width: 4px;
  border-radius: 1.25rem;
  box-shadow: 10px 10px 0 var(--color-ink);
}
.tr-spot-name {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 2.25rem;
  line-height: 1.1;
}
.tr-spot-name .suit-icon { font-size: 1.5rem; }
.tr-role {
  justify-self: start;
  padding: 0.3rem 0.8rem;
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  background: var(--color-gold);
  font-weight: 700;
  font-size: 0.875rem;
}
.tr-next {
  justify-self: start;
  margin-top: 0.25rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  cursor: pointer;
}

@media (prefers-reduced-motion: reduce) {
  .tr-card { transition: none; }
}
</style>
