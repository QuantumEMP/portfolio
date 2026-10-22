import type { ICaseStudy } from '~~/types/alters'

// Each one gets a page at /work/<slug>; link it from data/projects.ts with caseStudy
// and add its URL to public/sitemap.xml
export const caseStudies: ICaseStudy[] = [
  {
    slug: 'fieldnote',
    name: 'Fieldnote dashboard redesign',
    suit: '♣',
    kicker: 'Example client work · Dashboard redesign',
    summary: 'A before-and-after case study: a cluttered internal task dashboard rebuilt around clear hierarchy, calm colour and one accent used with intent.',
    image: '/projects/fieldnote.webp',
    imageAlt: 'The Fieldnote case study, with a before-and-after slider over the sidebar navigation',
    url: 'https://case.dash.jok3r.win',
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Fieldnote is an example project: the kind of internal task tool teams live in all day and quietly put up with. The before state is deliberately familiar, with ALL-CAPS labels, stray punctuation shouting for attention and a different background on every menu item.',
          'The goal was to make it calm and readable without losing anything people rely on.',
        ],
      },
      {
        heading: 'What changed',
        points: [
          'One calm label per item instead of ALL-CAPS and "TASKS!!".',
          'A single active-state colour, the palette accent, replaces inconsistent per-item backgrounds.',
          'Real product branding anchors the navigation instead of a bare list.',
          'The redesign holds up across all four suit palettes, from dark Spade to light Diamond.',
        ],
      },
      {
        heading: 'How to read it',
        paragraphs: [
          'Each part of the case study has a before-and-after slider. Drag it to compare, then switch suits to see the redesign hold up in every palette.',
        ],
      },
    ],
  },
  {
    slug: 'kiln-and-ash',
    name: 'Kiln & Ash',
    suit: '♣',
    kicker: 'Example client work · Landing page',
    summary: 'A landing page for weekend pottery workshops: warm, unhurried, and built to turn a curious visitor into a booked seat.',
    image: '/projects/kiln-and-ash.webp',
    imageAlt: 'The Kiln & Ash landing page: "Learn to throw clay in one unhurried weekend."',
    url: 'https://pottery.landing.jok3r.win',
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Kiln & Ash is an example studio running weekend wheel-throwing workshops, capped at six seats and taught by professional potters. The page has one job: get a visitor from curious to booked.',
        ],
      },
      {
        heading: 'What\'s on the page',
        points: [
          'A headline that sells the feeling ("Learn to throw clay in one unhurried weekend.") before the logistics.',
          'One primary action, Reserve a wheel, in both the header and the hero, with a quieter link to the month\'s sessions.',
          'An earthy palette of clay, ash and cream with a serif headline, so the page feels handmade rather than templated.',
          'A simple wheel illustration instead of a heavy stock photo.',
        ],
      },
    ],
  },
  {
    slug: 'sign-language-translator',
    name: 'English to South African Sign Language Translator',
    suit: '♦',
    kicker: 'Special project · Accessibility',
    summary: 'A web tool that translates English text into South African Sign Language (SASL), built as SASL became South Africa\'s 12th official language.',
    image: '/projects/sign-language.webp',
    imageAlt: 'The Sign Language Translator home page, with Get started and Learn more buttons',
    repo: 'https://github.com/QuantumEMP/sign-language-web',
    sections: [
      {
        heading: 'Why it exists',
        paragraphs: [
          'South African Sign Language became the country\'s 12th official language, yet most hearing South Africans can\'t sign a word of it. This translator is a small bridge across that gap: type English, see it in SASL.',
        ],
      },
      {
        heading: 'How it works',
        paragraphs: [
          'Type a sentence in English and the translator shows it in SASL. The Learn more guide is recommended before you start, since SASL has its own grammar rather than following English word for word.',
        ],
      },
    ],
  },
]
