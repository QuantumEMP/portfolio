<template>
  <div class="min-h-screen flex flex-col">
    <UHeader to="/#home" mode="slideover">
      <template #title>
        <span class="font-comic text-2xl font-bold">
          Joker<span class="suit-red">♦</span>
        </span>
      </template>

      <NavBar />

      <template #right>
        <ThemeSelect />
        <UButton
          to="/#contact"
          label="Deal me in"
          size="sm"
          class="hidden sm:inline-flex rounded-full"
        />
      </template>

      <template #body>
        <NavBar orientation="vertical" />
      </template>
    </UHeader>

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
import NavBar from '~/components/navBar.vue';
import SiteFooter from '~/components/SiteFooter.vue';
import ThemeSelect from '~/components/ThemeSelect.vue';

const palette = usePalette()

useHead({
  htmlAttrs: { class: () => `pal-${palette.value}` },
})
</script>
