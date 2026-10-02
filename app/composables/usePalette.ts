// Matches the .pal-* classes in assets/css/palettes.css
export const palettes = [
  { value: 'spade', suit: '♠', label: 'Spade' },
  { value: 'club', suit: '♣', label: 'Club' },
  { value: 'heart', suit: '♥', label: 'Heart' },
  { value: 'diamond', suit: '♦', label: 'Diamond' },
] as const

export type Palette = typeof palettes[number]['value']

const isPalette = (value: unknown): value is Palette =>
  palettes.some(p => p.value === value)

/** Active suit palette — kept in a cookie so SSR renders the right one (no flash) */
export const usePalette = () => {
  const cookie = useCookie<Palette>('palette', {
    default: () => 'heart',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  if (!isPalette(cookie.value)) cookie.value = 'heart'
  return cookie
}
