# Joker — Portfolio

Portfolio for Jude Rose and the Quantum System. Built with Nuxt 4, Nuxt UI and GSAP.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm generate   # static site
```

## Where things live

- `app/data/` — section content (alters, skills, projects, contact). Raw copy lives in `copy/`.
- `app/assets/css/palettes.css` — suit palettes. Visitors pick one from the header dropdown (`ThemeSelect.vue`, stored in a cookie via `usePalette()`).
- `app/components/CurtainAnimation.vue` → `HeroAnimation.vue` — opening sequence; the hero waits on `useCurtainDone()`.
