<script setup lang="ts">
import { gsap } from 'gsap'

const curtainDone = useCurtainDone()
const visible = ref(true)

const bubble = ref<HTMLParagraphElement | null>(null)
const halves = ref<HTMLDivElement[]>([])

let tl: gsap.core.Timeline | undefined

const CURTAIN_SEEN_KEY = 'joker-curtain-seen'

// The server always renders the curtain (it can't read sessionStorage).
// This runs in <head> before the first paint and marks <html> when the
// curtain was already seen, so CSS hides it with no flash on reloads.
useHead({
  script: [{
    key: 'curtain-seen',
    innerHTML: `try{if(sessionStorage.getItem('${CURTAIN_SEEN_KEY}'))document.documentElement.dataset.curtain='seen'}catch(e){}`,
  }],
})

/**
 * Whether the curtain should perform on this page load.
 * Runs on the client only, before anything animates.
 */
const shouldPlayCurtain = (): boolean => {
  // Once per browser session; storage can throw (private mode, blocked
  // site data), and then the curtain simply plays
  try {
    if (sessionStorage.getItem(CURTAIN_SEEN_KEY)) return false
    sessionStorage.setItem(CURTAIN_SEEN_KEY, '1')
  }
  catch {
    // no storage: play it
  }
  return true
}

const finish = () => {
  document.documentElement.style.overflow = ''
  removeSkipListeners()
  visible.value = false
  curtainDone.value = true
}

// Any click, key or scroll attempt skips straight to the open stage
const skip = () => tl?.progress(1)
const removeSkipListeners = () => {
  window.removeEventListener('keydown', skip)
  window.removeEventListener('wheel', skip)
  window.removeEventListener('touchmove', skip)
}

onMounted(() => {
  if (prefersReducedMotion() || !shouldPlayCurtain()) return finish()

  document.documentElement.style.overflow = 'hidden'
  window.addEventListener('keydown', skip)
  window.addEventListener('wheel', skip, { passive: true })
  window.addEventListener('touchmove', skip, { passive: true })

  // Gather into the hero's own side curtains, so the hand-off is seamless
  const gathered = document.querySelector<HTMLElement>('.hero-curtain')?.offsetWidth ?? 0

  tl = gsap.timeline({ delay: 0.2, onComplete: finish })
    // The request, from behind the curtain
    .from(bubble.value, { scale: 0.85, opacity: 0, duration: 0.45, ease: 'back.out(2)' })
    .to(bubble.value, { y: -24, opacity: 0, duration: 0.3, ease: 'power2.in' }, '+=1')
    // Both halves gather to the sides; the pleats bunch as they go
    .to(halves.value, { width: gathered, duration: 1.3, ease: 'power3.inOut' }, '-=0.05')
    // Start the hero's act while the fabric settles
    .call(() => { curtainDone.value = true }, [], '-=0.45')
})

onBeforeUnmount(() => {
  tl?.kill()
  removeSkipListeners()
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <div v-if="visible" class="ct" aria-hidden="true" @click="skip">
    <div v-for="side in ['left', 'right']" :key="side" ref="halves" class="ct-half" :class="`ct-half--${side}`">
      <span v-for="n in 4" :key="n" class="ct-pleat" />
    </div>

    <!-- Same valance as the hero, so it never moves -->
    <div class="hero-valance" />

    <p ref="bubble" class="ct-bubble">
      "When you bring me out, can you introduce me as
      <span class="ct-joker">Joker</span>?"
    </p>
  </div>
</template>

<style>
.ct {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  cursor: pointer;
}
/* Hidden before first paint: already seen this session (set by the head
   script), or the visitor prefers reduced motion */
[data-curtain="seen"] .ct {
  display: none;
}
@media (prefers-reduced-motion: reduce) {
  .ct { display: none; }
}

/* Each half is four tent-stripe pleats; narrowing the half bunches them */
.ct-half {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  display: flex;
}
.ct-half--left  { left: 0;  border-right: 3px solid var(--color-ink); }
.ct-half--right { right: 0; border-left: 3px solid var(--color-ink); }
.ct-pleat {
  flex: 1;
  background: var(--color-primary);
}
.ct-pleat:nth-child(even) {
  background: var(--color-paper);
}

.ct-bubble {
  position: relative;
  z-index: 2;
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
.ct-joker {
  font-family: var(--font-kings);
  font-style: normal;
  font-size: 1.3em;
  color: var(--color-primary);
}
</style>
