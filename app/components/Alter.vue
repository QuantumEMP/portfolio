<script setup lang="ts">
import { alters } from '~/data/alters'
</script>

<template>
  <section id="system" class="alt">
    <UContainer>
      <SectionHeading
        eyebrow="The System"
        suit="♦"
        title="3 heads are better than 1."
        subtitle="But 6 people in 1 head is cheaper."
      />

      <p class="alt-tagline">
        For my whole life, I didn't know if I even really existed.
        But I do, and people are starting to notice.
      </p>

      <ul class="alt-grid">
        <li
          v-for="alter in alters"
          :key="alter.name"
          class="alt-card"
          :class="{ 'alt-card--hidden': alter.hidden }"
        >
          <span class="alt-pip alt-pip--top" :class="suitClass(alter.suit)">{{ alter.suit }}</span>
          <span class="alt-pip alt-pip--bottom" :class="suitClass(alter.suit)">{{ alter.suit }}</span>

          <h3 class="alt-name">{{ alter.name }}</h3>
          <p class="alt-role">{{ alter.role }}</p>

          <div class="alt-desc">
            <p v-for="(line, i) in alter.description" :key="i">{{ line }}</p>
          </div>
        </li>
      </ul>
    </UContainer>
  </section>
</template>

<style>
.alt {
  padding: 6rem 0;
}
.alt-tagline {
  max-width: 40rem;
  margin: -1.5rem 0 3rem;
  color: var(--ui-text-muted);
  line-height: 1.75;
}
.alt-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
}
.alt-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background:
    linear-gradient(160deg, color-mix(in oklab, var(--color-accent) 8%, transparent), transparent 40%),
    var(--color-card);
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.alt-card:hover {
  transform: translateY(-4px) rotate(-0.5deg);
  border-color: var(--color-accent-deep);
}
.alt-pip {
  position: absolute;
  font-size: 1.25rem;
  line-height: 1;
}
.alt-pip--top    { top: 1rem; left: 1rem; }
.alt-pip--bottom { bottom: 1rem; right: 1rem; rotate: 180deg; }
.alt-name {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
}
.alt-role {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.alt-desc {
  margin-top: 1.25rem;
  display: grid;
  gap: 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--ui-text-muted);
}

/* Face-down card — some alters keep their cards close */
.alt-card--hidden {
  justify-content: center;
  text-align: center;
  background:
    repeating-linear-gradient(45deg, color-mix(in oklab, var(--color-accent) 12%, transparent) 0 2px, transparent 2px 14px),
    repeating-linear-gradient(-45deg, color-mix(in oklab, var(--color-accent) 12%, transparent) 0 2px, transparent 2px 14px),
    var(--color-surface);
}
.alt-card--hidden .alt-desc {
  font-family: var(--font-comic);
  font-size: 1.125rem;
  color: var(--color-accent-soft);
}
</style>
