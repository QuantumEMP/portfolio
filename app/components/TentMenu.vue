<script setup lang="ts">
import { tents } from '~/data/tents'

// Hovering the valance lowers a board of signs, one per sister site.
// Touch and keyboard use the pull tab (a real button) instead.
const open = ref(false)
const tab = ref<HTMLButtonElement | null>(null)

// A short grace period so the board doesn't snap shut when the
// pointer cuts a corner between the valance and the signs
let closeTimer: ReturnType<typeof setTimeout> | undefined
const show = () => {
  clearTimeout(closeTimer)
  open.value = true
}
const hide = (delay = 0) => {
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => { open.value = false }, delay)
}

const onPointerEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse') show() }
const onPointerLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') hide(250) }

const onKey = (e: KeyboardEvent) => {
  if (e.key !== 'Escape' || !open.value) return
  hide()
  tab.value?.focus()
}

// Tabbing out of the board closes it
const onFocusOut = (e: FocusEvent) => {
  const root = e.currentTarget as HTMLElement
  if (!root.contains(e.relatedTarget as Node | null)) hide()
}

onBeforeUnmount(() => clearTimeout(closeTimer))
</script>

<template>
  <nav
    class="tents"
    :class="{ 'tents--open': open }"
    aria-label="Other tents on the lot"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @keydown="onKey"
    @focusout="onFocusOut"
  >
    <button
      ref="tab"
      type="button"
      class="tents-tab"
      :aria-expanded="open"
      aria-controls="tents-board"
      @click="open ? hide() : show()"
    >
      <span class="sr-only">Other tents on the lot</span>
      <svg class="tents-arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 9l7 7 7-7" />
      </svg>
    </button>

    <div v-show="open" id="tents-board" class="tents-board">
      <p class="tents-title">Other tents on the lot</p>
      <ul class="tents-list">
        <li v-for="tent in tents" :key="tent.host">
          <span v-if="tent.soon" class="tents-sign tents-sign--soon">
            <span class="tents-name">{{ tent.name }}</span>
            <span class="tents-host">{{ tent.host }}</span>
            <span class="tents-blurb">{{ tent.blurb }}</span>
            <span class="tents-soon">Opening soon</span>
          </span>
          <a v-else :href="`https://${tent.host}`" class="tents-sign">
            <span class="tents-name">{{ tent.name }}</span>
            <span class="tents-host">{{ tent.host }}</span>
            <span class="tents-blurb">{{ tent.blurb }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
/* Covers the valance strip, so hovering anywhere along it lowers the board */
.tents {
  position: absolute;
  z-index: 30;
  inset: 0 0 auto;
  height: calc(var(--scallop) * 0.55 + var(--scallop) / 2 + 3px);
  display: flex;
  justify-content: center;
}

/* Pull tab pinned to the middle of the valance band */
.tents-tab {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-top: calc(var(--scallop) * 0.55 - 1.375rem);
  border: 3px solid var(--color-ink);
  border-radius: 999px;
  background: var(--color-gold);
  color: var(--color-ink);
  box-shadow: 3px 3px 0 var(--color-ink);
  cursor: pointer;
  transition: transform 0.15s ease;
}
@media (min-width: 1024px) {
  .tents-tab { width: 3.25rem; height: 3.25rem; margin-top: calc(var(--scallop) * 0.55 - 1.625rem); }
}
.tents-arrow {
  width: 60%;
  height: 60%;
  fill: none;
  stroke: currentColor;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: rotate 0.2s ease;
}
.tents--open .tents-arrow { rotate: 180deg; }
.tents-tab:hover { transform: translateY(2px); }

/* The board hangs from the valance on two ropes */
.tents-board {
  position: absolute;
  top: calc(100% + 1.25rem);
  left: 50%;
  translate: -50% 0;
  width: min(24rem, calc(100vw - 2 * var(--curtain-w) - 2rem));
  padding: 1.25rem;
  border: 3px solid var(--color-ink);
  border-radius: 0.75rem;
  background: var(--color-primary);
  color: var(--color-paper);
  box-shadow: 7px 7px 0 var(--color-ink);
  transform-origin: 50% -1.25rem;
  animation: tents-drop 0.45s cubic-bezier(0.3, 1.5, 0.6, 1);
}
/* Ropes, plus a bridge so the pointer can cross the gap without leaving */
.tents-board::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  height: calc(1.25rem + 3px);
  background:
    linear-gradient(var(--color-ink), var(--color-ink)) 20% 0 / 3px 100% no-repeat,
    linear-gradient(var(--color-ink), var(--color-ink)) 80% 0 / 3px 100% no-repeat;
}
@keyframes tents-drop {
  from { transform: translateY(-1.5rem) rotate(-3deg); opacity: 0; }
  60%  { transform: translateY(0) rotate(1.5deg); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .tents-board { animation: none; }
  .tents-arrow { transition: none; }
}

.tents-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  line-height: 1.2;
  text-align: center;
  text-wrap: balance;
}
.tents-list {
  margin-top: 1rem;
  display: grid;
  gap: 0.9rem;
}

/* Each sister site is a paper sign, tilted by hand */
.tents-sign {
  display: grid;
  padding: 0.8rem 1rem;
  border: 3px solid var(--color-ink);
  border-radius: 6px;
  background: var(--color-paper);
  color: var(--color-ink);
  box-shadow: 4px 4px 0 var(--color-ink);
  rotate: -1.5deg;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.tents-list li:nth-child(even) .tents-sign { rotate: 1.5deg; }
a.tents-sign:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--color-ink);
}
.tents-name {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  line-height: 1.2;
}
.tents-host {
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--color-primary);
}
.tents-blurb {
  margin-top: 0.25rem;
  font-size: 1.0625rem;
  line-height: 1.5;
}
.tents-sign--soon { position: relative; }
.tents-sign--soon .tents-host { color: var(--color-ink); }
.tents-soon {
  position: absolute;
  top: -0.9rem;
  right: -0.5rem;
  rotate: 6deg;
  padding: 0.1rem 0.6rem;
  border: 3px solid var(--color-ink);
  border-radius: 6px;
  background: var(--color-gold);
  font-weight: 700;
  font-size: 0.875rem;
}
</style>
