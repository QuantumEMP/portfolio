<template>
  <section id="home" class="hero">
    <UContainer class="hero-grid">
      <div>
        <p class="hero-eyebrow">Introducing</p>

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
          <span class="hero-paint">
            Life is like a deck of cards; sometimes you have to play the joker.
          </span>
        </p>

        <div ref="ctas" class="hero-ctas">
          <UButton to="/#work" label="See the work" size="lg" class="rounded-full" />
          <UButton
            to="/#contact"
            label="Deal me in"
            size="lg"
            color="neutral"
            variant="outline"
            class="rounded-full"
          />
        </div>
      </div>

      <img
        class="hero-cards"
        src="/backgrounds/Jacks.png"
        alt=""
        width="1378"
        height="1192"
      >
    </UContainer>
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
    .to(joker.value, { opacity: 1, scale: 1, rotate: -8, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.1')
    // Tagline is painted on, left to right
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
  min-height: calc(100svh - var(--ui-header-height, 4rem));
  display: flex;
  align-items: center;
  padding: 4rem 0;
  background:
    radial-gradient(ellipse at 75% 40%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 60%),
    var(--color-bg);
}
.hero-grid {
  display: grid;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .hero-grid { grid-template-columns: 1.2fr 1fr; }
}
.hero-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.hero-title {
  margin-top: 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 6.5rem);
  font-weight: 700;
  line-height: 1;
  color: var(--color-text);
}
.hero-line2 {
  display: block;
  margin-top: 0.4em; /* headroom for "Joker" written above "Clown" */
  white-space: nowrap;
}
.hero-struck {
  position: relative;
  display: inline-block;
  white-space: nowrap;
}
.hero-scribble {
  position: absolute;
  inset: 15% -4% 10% -4%;
  width: 108%;
  height: 75%;
  overflow: visible;
}
.hero-scribble path {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
.hero-joker {
  position: absolute;
  left: 50%;
  bottom: 78%;
  translate: -50% 0;
  rotate: -8deg;
  font-family: var(--font-comic);
  font-size: 0.75em;
  font-weight: 700;
  color: var(--color-accent-soft);
  text-shadow: 0 0 24px color-mix(in oklab, var(--color-accent) 60%, transparent);
}
.hero-tagline {
  margin-top: 2.5rem;
  max-width: 34rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.125rem, 2.2vw, 1.5rem);
  line-height: 1.6;
  color: var(--color-text);
}
.hero-paint {
  /* Brush-stroke highlight behind the text */
  background: linear-gradient(
    100deg,
    transparent 0.5%,
    color-mix(in oklab, var(--color-accent) 45%, transparent) 2%,
    color-mix(in oklab, var(--color-accent) 30%, transparent) 97%,
    transparent 99.5%
  );
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  padding: 0.1em 0.35em;
}
.hero-ctas {
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.hero-cards {
  width: 100%;
  max-width: 32rem;
  justify-self: center;
  rotate: 6deg;
  filter: drop-shadow(0 30px 40px rgb(0 0 0 / 0.5));
}
@media (max-width: 1023px) {
  .hero-cards { max-width: 20rem; }
}
</style>
