<script setup lang="ts">
import { contact } from '~/data/contact'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="ft">
    <UContainer class="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
      <p class="ft-line">"You see, I hold the winning card!"</p>
      <div class="flex items-center gap-2">
        <UButton
          v-for="social in contact.socials"
          :key="social.label"
          :to="social.to"
          :icon="social.icon"
          :aria-label="social.label"
          target="_blank"
          color="neutral"
          variant="ghost"
        />
      </div>
      <p class="text-sm text-muted">© {{ year }} Jude Rose</p>
    </UContainer>
  </footer>
</template>

<style>
.ft {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}
.ft-line {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--color-accent-soft);
}
</style>
