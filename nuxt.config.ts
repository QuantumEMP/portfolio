// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Joker — Jude Rose',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Joker: websites, apps and games by Jude Rose and the Quantum System. Introduce a little anarchy.' },
      ],
    },
  },

  // Server-only; override with NUXT_RESEND_API_KEY, NUXT_CONTACT_TO, NUXT_CONTACT_FROM
  runtimeConfig: {
    resendApiKey: '',
    contactTo: 'jude1rose@outlook.com',
    // Resend's shared sender only delivers to the Resend account owner's address —
    // switch to an address on a verified domain (e.g. hello@jude-rose.com) for production
    contactFrom: 'Joker Portfolio <onboarding@resend.dev>',
  },

  // Light/dark comes from the suit palette class on <html>, not Nuxt UI's colour mode
  ui: {
    colorMode: false,
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
