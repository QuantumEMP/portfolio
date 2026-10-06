<template>
  <div class="min-h-screen flex flex-col">
    <!-- No nav bar: the marquee and deck picker sit on the big top,
         and the hand of cards (CardFanNav) does the navigating -->
    <header class="topbar wrap">
      <NuxtLink to="/#home" class="marquee" aria-label="Joker, back to the top">
        <span class="marquee-bulbs" aria-hidden="true" />
        <span class="marquee-name">Joker</span>
      </NuxtLink>
      <DeckPicker />
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
    <CardFanNav />
  </div>
</template>

<script lang="ts" setup>
const palette = usePalette()

const themeColor = computed(() => palettes.find(p => p.value === palette.value)?.themeColor)

useHead({
  htmlAttrs: { class: () => `pal-${palette.value}` },
  meta: [{ name: 'theme-color', content: themeColor }],
})
</script>

<style>
.topbar {
  position: absolute;
  z-index: 20;
  top: 3.25rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
@media (min-width: 1024px) {
  .topbar { top: 6.5rem; }
}

/* The logo is a lit marquee sign (same build as the tools site's) */
.marquee {
  position: relative;
  display: grid;
  place-items: center;
  width: 136px;
  height: 60px;
  border: var(--stroke-feature) solid var(--color-ink);
  border-radius: var(--radius-ticket);
  background: var(--color-primary);
  color: var(--color-paper);
  box-shadow: 6px 6px 0 var(--color-gold);
}
.pal-club .marquee,
.pal-diamond .marquee { box-shadow: 6px 6px 0 var(--color-ink); }
@media (min-width: 1024px) {
  .marquee { width: 248px; height: 104px; border-radius: var(--radius-joker); }
}
.marquee-bulbs {
  position: absolute;
  inset: 6px 10px;
  /* two rows of gold bulbs, top and bottom */
  background:
    radial-gradient(circle, var(--color-gold) 0 3px, transparent 3.5px) top left / 14px 7px repeat-x,
    radial-gradient(circle, var(--color-gold) 0 3px, transparent 3.5px) bottom left / 14px 7px repeat-x;
}
@media (min-width: 1024px) {
  .marquee-bulbs {
    inset: 10px 19px;
    background:
      radial-gradient(circle, var(--color-gold) 0 5px, transparent 5.5px) top left / 25.6px 12px repeat-x,
      radial-gradient(circle, var(--color-gold) 0 5px, transparent 5.5px) bottom left / 25.6px 12px repeat-x;
  }
}
.marquee-name {
  position: relative;
  font-family: var(--font-kings);
  font-size: 32px;
  line-height: 1;
}
@media (min-width: 1024px) {
  .marquee-name { font-size: 58px; }
}
</style>
