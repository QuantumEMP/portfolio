<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

type JokerNavItem = NavigationMenuItem & { suit?: string }

// A small helper so the template stays clean
const redSuits = ['♥', '♦']
const suitClass = (suit?: string) =>
  redSuits.includes(suit ?? '')
    ? 'text-[color:var(--color-night-bordeaux-500)]'
    : 'text-[color:var(--color-baltic-blue-500)]'

const items = computed<JokerNavItem[]>(() => [
  {
    label: 'Home',
    suit: '♥',
    slot: 'home' as const,
    active: route.path === '/',
    children: [
      {
        label: 'About',
        description: 'Who is Joker?',
        suit: '♣',
        to: '/#about',
      },
      {
        label: 'The System',
        description: 'Meet the six alters',
        suit: '♦',
        to: '/#system',
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
    to: '/blog',
    active: route.path.startsWith('/blog'),
  },
  {
    label: 'Contact Us',
    suit: '♦',
    to: '/#contact',
  },
  {
    label: 'Login',
    suit: '♠',
    to: '/login',
  },
])
</script>

<template>
  <UNavigationMenu :items="items">

    <!-- Suit symbol for every top-level item -->
    <template #item-leading="{ item }">
      <span class="text-base leading-none" :class="suitClass(item.suit)">
        {{ item.suit }}
      </span>
    </template>

    <!-- Custom dropdown for the Home item -->
    <template #home-content="{ item }">
      <ul class="grid gap-1 p-2 w-56">
        <li v-for="child in item.children" :key="child.label">
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