import type { ICaseStudy } from '~~/types/alters'

// Each one gets a page at /work/<slug> and a sitemap entry (server/routes/sitemap.xml.ts).
// Link it from data/projects.ts with caseStudy, add a 1200×630 link preview at
// public/og/<slug>.jpg, and bump updated whenever the copy changes
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
    updated: '2026-10-22',
    sections: [
      {
        heading: 'Fieldnote, a dashboard to end all dashboards.',
        paragraphs: [
          'Ever wondered why your dashboard doesn\'t have that "wow factor" you\'ve been looking for? Well, I know the answer to that :)',
          'This example focuses on what visual changes you can bring into your dashboard to improve the user experience. Whether that is externally to users or internally with your team, we know how to better your look and feel.',
          'Even if you can\'t put your finger on what\'s missing, we know what you mean and are happy to help',
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
    updated: '2026-10-22',
    sections: [
      {
        paragraphs: [
          'When looking for new bookings to your project, the place you drop your users is the first impression that they have. This look is even more important than your service itself!',
          'Kiln and Ash is a pottery studio that focuses heavily on booking from online sources and for that reason, their landing page needed to give that same free feeling that their service provides.',
          'From colour schemes to animations, we mould every site to your requirements.',
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
    updated: '2026-10-22',
    sections: [
      {
        paragraphs: [
          'South African Sign Language is set to become the 12th official language of South Africa and yet -- deaf people still don\'t have adequite accessiblity out in the world.',
          'This translator is the beginning of a brighter future for our deaf communities in our country. Starting as a simple translator to interest others in learning the language, the ambitious plan is a "universal translator" for deaf people to see signs when others speak',
          'From translation to video compilation, databases and data engineering is our speciality.',
        ],
      },
    ],
  },
]
