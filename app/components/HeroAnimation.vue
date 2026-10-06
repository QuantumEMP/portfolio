<template>
  <section id="home" class="hero blk-base">
    <!-- The big top: scalloped tent valance and striped side curtains -->
    <div class="hero-valance" aria-hidden="true" />
    <div class="hero-curtain hero-curtain--left" aria-hidden="true" />
    <div class="hero-curtain hero-curtain--right" aria-hidden="true" />
    <TentMenu />

    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="hero-intro">Ladies, gentlemen and everyone in between, introducing</p>

        <h1 class="hero-title">
          <span class="block">Jude</span>
          <span class="hero-line2">the
            <span class="hero-struck">
              Clown
              <svg
                class="hero-scribble"
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  ref="scribble"
                  d="M4,34 C20,18 30,46 46,30 S72,16 88,34 S114,48 130,28 S158,16 172,34 S190,42 196,24
                     M10,44 C40,24 70,48 104,26 S160,46 194,18"
                />
              </svg>
              <span ref="joker" class="hero-joker">Joker</span>
            </span></span>
        </h1>

        <p ref="tagline" class="hero-tagline">
          Life is like a deck of cards; sometimes you have to play the joker.
          Websites, apps and games by Jude Rose and the Quantum System.
        </p>

        <div ref="ctas" class="hero-ctas">
          <NuxtLink to="/#work" class="btn btn-gold">See the acts</NuxtLink>
          <NuxtLink to="/#contact" class="btn">Buy a ticket</NuxtLink>
        </div>
      </div>

      <JokerCard class="hero-card" />
    </div>

    <!-- Points at the hand of cards fixed to the bottom of the screen -->
    <span class="sticker hero-sticker" aria-hidden="true">pick a card!</span>
  </section>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

const curtainDone = useCurtainDone()

const scribble = ref<SVGPathElement | null>(null)
const joker = ref<HTMLSpanElement | null>(null)
const tagline = ref<HTMLParagraphElement | null>(null)
const ctas = ref<HTMLDivElement | null>(null)

let tl: gsap.core.Timeline | undefined

onMounted(() => {
  // Without motion, the CSS end state (Clown struck, Joker written) shows as-is
  if (prefersReducedMotion()) return

  gsap.set(scribble.value, { drawSVG: '0%' })
  gsap.set(joker.value, { opacity: 0, scale: 0.4, rotate: -20 })
  gsap.set(tagline.value, { clipPath: 'inset(0 100% 0 0)' })
  gsap.set(ctas.value, { opacity: 0, y: 16 })

  tl = gsap.timeline({ paused: true })
    // Let "Jude the Clown" land before correcting it
    .to(scribble.value, { drawSVG: '100%', duration: 0.7, ease: 'power1.inOut' }, 0.9)
    .to(joker.value, { opacity: 1, scale: 1, rotate: 7, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.1')
    // Tagline is revealed left to right
    .to(tagline.value, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power2.inOut', clearProps: 'clipPath' }, '+=0.2')
    .to(ctas.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')

  watch(curtainDone, (done) => {
    if (done) tl?.play()
  }, { immediate: true })
})

onBeforeUnmount(() => tl?.kill())
</script>

<style>
.hero {
  position: relative;
  overflow: hidden;
  min-height: 100svh;
  display: flex;
  align-items: center;
  border-top: 0;
  padding-block: 9rem 8rem;
}
@media (min-width: 1024px) {
  .hero { padding-block: 14rem 9rem; }
}

/* Tent valance: a striped band with alternating suit/paper scallops
   hanging off it. Each tile is two scallops wide (--scallop each). */
.hero-valance {
  --band: calc(var(--scallop) * 0.55);
  --r: calc(var(--scallop) / 2);
  position: absolute;
  z-index: 1;
  inset: 0 0 auto;
  height: calc(var(--band) + var(--r) + 3px);
  background:
    /* band stripes, lined up over the scallops below */
    linear-gradient(90deg, var(--color-paper) 25%, var(--color-primary) 25% 75%, var(--color-paper) 75%)
      0 0 / calc(var(--scallop) * 2) var(--band) repeat-x,
    /* ink stripe dividers */
    linear-gradient(90deg, transparent calc(var(--r) - 1.5px), var(--color-ink) 0 calc(var(--r) + 1.5px), transparent 0)
      0 0 / var(--scallop) var(--band) repeat-x,
    radial-gradient(circle at 50% var(--band), var(--color-primary) calc(var(--r) - 3px), var(--color-ink) 0 var(--r), transparent 0)
      0 0 / calc(var(--scallop) * 2) 100% repeat-x,
    radial-gradient(circle at 50% var(--band), var(--color-paper) calc(var(--r) - 3px), var(--color-ink) 0 var(--r), transparent 0)
      var(--scallop) 0 / calc(var(--scallop) * 2) 100% repeat-x;
}

/* Side curtains: always four tent stripes, so the intro curtain
   (CurtainAnimation) can gather into exactly this shape */
.hero-curtain {
  position: absolute;
  top: 0;
  bottom: 0;
  width: var(--curtain-w);
  background: linear-gradient(90deg,
    var(--color-primary) 0 25%, var(--color-paper) 0 50%,
    var(--color-primary) 0 75%, var(--color-paper) 0);
}
.hero-curtain--left  { left: 0; border-right: 3px solid var(--color-ink); }
.hero-curtain--right { right: 0; border-left: 3px solid var(--color-ink); }

.hero-grid {
  position: relative;
  display: grid;
  gap: 3.5rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .hero-grid { grid-template-columns: 1.25fr 1fr; }
}

.hero-intro {
  max-width: 22rem;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.0625rem, 1.6vw, 1.375rem);
  line-height: 1.3;
  color: var(--color-gold);
}
.pal-club .hero-intro,
.pal-diamond .hero-intro { color: var(--color-primary); }
@media (min-width: 1024px) {
  .hero-intro { max-width: none; }
}

.hero-title {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(4.5rem, 10vw, 8.5rem);
  line-height: 1;
}
.hero-line2 {
  display: block;
  margin-top: 0.15em;
  white-space: nowrap;
}
.hero-struck {
  position: relative;
  display: inline-block;
  white-space: nowrap;
}
.hero-scribble {
  position: absolute;
  inset: 30% -4% 18% -4%;
  width: 108%;
  height: 52%;
  overflow: visible;
}
.hero-scribble path {
  fill: none;
  stroke: var(--color-gold);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
.hero-joker {
  position: absolute;
  left: 8%;
  bottom: 62%;
  rotate: 7deg;
  font-family: var(--font-kings);
  font-size: 0.95em;
  line-height: 1;
  color: var(--color-primary);
  /* cut-out edge so the scrawl sits on top of "Jude" */
  -webkit-text-stroke: 0.06em var(--color-base);
  paint-order: stroke fill;
}

.hero-tagline {
  margin-top: 2rem;
  max-width: 33rem;
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.65;
}
.hero-ctas {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-sticker {
  position: absolute;
  z-index: 1;
  right: calc(50% - 2rem);
  bottom: 1.5rem;
  rotate: -7deg;
  font-size: 1.375rem;
}
@media (min-width: 768px) {
  .hero-sticker { right: 28rem; bottom: 4rem; rotate: 8deg; font-size: 1.75rem; }
}

.hero-card {
  justify-self: center;
  rotate: -7deg;
}
@media (max-width: 1023px) {
  .hero-card { width: min(13rem, 60vw); justify-self: end; margin-right: 1rem; }
}
</style>
