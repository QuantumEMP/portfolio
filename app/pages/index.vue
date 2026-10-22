<template>
  <div>
    <CurtainAnimation />
    <HeroAnimation />
    <About />
    <!-- The troupe is hidden until the alters copy is finished (also its card in CardFanNav) -->
    <!-- <Alter /> -->
    <Skills />
    <Projects />
    <ContactUs />
  </div>
</template>

<script setup lang="ts">
import { contact } from '~/data/contact'
import { skillSuits } from '~/data/skills'

const siteUrl = 'https://jok3r.win/'
// Lead with the name and what Jude does: that's what people search for
const title = 'Jude Rose: Web & App Developer in Cape Town | Joker'
const description = 'Jude Rose (Joker) builds websites, mobile apps and games from Cape Town. See the projects and skills, then book a consultation.'
const image = `${siteUrl}og-image.png`
// Every skill on the juggler's board, for the Person's knowsAbout
const skills = skillSuits.flatMap(suit => suit.skills.flatMap(s => [s.name, ...(s.children ?? []).map(c => c.name)]))

useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogSiteName: 'Joker',
  ogLocale: 'en_ZA',
  ogTitle: title,
  ogDescription: description,
  ogUrl: siteUrl,
  ogImage: image,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Joker: Jude the Clown, introduced under the big top',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
})

useHead({
  // The same build is also served from Vercel and Cloudflare preview hosts; point Google at the real domain
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}#website`,
          'url': siteUrl,
          'name': 'Joker',
          'alternateName': 'Jude Rose',
          'inLanguage': 'en',
          'publisher': { '@id': `${siteUrl}#jude` },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${siteUrl}#profile`,
          'url': siteUrl,
          'name': title,
          'isPartOf': { '@id': `${siteUrl}#website` },
          'mainEntity': { '@id': `${siteUrl}#jude` },
        },
        {
          '@type': 'Person',
          '@id': `${siteUrl}#jude`,
          'name': 'Jude Rose',
          'alternateName': 'Joker',
          'url': siteUrl,
          // Swap for a headshot when there is one: Google prefers a photo of the person
          'image': `${siteUrl}favicon-192.png`,
          'jobTitle': 'Software Developer',
          'description': description,
          'email': `mailto:${contact.email}`,
          'knowsAbout': skills,
          'address': { '@type': 'PostalAddress', 'addressLocality': 'Cape Town', 'addressCountry': 'ZA' },
          'sameAs': contact.socials.map(s => s.to),
        },
      ],
    }),
  }],
})
</script>
