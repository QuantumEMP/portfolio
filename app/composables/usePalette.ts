// Matches the .pal-* classes in assets/css/palettes.css
// themeColor mirrors each palette's --color-base for the browser chrome
// Order is the brand book's: Spade, Club, Heart, Diamond
export const palettes = [
  { value: 'spade', suit: '♠', label: 'Spade', mode: 'dark', themeColor: '#0b1442' },
  { value: 'club', suit: '♣', label: 'Club', mode: 'light', themeColor: '#ffffff' },
  { value: 'heart', suit: '♥', label: 'Heart', mode: 'dark', themeColor: '#141114' },
  { value: 'diamond', suit: '♦', label: 'Diamond', mode: 'light', themeColor: '#ffffff' },
] as const

export type Palette = typeof palettes[number]['value']

const isPalette = (value: unknown): value is Palette =>
  palettes.some(p => p.value === value)

// Shared with every tent on jok3r.win (tools., blog., ...) so a visitor's
// deck follows them between sites. Keep the name in sync with their useDeck.
const DECK_COOKIE = 'joker-deck'
const SITE_DOMAIN = 'jok3r.win'

/** Scope the cookie to the whole site in production; host-only elsewhere (localhost, previews) */
const deckCookieDomain = (host: string) =>
  host === SITE_DOMAIN || host.endsWith(`.${SITE_DOMAIN}`) ? `.${SITE_DOMAIN}` : undefined

/** Active suit palette — kept in a cookie so SSR renders the right one (no flash) */
export const usePalette = () => {
  const cookie = useCookie<Palette>(DECK_COOKIE, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
    domain: deckCookieDomain(useRequestURL().hostname),
  })
  if (!isPalette(cookie.value)) {
    // Carry over a pick saved under this site's old cookie name
    const legacy = useCookie('palette').value
    cookie.value = isPalette(legacy) ? legacy : 'heart'
  }
  return cookie
}
