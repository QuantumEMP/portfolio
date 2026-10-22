type Choice = 'granted' | 'denied'

// Read by the inline Google tag snippet in nuxt.config.ts; keep the names in sync
const CONSENT_KEY = 'joker-consent'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

/** Analytics consent: whether to show the banner, and the visitor's answer */
export const useConsent = () => {
  const open = useState('consent-open', () => false)

  /** Client only: open the banner if the visitor hasn't answered yet */
  const askIfUnanswered = () => {
    try {
      if (localStorage.getItem(CONSENT_KEY)) return
    }
    catch {
      // no storage: ask every visit
    }
    open.value = true
  }

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice)
    }
    catch {
      // no storage: the choice lasts for this page view
    }
    window.gtag?.('consent', 'update', { analytics_storage: choice })
    open.value = false
  }

  return { open, askIfUnanswered, choose }
}
