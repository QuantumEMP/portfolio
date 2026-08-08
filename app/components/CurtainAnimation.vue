<script setup lang="ts">
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

const wrapper = ref<HTMLDivElement | null>(null)
const leftPanel = ref<SVGPathElement | null>(null)
const rightPanel = ref<SVGPathElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({
    delay: 0.3,
    onComplete: () => wrapper.value?.remove(),
  })

  tl
    // ── Phase 1: panels hang still, let page load beneath ──
    .set([leftPanel.value, rightPanel.value], { opacity: 1 })

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
      duration: 2,
      morphSVG: { shape: '#left-exit', shapeIndex: 'auto' },
      ease: 'power4.inOut',
    })
    .to(rightPanel.value, {
      duration: 2,
      morphSVG: { shape: '#right-exit', shapeIndex: 'auto' },
      ease: 'power4.inOut',
    }, '<')

    // ── Phase 4: fade out wrapper as the last sliver leaves ──
    .to(wrapper.value, {
      duration: 0,
      opacity: 0,
      ease: 'none',
    }, '-=0.2')
})
</script>

<template>
  <div
    ref="wrapper"
    class="absolute inset-0 z-9999 flex pointer-events-none"
    aria-hidden="true"
  >
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
        Rich stage-curtain red — matches the reference
        ═══════════════════════════════════════════════
      -->

      <!-- Vertical fold lines via a subtle gradient for fabric depth -->
      <defs>
        <linearGradient id="curtain-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#8b0c22" />
          <stop offset="18%"  stop-color="#c01230" />
          <stop offset="35%"  stop-color="#9e1028" />
          <stop offset="52%"  stop-color="#c01230" />
          <stop offset="68%"  stop-color="#a50e29" />
          <stop offset="82%"  stop-color="#c01230" />
          <stop offset="100%" stop-color="#7a0a1e" />
        </linearGradient>
        <linearGradient id="curtain-grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#7a0a1e" />
          <stop offset="18%"  stop-color="#c01230" />
          <stop offset="35%"  stop-color="#a50e29" />
          <stop offset="52%"  stop-color="#c01230" />
          <stop offset="68%"  stop-color="#9e1028" />
          <stop offset="85%"  stop-color="#c01230" />
          <stop offset="100%" stop-color="#8b0c22" />
        </linearGradient>
      </defs>

      <!-- Left curtain panel -->
      <path
        ref="leftPanel"
        d="M0,0 L50,0 L50,100 L0,100 Z"
        fill="url(#curtain-grad-left)"
        opacity="0"
      />

      <!-- Right curtain panel -->
      <path
        ref="rightPanel"
        d="M50,0 L100,0 L100,100 L50,100 Z"
        fill="url(#curtain-grad-right)"
        opacity="0"
      />
    </svg>
  </div>
</template>