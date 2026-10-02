import type { ISkillSuit } from '~~/types/alters'

// Source copy: copy/skills.md — examples carried over from the old Skills.vue data
export const skillSuits: ISkillSuit[] = [
  {
    category: 'Frontend',
    suit: '♥',
    skills: [
      { name: 'ReactJS' },
      { name: 'VueJS', example: 'https://friendship-census.jude-rose.com' },
      { name: 'NuxtJS / NuxtUI', example: 'https://friendship-census.jude-rose.com' },
      { name: 'NextJS' },
      {
        name: 'WordPress',
        example: 'https://jude-rose.com/blogs',
        children: [
          { name: 'Elementor', example: 'https://gurliepurlie.shop' },
          { name: 'WooStack', example: 'https://gurliepurlie.shop' },
        ],
      },
      { name: 'TailwindCSS', example: '/' },
      { name: 'Storybook' },
      { name: 'Vite' },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
  },
  {
    category: 'Backend',
    suit: '♠',
    skills: [
      { name: 'NodeJS', example: 'https://friendship-census.jude-rose.com' },
      { name: 'JavaScript' },
      { name: 'Java', example: 'https://github.com/QuantumEMP/sudoku' },
      { name: 'Python', example: 'https://github.com/QuantumEMP/UNO' },
      { name: 'FastAPI' },
      { name: 'SpringBoot' },
      { name: 'PHP', example: 'https://gurliepurlie.shop' },
      { name: 'Firebase' },
      { name: 'ExpressJS' },
    ],
  },
  {
    category: 'Data Engineering',
    suit: '♦',
    skills: [
      { name: 'SQL', example: 'https://friendship-census.jude-rose.com' },
      { name: 'Relational Databases' },
      { name: 'Non-Relational Databases' },
      { name: 'MongoDB' },
      { name: 'PostgreSQL' },
      { name: 'D1 Database' },
      { name: 'Azure' },
      { name: 'R2 Blob Storage' },
    ],
  },
  {
    category: 'Animation',
    suit: '♣',
    skills: [
      { name: 'Lottie' },
      { name: 'GSAP', example: '/' },
    ],
  },
  {
    category: 'Hosting',
    suit: '♠',
    skills: [
      { name: 'Docker' },
      { name: 'Cloudflare' },
      { name: 'Vercel' },
    ],
  },
  {
    category: 'Core',
    suit: '♥',
    skills: [
      { name: 'Git' },
      { name: 'Agile Methodology' },
      { name: 'Time Management' },
      { name: 'Project Management' },
      { name: 'Corporate Experience' },
    ],
  },
]
