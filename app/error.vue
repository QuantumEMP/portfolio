<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const missing = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => missing.value ? 'Page not found | Joker' : 'Something went wrong | Joker',
  robots: 'noindex',
})

const backToTop = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout name="main">
    <section class="er blk blk-base">
      <div class="wrap er-inner">
        <p class="er-code">{{ error.statusCode }}</p>
        <h1 class="sec-title">{{ missing ? 'No such act' : 'The act fell through' }}</h1>
        <p class="sec-sub">
          {{ missing ? "That page isn't on the bill tonight." : 'Something went wrong backstage. Try again in a moment.' }}
        </p>
        <button type="button" class="btn btn-gold" @click="backToTop">Back to the big top</button>
      </div>
    </section>
  </NuxtLayout>
</template>

<style>
.er {
  min-height: 100svh;
  display: flex;
  align-items: center;
  border-top: 0;
  padding-block: 12rem 9rem;
}
.er-inner {
  display: grid;
  gap: 1.25rem;
  justify-items: start;
}
.er-code {
  font-family: var(--font-kings);
  font-size: clamp(5rem, 14vw, 10rem);
  line-height: 1;
  color: var(--color-primary);
}
</style>
