<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal',
})

type JokerNavItem = NavigationMenuItem & { suit?: string }

const items: JokerNavItem[] = [
  {
    label: 'Home',
    suit: '♥',
    slot: 'home' as const,
    to: '/#home',
    active: false,
    children: [
      {
        label: 'About',
        description: 'Who is Joker?',
        suit: '♣',
        to: '/#about',
      },
      {
        label: 'The System',
        description: 'Meet the alters',
        suit: '♦',
        to: '/#system',
      },
      {
        label: 'Skills',
        description: 'Shuffle through the deck',
        suit: '♥',
        to: '/#skills',
      },
      {
        label: 'Work & Projects',
        description: 'Selected work',
        suit: '♠',
        to: '/#work',
      },
    ],
  },
  {
    label: 'Blog',
    suit: '♣',
    to: 'https://jude-rose.com/blogs',
    target: '_blank',
  },
  {
    label: 'Contact Us',
    suit: '♦',
    to: '/#contact',
    active: false,
  },
]
</script>

<template>
  <UNavigationMenu :items="items" :orientation="orientation">

    <!-- Suit symbol for every top-level item -->
    <template #item-leading="{ item }">
      <span class="text-base leading-none" :class="suitClass(item.suit)">
        {{ item.suit }}
      </span>
    </template>

    <!-- Custom dropdown for the Home item -->
    <template #home-content="{ item }">
      <ul class="grid gap-1 p-2 w-60">
        <li v-for="child in (item as JokerNavItem).children" :key="child.label">
          <ULink
            :to="child.to"
            class="flex items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-elevated/50"
          >
            <span class="mt-0.5 text-base leading-none shrink-0" :class="suitClass(child.suit)">
              {{ child.suit }}
            </span>
            <span class="flex flex-col min-w-0">
              <span class="font-medium text-highlighted truncate">{{ child.label }}</span>
              <span v-if="child.description" class="text-xs text-muted mt-0.5">
                {{ child.description }}
              </span>
            </span>
          </ULink>
        </li>
      </ul>
    </template>

  </UNavigationMenu>
</template>
