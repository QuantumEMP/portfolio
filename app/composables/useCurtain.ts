/** Shared flag so the hero waits for the curtain before it performs */
export const useCurtainDone = () => useState('curtain-done', () => false)

export const prefersReducedMotion = () =>
  import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
