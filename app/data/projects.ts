import type { IProjectGroup } from '~~/types/alters'

// Source copy: copy/projects.md
export const projectGroups: IProjectGroup[] = [
  {
    title: 'Web Projects',
    suit: '♥',
    projects: [
      { name: 'Friendship Census', url: 'https://friendship-census.jude-rose.com' },
      { name: 'Blog', url: 'https://jude-rose.com/blogs' },
      { name: 'Gurlie Purlie', url: 'https://gurliepurlie.shop' },
    ],
  },
  {
    title: 'Terminal Games',
    suit: '♠',
    projects: [
      { name: 'Sudoku Solver', repo: 'https://github.com/QuantumEMP/sudoku', description: 'Written in Java.' },
      { name: 'UNO', repo: 'https://github.com/QuantumEMP/UNO', description: 'Written in Python.' },
      { name: 'Hangman... OF PAIN', repo: 'https://github.com/QuantumEMP/Hangman', image: '/projects/hangman.png' },
    ],
  },
  {
    title: 'Special Projects',
    suit: '♦',
    projects: [
      {
        name: 'English to South African Sign Language Translator',
        repo: 'https://github.com/QuantumEMP/sign-language-web',
        image: '/projects/sign-language.png',
      },
    ],
  },
  {
    title: 'Example Client Work',
    suit: '♣',
    projects: [
      {
        name: 'Fieldnote dashboard redesign',
        url: 'https://case.dash.jok3r.win',
        image: '/projects/fieldnote.png',
        description: 'A before-and-after case study: a cluttered task dashboard made calm and readable.',
      },
      {
        name: 'Kiln & Ash',
        url: 'https://pottery.landing.jok3r.win',
        image: '/projects/kiln-and-ash.png',
        description: 'A landing page for weekend pottery workshops.',
      },
    ],
  },
]
