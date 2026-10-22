<script setup lang="ts">
const { open, askIfUnanswered, choose } = useConsent()

onMounted(askIfUnanswered)
</script>

<template>
  <div v-if="open" class="cb" role="region" aria-label="Cookie choice">
    <p>
      May we use Google Analytics cookies to count visits? Nothing is shared for ads.
      Without them we only get anonymous, cookie-free pings.
    </p>
    <div class="cb-actions">
      <button type="button" class="btn btn-gold" @click="choose('granted')">Allow</button>
      <button type="button" class="btn" @click="choose('denied')">No thanks</button>
    </div>
  </div>
</template>

<style>
.cb {
  position: fixed;
  z-index: 60;
  left: 1rem;
  bottom: 7.5rem; /* above the peeking hand of cards */
  display: grid;
  gap: 0.9rem;
  width: min(26rem, calc(100vw - 2rem));
  padding: 1.1rem 1.25rem;
  border: 3px solid var(--color-ink);
  border-radius: 0.75rem;
  background: var(--color-paper);
  color: var(--color-ink);
  box-shadow: 6px 6px 0 var(--color-ink);
  font-size: 0.9375rem;
  line-height: 1.5;
}
@media (min-width: 768px) {
  .cb { bottom: 1rem; }
}
.cb-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
</style>
