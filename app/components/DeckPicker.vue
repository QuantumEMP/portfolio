<script setup lang="ts">
const palette = usePalette()
</script>

<template>
  <div class="dp" role="radiogroup" aria-label="Pick your deck">
    <span class="dp-label" aria-hidden="true">Pick your deck</span>
    <button
      v-for="p in palettes"
      :key="p.value"
      type="button"
      role="radio"
      class="dp-token"
      :aria-checked="palette === p.value"
      :aria-label="`${p.label} deck, ${p.mode}`"
      :title="`${p.label} deck (${p.mode})`"
      @click="palette = p.value"
    >
      <SuitIcon :suit="p.suit" :class="suitClass(p.suit)" />
    </button>
  </div>
</template>

<style>
.dp {
  display: flex;
  align-items: center;
  gap: 0.6rem;
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
  border: 3px solid var(--color-ink);
  border-radius: 50%;
  background: var(--color-paper);
  font-size: 1.25rem;
  cursor: pointer;
}
.dp-token[aria-checked="true"] {
  background: var(--color-gold);
  box-shadow: 4px 4px 0 var(--color-drop);
}
</style>
