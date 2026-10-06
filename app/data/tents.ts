// The other tents on the lot: sister sites under jok3r.win.
// Add a new subdomain here and it gets its own sign in the TentMenu.
export interface ITent {
  name: string
  host: string
  blurb: string
  /** Not open yet: shows the sign without a link */
  soon?: boolean
}

export const tents: ITent[] = [
  { name: 'The workshop', host: 'tools.jok3r.win', blurb: 'Handy little tools, free to borrow.' },
  { name: 'The diary', host: 'blog.jok3r.win', blurb: 'Notes from behind the curtain.', soon: true },
]
