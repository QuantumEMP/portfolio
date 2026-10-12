// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Section components (About, Skills, Projects…) are single words by design
  rules: { 'vue/multi-word-component-names': 'off' },
})
