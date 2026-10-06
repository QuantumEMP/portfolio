<script setup lang="ts">
import { contact } from '~/data/contact'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="ft">
    <div class="ft-bunting" aria-hidden="true" />
    <div class="wrap ft-row">
      <p class="ft-line">"You see, I hold the winning card!"</p>
      <div class="ft-socials">
        <a
          v-for="social in contact.socials"
          :key="social.label"
          :href="social.to"
          target="_blank"
          rel="noopener"
          :aria-label="social.label"
          class="ft-social"
        >
          <UIcon :name="social.icon" class="size-5" />
        </a>
      </div>
      <p class="ft-copy">© {{ year }} Jude Rose</p>
    </div>
  </footer>
</template>

<style>
.ft {
  border-top: 4px solid var(--color-ink);
  background: var(--color-base);
  color: var(--color-on-base);
  /* room for the fixed hand of cards */
  padding-bottom: 7rem;
}
@media (min-width: 768px) {
  .ft { padding-bottom: 3rem; }
}

/* A string of pennants: suit, gold, paper */
.ft-bunting {
  height: 3.25rem;
  border-top: 3px solid var(--color-on-base);
  background:
    conic-gradient(from 340deg at 50% 100%, var(--color-primary) 0 40deg, transparent 0) 0 0 / 7.5rem 100% repeat-x,
    conic-gradient(from 340deg at 50% 100%, var(--color-gold) 0 40deg, transparent 0) 2.5rem 0 / 7.5rem 100% repeat-x,
    conic-gradient(from 340deg at 50% 100%, var(--color-paper) 0 40deg, transparent 0) 5rem 0 / 7.5rem 100% repeat-x;
}

.ft-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  padding-top: 2rem;
}
.ft-line {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.375rem;
}
.ft-socials { display: flex; gap: 0.75rem; }
.ft-social {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 3px solid var(--color-ink);
  border-radius: 50%;
  background: var(--color-paper);
  color: var(--color-ink);
}
.ft-copy { font-size: 0.875rem; }
</style>
