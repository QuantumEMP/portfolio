<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { skillSuits } from '~/data/skills'

const tabs = skillSuits.map(s => ({
  label: s.category,
  suit: s.suit,
  skills: s.skills,
})) satisfies TabsItem[]

const isExternal = (url: string) => url.startsWith('http')
const prettyUrl = (url: string) =>
  url === '/' ? 'This site' : url.replace(/^https?:\/\//, '')
</script>

<template>
  <section id="skills" class="sk">
    <UContainer>
      <SectionHeading
        eyebrow="Skills"
        suit="♥"
        title="A Jack of all trades is a master of none."
        subtitle="But a Joker is here to get things done."
      />

      <p class="sk-intro">Shuffle through my deck, what you're looking for will find you.</p>

      <UTabs :items="tabs" variant="link" class="w-full" :ui="{ list: 'overflow-x-auto' }">
        <template #leading="{ item }">
          <span :class="suitClass(item.suit)">{{ item.suit }}</span>
        </template>

        <template #content="{ item }">
          <ul class="sk-grid">
            <li v-for="skill in item.skills" :key="skill.name" class="sk-card">
              <span class="sk-pip" :class="suitClass(item.suit)">{{ item.suit }}</span>
              <span class="sk-name">{{ skill.name }}</span>

              <ULink
                v-if="skill.example"
                :to="skill.example"
                :target="isExternal(skill.example) ? '_blank' : undefined"
                class="sk-example"
              >
                {{ prettyUrl(skill.example) }}
                <UIcon name="i-lucide-arrow-up-right" class="size-3" />
              </ULink>

              <ul v-if="skill.children" class="sk-children">
                <li v-for="child in skill.children" :key="child.name">
                  <UBadge :label="child.name" color="neutral" variant="subtle" size="sm" />
                </li>
              </ul>
            </li>
          </ul>
        </template>
      </UTabs>
    </UContainer>
  </section>
</template>

<style>
.sk {
  padding: 6rem 0;
}
.sk-intro {
  margin: -1.5rem 0 2rem;
  color: var(--ui-text-muted);
}
.sk-grid {
  display: grid;
  gap: 1rem;
  padding-top: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
}
.sk-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 8rem;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-card);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.sk-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-accent-deep);
}
.sk-pip {
  font-size: 1rem;
  line-height: 1;
}
.sk-name {
  font-weight: 600;
  color: var(--color-text);
}
.sk-example {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: auto;
  font-size: 0.75rem;
  color: var(--color-accent);
  word-break: break-all;
}
.sk-example:hover {
  color: var(--color-accent-soft);
}
.sk-children {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}
</style>
