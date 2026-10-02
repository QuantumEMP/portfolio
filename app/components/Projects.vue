<script setup lang="ts">
import { projectGroups } from '~/data/projects'

const prettyUrl = (url: string) => url.replace(/^https?:\/\//, '')
</script>

<template>
  <section id="work" class="pr">
    <UContainer>
      <SectionHeading
        eyebrow="Work & Projects"
        suit="♠"
        title="The internet is a well of knowledge."
        subtitle="Jokers add the flavour."
      />

      <div class="pr-groups">
        <div v-for="group in projectGroups" :key="group.title">
          <h3 class="pr-group-title">
            <span :class="suitClass(group.suit)">{{ group.suit }}</span>
            {{ group.title }}
          </h3>

          <ul class="pr-grid">
            <li v-for="project in group.projects" :key="project.name" class="pr-card">
              <div v-if="project.image" class="pr-image">
                <img :src="project.image" :alt="project.name" loading="lazy">
              </div>

              <div class="pr-content">
                <h4 class="pr-name">{{ project.name }}</h4>
                <p v-if="project.description" class="pr-desc">{{ project.description }}</p>

                <div class="pr-links">
                  <UButton
                    v-if="project.url"
                    :to="project.url"
                    :label="prettyUrl(project.url)"
                    target="_blank"
                    trailing-icon="i-lucide-arrow-up-right"
                    size="sm"
                    variant="soft"
                  />
                  <UButton
                    v-if="project.repo"
                    :to="project.repo"
                    label="Source"
                    target="_blank"
                    icon="i-simple-icons-github"
                    size="sm"
                    color="neutral"
                    variant="outline"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style>
.pr {
  padding: 6rem 0;
}
.pr-groups {
  display: grid;
  gap: 3.5rem;
}
.pr-group-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text);
}
.pr-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
}
.pr-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: var(--color-card);
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.pr-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent-deep);
}
.pr-image {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}
.pr-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.pr-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
}
.pr-name {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-text);
}
.pr-desc {
  font-size: 0.9375rem;
  color: var(--ui-text-muted);
}
.pr-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
}
</style>
