<script setup lang="ts">
import type { Suit } from '~~/types/alters'

const cards: { suit: Suit | '★', label: string, to: string }[] = [
  { suit: '♦', label: 'About', to: '/#about' },
  // Hidden until the alters copy is finished; restore with <Alter /> in pages/index.vue
  // { suit: '♥', label: 'Troupe', to: '/#system' },
  { suit: '♣', label: 'Juggler', to: '/#skills' },
  { suit: '♠', label: 'Sideshow', to: '/#work' },
  { suit: '★', label: 'Tickets', to: '/#contact' },
]

const inkClass = (suit: Suit | '★') => suit === '★' ? 'suit-star' : suitClass(suit)

// Mobile: the peeking hand opens a full-screen "pick a card" menu
const open = ref(false)
const foldBtn = ref<HTMLButtonElement | null>(null)
const handBtn = ref<HTMLButtonElement | null>(null)

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }

watch(open, async (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  await nextTick()
  if (isOpen) {
    foldBtn.value?.focus()
    window.addEventListener('keydown', onKey)
  }
  else {
    handBtn.value?.focus()
    window.removeEventListener('keydown', onKey)
  }
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <nav class="fan" aria-label="Sections" :style="{ '--n': cards.length }">
    <!-- Desktop: every card is a link -->
    <ul class="fan-hand fan-hand--desktop">
      <li v-for="(card, i) in cards" :key="card.label" :style="{ '--i': i }">
        <NuxtLink :to="card.to" class="fan-card" :class="{ 'fan-card--joker': card.suit === '★' }">
          <SuitIcon :suit="card.suit" class="fan-suit" :class="inkClass(card.suit)" />
          <span class="fan-label">{{ card.label }}</span>
        </NuxtLink>
      </li>
    </ul>

    <!-- Mobile: the hand is one button -->
    <button
      ref="handBtn"
      type="button"
      class="fan-hand fan-hand--mobile"
      :aria-expanded="open"
      aria-controls="fan-menu"
      @click="open = true"
    >
      <span class="sr-only">Open the section menu</span>
      <span
        v-for="(card, i) in cards"
        :key="card.label"
        class="fan-card"
        :class="{ 'fan-card--joker': card.suit === '★' }"
        :style="{ '--i': i }"
        aria-hidden="true"
      >
        <SuitIcon :suit="card.suit" class="fan-suit" :class="inkClass(card.suit)" />
        <span class="fan-label">{{ card.label }}</span>
      </span>
    </button>

    <div v-if="open" id="fan-menu" class="fan-menu blk-primary" role="dialog" aria-modal="true" aria-label="Sections">
      <div class="fan-menu-band"><HarlequinPattern :size="40" /></div>
      <div class="fan-menu-head">
        <p class="fan-menu-title">Pick a card</p>
        <button ref="foldBtn" type="button" class="btn" @click="open = false">Fold</button>
      </div>
      <p class="fan-menu-sub">Each card takes you to an act.</p>
      <ul class="fan-menu-cards">
        <li v-for="card in cards" :key="card.label">
          <NuxtLink
            :to="card.to"
            class="fan-card fan-card--big"
            :class="{ 'fan-card--joker': card.suit === '★' }"
            @click="open = false"
          >
            <SuitIcon :suit="card.suit" class="fan-suit" :class="inkClass(card.suit)" />
            <span class="fan-label">{{ card.label }}</span>
            <SuitIcon :suit="card.suit" class="fan-pip" :class="inkClass(card.suit)" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
.fan {
  position: fixed;
  z-index: 50;
  inset: auto 0 0 auto;
  pointer-events: none;
}
.fan-hand,
.fan-menu {
  pointer-events: auto;
}

/* ── A playing card in the hand ── */
.fan-card {
  position: absolute;
  left: 50%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: var(--card-w);
  height: calc(var(--card-w) * 1.4);
  margin-left: calc(var(--card-w) / -2);
  padding: 0.55rem;
  border: 3px solid var(--color-ink);
  border-radius: 0.7rem;
  background: var(--color-paper);
  color: var(--color-ink);
  text-align: left;
  box-shadow: 4px 4px 0 var(--color-drop);
  transform-origin: 50% calc(100% + var(--fan-r));
  /* centred on the middle card, however many are in the hand */
  rotate: calc((var(--i) - (var(--n) - 1) / 2) * var(--fan-step));
  transition: translate 0.2s ease;
}
.fan-card--joker {
  background: var(--color-gold);
}
.suit-star { color: var(--color-primary); }
.fan-suit {
  font-size: 1.25rem;
}
.fan-label {
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.1;
}

/* ── Desktop hand: bottom right, cards lift on hover/focus ── */
.fan-hand--desktop {
  --card-w: 7rem;
  --fan-r: 14rem;
  --fan-step: 12deg;
  position: fixed;
  right: 3rem;
  bottom: -5.5rem;
  width: 24rem;
  height: 10rem;
}
.fan-hand--desktop li { display: contents; }
/* Peeks low while you read; the whole hand rises when you reach for it */
.fan-hand--desktop:hover .fan-card,
.fan-hand--desktop:focus-within .fan-card {
  translate: 0 -2.25rem;
}
.fan-hand--desktop .fan-card:hover,
.fan-hand--desktop .fan-card:focus-visible {
  translate: 0 -4.5rem;
  z-index: 1;
}

/* ── Mobile hand: one button, smaller cards ── */
.fan-hand--mobile {
  --card-w: 4.6rem;
  --fan-r: 10rem;
  --fan-step: 12deg;
  display: none;
  position: fixed;
  left: 50%;
  bottom: -2.5rem;
  width: 18rem;
  height: 6.5rem;
  margin-left: -9rem;
  cursor: pointer;
}
.fan-hand--mobile .fan-label { font-size: 0.75rem; }
.fan-hand--mobile .fan-suit { font-size: 1rem; }

@media (max-width: 767px) {
  .fan-hand--desktop { display: none; }
  .fan-hand--mobile { display: block; }
}

/* ── Mobile menu: the hand laid out on the table ── */
.fan-menu {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  padding-bottom: 2rem;
  background: var(--blk-bg);
  color: var(--blk-fg);
}
.fan-menu-band {
  height: 8rem;
  border-bottom: 4px solid var(--color-ink);
}
.fan-menu-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 1.5rem 0;
}
.fan-menu-title {
  font-family: var(--font-kings);
  font-size: 3.5rem;
  line-height: 1;
}
.fan-menu-sub {
  padding: 0.5rem 1.5rem 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.25rem;
}
.fan-menu-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 1.25rem;
  padding: 2rem 1.5rem;
}
.fan-menu-cards li:nth-child(odd) { rotate: -3deg; }
.fan-menu-cards li:nth-child(even) { rotate: 3deg; }
.fan-card--big {
  --card-w: 100%;
  --fan-r: 0px;
  position: relative;
  left: auto;
  margin: 0;
  height: auto;
  aspect-ratio: 5 / 6;
  rotate: none;
  box-shadow: 5px 5px 0 var(--color-ink);
}
.fan-card--big .fan-label { font-size: 1.0625rem; }
.fan-card--big .fan-suit { font-size: 1.5rem; }
.fan-pip {
  margin: auto auto 0.25rem;
  font-size: 3rem;
}

@media (prefers-reduced-motion: reduce) {
  .fan-card { transition: none; }
}
</style>
