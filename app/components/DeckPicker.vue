<script setup lang="ts">
const palette = usePalette()
const tokens = ref<HTMLButtonElement[]>([])

// Radiogroup keyboard pattern: arrows move and pick, focus follows
const onKeydown = (e: KeyboardEvent, index: number) => {
  const step = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0
  if (!step) return
  e.preventDefault()
  const next = (index + step + palettes.length) % palettes.length
  palette.value = palettes[next]!.value
  tokens.value[next]?.focus()
}
</script>

<template>
  <div class="dp" role="radiogroup" aria-label="Pick your deck">
    <span class="dp-label" aria-hidden="true">Pick your deck</span>
    <button
      v-for="(p, i) in palettes"
      :key="p.value"
      ref="tokens"
      type="button"
      role="radio"
      class="dp-token"
      :aria-checked="palette === p.value"
      :aria-label="`${p.label} deck, ${p.mode}`"
      :title="`${p.label} deck (${p.mode})`"
      :tabindex="palette === p.value ? 0 : -1"
      @click="palette = p.value"
      @keydown="onKeydown($event, i)"
    >
      <SuitIcon :suit="p.suit" :class="suitClass(p.suit)" />
    </button>
  </div>
</template>

<style>
.dp {
  display: flex;
  align-items: center;
  gap: var(--space-chip);
}
.dp-label {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.125rem;
  margin-right: 0.25rem;
}
@media (max-width: 639px) {
  .dp-label { display: none; }
}
.dp-token {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: var(--stroke-object) solid var(--color-ink);
  border-radius: var(--radius-pill);
  background: var(--color-paper);
  font-size: 1.25rem;
  cursor: pointer;
}
.dp-token[aria-checked="true"] {
  background: var(--color-gold);
  box-shadow: 4px 4px 0 var(--color-drop);
}
</style>
