<script setup lang="ts">
import { projectGroups } from '~/data/projects'

const prettyUrl = (url: string) => url.replace(/^https?:\/\//, '')
</script>

<template>
  <section id="work" class="ss blk blk-paper">
    <div class="wrap">
      <h2 class="sec-title">The sideshow</h2>
      <p class="sec-sub">Step right up and see the work.</p>

      <ul class="ss-wall">
        <li v-for="group in projectGroups" :key="group.title" class="ss-poster">
          <SuitIcon :suit="group.suit" class="ss-suit" />
          <p class="ss-kicker">The astonishing</p>
          <h3 class="ss-title">{{ group.title }}</h3>

          <ul class="ss-acts">
            <li v-for="project in group.projects" :key="project.name" class="ss-act">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="`Screenshot of ${project.name}`"
                class="ss-photo"
                loading="lazy"
              >
              <h4 class="ss-name">{{ project.name }}</h4>
              <p v-if="project.description" class="ss-desc">{{ project.description }}</p>
              <p class="ss-links">
                <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">{{ prettyUrl(project.url) }}</a>
                <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener">See the source</a>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<style>
.ss-wall {
  display: grid;
  gap: 2.5rem 1.75rem;
  margin-top: 3rem;
  align-items: start;
}
@media (min-width: 640px) {
  .ss-wall { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  .ss-wall { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 3.5rem; }
}

/* A sideshow poster: one flat block, ink border, hard shadow */
.ss-poster {
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  padding: 1.6rem 1.4rem 1.75rem;
  border: 4px solid var(--color-ink);
  border-radius: 4px;
  box-shadow: 8px 8px 0 var(--color-ink);
  text-align: center;
  rotate: -2deg;
}
.ss-poster:nth-child(even) { rotate: 2deg; }
.ss-poster:nth-child(4n + 1) { background: var(--color-primary); color: var(--color-paper); }
.ss-poster:nth-child(4n + 2) { background: var(--color-ink);     color: var(--color-paper); }
.ss-poster:nth-child(4n + 3) { background: var(--color-gold);    color: var(--color-ink); }
.ss-poster:nth-child(4n + 4) { background: var(--color-paper);   color: var(--color-ink); }

.ss-suit { font-size: 2rem; }
.ss-poster:nth-child(4n + 2) .ss-suit { color: var(--color-primary); }
.ss-kicker {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
}
.ss-title {
  width: 100%;
  padding-bottom: 0.9rem;
  border-bottom: 3px solid currentColor;
  font-family: var(--font-poster);
  font-weight: 400;
  font-size: 1.875rem;
  line-height: 1.1;
}
.ss-acts {
  display: grid;
  gap: 1rem;
  width: 100%;
}
.ss-act {
  display: grid;
  gap: 0.2rem;
}
.ss-photo {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  margin-bottom: 0.4rem;
  border: 3px solid var(--color-ink);
  background: var(--color-paper);
}
.ss-name {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.3;
}
.ss-desc {
  font-size: 0.9375rem;
}
.ss-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.2rem 0.9rem;
  font-size: 0.9375rem;
}
.ss-links a {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  word-break: break-word;
}
</style>
