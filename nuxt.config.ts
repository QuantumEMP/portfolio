// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Joker — Jude Rose',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Joker: websites, apps and games by Jude Rose and the Quantum System. Introduce a little anarchy.' },
      ],
      // Google shows the favicon beside the site name in search results; it wants a
      // square icon at a multiple of 48px, so the PNGs are cut from favicon.ico's 256px frame
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '16x16 32x32 48x48 64x64 256x256' },
        { rel: 'icon', type: 'image/png', href: '/favicon-48.png', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/favicon-192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      ],
      // Google tag (gtag.js). It lives here rather than in a page's <script> block,
      // which Vue compiles as component code and never sends to the browser.
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-FDVFQ38M70', async: true },
        {
          innerHTML: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-FDVFQ38M70');",
        },
      ],
    },
  },

  // Baseline security headers on every response. No CSP yet: the Google tag
  // and Nuxt's inline payload scripts need one tuned before it can be enforced
  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  },

  // Server-only; override with NUXT_RESEND_API_KEY, NUXT_CONTACT_TO, NUXT_CONTACT_FROM
  runtimeConfig: {
    resendApiKey: '',
    contactTo: 'jude1rose@outlook.com',
    // jok3r.win must be a verified domain in Resend for this sender to deliver
    contactFrom: 'Joker <software@jok3r.win>',
  },

  // Ship these with the app so SSR can render them (the scanner misses icons passed via props/data)
  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'lucide:mail',
        'lucide:map-pin',
        'lucide:send',
        'lucide:linkedin',
        'lucide:circle-check',
        'lucide:circle-x',
        'lucide:arrow-up-right',
        'simple-icons:github',
      ],
    },
  },

  fonts: {
    families: [
      { name: 'DM Serif Display', provider: 'google', weights: [400] },
      { name: 'DM Serif Text', provider: 'google', weights: [400], styles: ['normal', 'italic'] },
      { name: 'Comfortaa', provider: 'google', weights: [400, 700] },
      { name: 'Kings', provider: 'google', weights: [400] },
      { name: 'Rye', provider: 'google', weights: [400] },
    ],
  },
})
