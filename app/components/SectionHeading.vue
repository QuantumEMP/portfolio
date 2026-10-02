<script setup lang="ts">
defineProps<{
  eyebrow: string
  suit?: string
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <header class="sh">
    <h2 class="sh-eyebrow">
      <span :class="suitClass(suit ?? '♦')">{{ suit ?? '♦' }}</span>
      {{ eyebrow }}
    </h2>
    <p v-if="title" class="sh-title">{{ title }}</p>
    <p v-if="subtitle" class="sh-subtitle">{{ subtitle }}</p>
    <slot />
  </header>
</template>

<style>
.sh {
  margin-bottom: 3rem;
  max-width: 48rem;
}
.sh-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.sh-title {
  margin-top: 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.1;
  color: var(--color-text);
}
.sh-subtitle {
  margin-top: 0.75rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--color-accent-soft);
}
</style>
