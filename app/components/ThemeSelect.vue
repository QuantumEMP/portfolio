<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const palette = usePalette()

const current = computed(() => palettes.find(p => p.value === palette.value) ?? palettes[2])

const items = computed<DropdownMenuItem[]>(() => palettes.map(p => ({
  label: p.label,
  suit: p.suit,
  type: 'checkbox' as const,
  checked: palette.value === p.value,
  onSelect: () => { palette.value = p.value },
})))
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }" :ui="{ content: 'min-w-36' }">
    <UButton
      color="neutral"
      variant="ghost"
      size="sm"
      trailing-icon="i-lucide-chevron-down"
      :aria-label="`Theme: ${current.label}`"
    >
      <span :class="suitClass(current.suit)" class="text-base leading-none">{{ current.suit }}</span>
      <span class="hidden md:inline">{{ current.label }}</span>
    </UButton>

    <template #item-leading="{ item }">
      <span :class="suitClass(item.suit)" class="text-base leading-none">{{ item.suit }}</span>
    </template>
  </UDropdownMenu>
</template>
