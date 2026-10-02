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
      { name: 'Dashboard Example', description: 'Coming soon.' },
    ],
  },
]
