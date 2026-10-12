
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FDVFQ38M70">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FDVFQ38M70');
</script>

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

const siteUrl = 'https://jok3r.win/'
const title = 'Joker — Jude Rose'
const description = 'Joker: websites, apps and games by Jude Rose and the Quantum System. Introduce a little anarchy.'

useSeoMeta({
  ogType: 'website',
  ogSiteName: 'Joker',
  ogTitle: title,
  ogDescription: description,
  ogUrl: siteUrl,
  twitterCard: 'summary',
  twitterTitle: title,
  twitterDescription: description,
})

useHead({
  // The same build is also served from Vercel and Cloudflare preview hosts; point Google at the real domain
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Jude Rose',
      'alternateName': 'Joker',
      'url': siteUrl,
      'jobTitle': 'Software Developer',
      'address': { '@type': 'PostalAddress', 'addressLocality': 'Cape Town', 'addressCountry': 'ZA' },
      'sameAs': contact.socials.map(s => s.to),
    }),
  }],
})
</script>
