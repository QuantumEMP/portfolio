<script setup lang="ts">
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

const curtainDone = useCurtainDone()
const visible = ref(true)

const line = ref<HTMLParagraphElement | null>(null)
const leftPanel = ref<SVGPathElement | null>(null)
const rightPanel = ref<SVGPathElement | null>(null)

const finish = () => {
  document.documentElement.style.overflow = ''
  visible.value = false
  curtainDone.value = true
}

onMounted(() => {
  if (prefersReducedMotion()) return finish()

  // No scrolling while the curtain is down
  document.documentElement.style.overflow = 'hidden'

  const tl = gsap.timeline({
    delay: 0.3,
    onComplete: finish,
  })

  tl
    // ── Phase 1: the request, delivered from behind the curtain ──
    .fromTo(line.value, { opacity: 0, y: 12 }, { duration: 0.6, opacity: 1, y: 0, ease: 'power2.out' })
    .to(line.value, { duration: 0.4, opacity: 0, ease: 'power2.in' }, '+=1.2')

    // ── Phase 2: fabric billows — leading edges wave inward
    //    as tension builds before the split ──
    .to(leftPanel.value, {
      duration: 0.6,
      morphSVG: { shape: '#left-billow', shapeIndex: 'auto' },
      ease: 'sine.inOut',
    })
    .to(rightPanel.value, {
      duration: 0.6,
      morphSVG: { shape: '#right-billow', shapeIndex: 'auto' },
      ease: 'sine.inOut',
    }, '<') // simultaneous

    // ── Phase 3: curtains sweep apart — left exits left,
    //    right exits right, trailing edge still wavy ──
    .to(leftPanel.value, {
      duration: 1.8,
      morphSVG: { shape: '#left-exit', shapeIndex: 'auto' },
      ease: 'power4.inOut',
    })
    .to(rightPanel.value, {
      duration: 1.8,
      morphSVG: { shape: '#right-exit', shapeIndex: 'auto' },
      ease: 'power4.inOut',
    }, '<')

    // ── Phase 4: let the hero start while the last sliver leaves ──
    .call(() => { curtainDone.value = true }, [], '-=0.6')
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-9999 flex"
    aria-hidden="true"
  >
    <p ref="line" class="curtain-line">
      <span class="curtain-bubble">
        "When you bring me out, can you introduce me as
        <span class="curtain-joker">Joker</span>?"
      </span>
    </p>

    <svg
      class="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!--
        ═══════════════════════════════════════════════
        MORPH TARGET SHAPES  (hidden — morph destinations only)

        Coordinate system: viewBox 0 0 100 100
          Left panel  occupies x: 0  → 50
          Right panel occupies x: 50 → 100

        The "inner" edge (right edge of left / left edge of right)
        is what billows and then sweeps off screen.
        ═══════════════════════════════════════════════
      -->

      <!-- LEFT: billow inward — right edge curves toward centre -->
      <path
        id="left-billow"
        d="
          M0,0
          L50,0
          C50,18 46,36 48,50
          C46,64 50,82 50,100
          L0,100
          Z
        "
        visibility="hidden"
      />

      <!-- LEFT: fully exited to the left — thin sliver off screen -->
      <path
        id="left-exit"
        d="
          M-100,0
          L-50,0
          C-48,18 -52,36 -50,50
          C-52,64 -48,82 -50,100
          L-100,100
          Z
        "
        visibility="hidden"
      />

      <!-- RIGHT: billow inward — left edge curves toward centre -->
      <path
        id="right-billow"
        d="
          M50,0
          C50,18 54,36 52,50
          C54,64 50,82 50,100
          L100,100
          L100,0
          Z
        "
        visibility="hidden"
      />

      <!-- RIGHT: fully exited to the right -->
      <path
        id="right-exit"
        d="
          M150,0
          C150,18 154,36 152,50
          C154,64 150,82 150,100
          L200,100
          L200,0
          Z
        "
        visibility="hidden"
      />

      <!--
        ═══════════════════════════════════════════════
        LIVE PANELS  (start as two flat half-rectangles)
        Tent-stripe curtain in the deck colours
        ═══════════════════════════════════════════════
      -->

      <!-- Flat tent stripes in the active deck's suit and paper colours -->
      <defs>
        <pattern id="curtain-stripes" width="8" height="100" patternUnits="userSpaceOnUse">
          <rect width="4" height="100" fill="var(--color-primary)" />
          <rect x="4" width="4" height="100" fill="var(--color-paper)" />
        </pattern>
      </defs>

      <!-- Left curtain panel -->
      <path
        ref="leftPanel"
        d="M0,0 L50,0 L50,100 L0,100 Z"
        fill="url(#curtain-stripes)"
      />

      <!-- Right curtain panel -->
      <path
        ref="rightPanel"
        d="M50,0 L100,0 L100,100 L50,100 Z"
        fill="url(#curtain-stripes)"
      />
    </svg>
  </div>
</template>

<style>
.curtain-line {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0; /* faded in by the timeline */
}
.curtain-bubble {
  max-width: 34rem;
  margin: 1.5rem;
  padding: 1.25rem 1.75rem;
  border: 4px solid var(--color-ink);
  border-radius: 0.75rem;
  background: var(--color-gold);
  color: var(--color-ink);
  box-shadow: 8px 8px 0 var(--color-ink);
  text-align: center;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.25rem, 3vw, 1.875rem);
  line-height: 1.35;
}
.curtain-joker {
  font-family: var(--font-kings);
  font-style: normal;
  font-size: 1.3em;
  color: var(--color-primary);
}
</style>
