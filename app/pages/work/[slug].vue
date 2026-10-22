<script setup lang="ts">
import { caseStudies } from '~/data/caseStudies'

const route = useRoute()
const found = caseStudies.find(s => s.slug === route.params.slug)

if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true })
}
// Narrowed for the template too
const study = found

const siteUrl = 'https://jok3r.win/'
const pageUrl = `${siteUrl}work/${study.slug}`
const title = `${study.name}: case study by Jude Rose | Joker`
const image = `${siteUrl}${study.image.replace(/^\//, '')}`
// Link previews get a 1200×630 JPEG (public/og/<slug>.jpg): some apps skip WebP previews
const ogImage = `${siteUrl}og/${study.slug}.jpg`
const otherStudies = caseStudies.filter(s => s.slug !== study.slug)
const prettyUrl = (url: string) => url.replace(/^https?:\/\//, '')

useSeoMeta({
  title,
  description: study.summary,
  ogType: 'article',
  ogSiteName: 'Joker',
  ogLocale: 'en_ZA',
  ogTitle: title,
  ogDescription: study.summary,
  ogUrl: pageUrl,
  ogImage,
  ogImageType: 'image/jpeg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: study.imageAlt,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: study.summary,
  twitterImage: ogImage,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CreativeWork',
          '@id': `${pageUrl}#work`,
          'name': study.name,
          'description': study.summary,
          'image': image,
          'url': study.url ?? study.repo ?? pageUrl,
          'creator': { '@id': `${siteUrl}#jude` },
          'isPartOf': { '@id': `${siteUrl}#website` },
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Joker', 'item': siteUrl },
            { '@type': 'ListItem', 'position': 2, 'name': 'The sideshow', 'item': `${siteUrl}#work` },
            { '@type': 'ListItem', 'position': 3, 'name': study.name, 'item': pageUrl },
          ],
        },
      ],
    }),
  }],
})
</script>

<template>
  <article class="cs blk blk-base">
    <div class="wrap cs-inner">
      <NuxtLink to="/#work" class="cs-back">← Back to the sideshow</NuxtLink>

      <header class="cs-head">
        <p class="cs-kicker"><SuitIcon :suit="study.suit" /> {{ study.kicker }}</p>
        <h1 class="sec-title">{{ study.name }}</h1>
        <p class="sec-sub">{{ study.summary }}</p>
      </header>

      <img :src="study.image" :alt="study.imageAlt" class="cs-shot stock" width="960" height="540">

      <section v-for="section in study.sections" :key="section.heading" class="cs-section">
        <h2 class="cs-heading">{{ section.heading }}</h2>
        <p v-for="(paragraph, i) in section.paragraphs" :key="i">{{ paragraph }}</p>
        <ul v-if="section.points" class="cs-points">
          <li v-for="point in section.points" :key="point">{{ point }}</li>
        </ul>
      </section>

      <div class="cs-ctas">
        <a v-if="study.url" :href="study.url" target="_blank" rel="noopener" class="btn btn-gold">
          Visit {{ prettyUrl(study.url) }}
        </a>
        <a v-if="study.repo" :href="study.repo" target="_blank" rel="noopener" class="btn btn-gold">
          See the source
        </a>
        <NuxtLink to="/#contact" class="btn">Book a consultation</NuxtLink>
      </div>

      <nav v-if="otherStudies.length" class="cs-more" aria-labelledby="cs-more-title">
        <h2 id="cs-more-title" class="cs-heading">More from the sideshow</h2>
        <ul class="cs-more-list">
          <li v-for="other in otherStudies" :key="other.slug">
            <NuxtLink :to="`/work/${other.slug}`" class="cs-more-card stock">
              <img :src="other.image" alt="" class="cs-more-shot" width="960" height="540" loading="lazy">
              <span class="cs-more-name">{{ other.name }}</span>
              <span class="cs-more-kicker">{{ other.kicker }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </article>
</template>

<style>
.cs {
  border-top: 0;
  padding-top: 11rem;
}
@media (min-width: 1024px) {
  .cs { padding-top: 16rem; }
}
.cs-inner {
  display: grid;
  gap: 2.5rem;
  max-width: 52rem;
}
.cs-back {
  justify-self: start;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.cs-kicker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--color-gold);
}
.pal-club .cs-kicker,
.pal-diamond .cs-kicker { color: var(--color-primary); }
.cs-shot {
  width: 100%;
  height: auto;
  border-width: 4px;
  border-radius: 6px;
}
.cs-section {
  display: grid;
  gap: 0.9rem;
}
.cs-heading {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  line-height: 1.15;
}
.cs-points {
  display: grid;
  gap: 0.5rem;
  padding-left: 1.25rem;
  list-style: disc;
}
.cs-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.cs-more {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.5rem;
}
.cs-more-list {
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 640px) {
  .cs-more-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.cs-more-card {
  display: grid;
  gap: 0.35rem;
  height: 100%;
  padding: 0.75rem 0.75rem 1rem;
  border-radius: 6px;
}
.cs-more-shot {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: top;
  margin-bottom: 0.4rem;
  border-radius: 3px;
}
.cs-more-name {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.cs-more-kicker { font-size: 0.875rem; }
</style>
