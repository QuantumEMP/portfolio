import { caseStudies } from '~~/app/data/caseStudies'

const siteUrl = 'https://jok3r.win/'

// Built from the case study data so a new page can't be left out; prerendered at build time
export default defineEventHandler((event) => {
  const urls: { loc: string, lastmod?: string }[] = [
    { loc: siteUrl },
    ...caseStudies.map(s => ({ loc: `${siteUrl}work/${s.slug}`, lastmod: s.updated })),
  ]

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`),
    '</urlset>',
    '',
  ].join('\n')
})
