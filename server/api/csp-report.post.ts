// Collects Content-Security-Policy-Report-Only violations (see routeRules in
// nuxt.config.ts) so they show up in the server logs before the policy is enforced
export default defineEventHandler(async (event) => {
  const body = await readBody<{ 'csp-report'?: Record<string, unknown> }>(event).catch(() => undefined)
  const report = body?.['csp-report']

  if (report) {
    console.warn('[csp]', JSON.stringify({
      directive: report['violated-directive'],
      blocked: report['blocked-uri'],
      page: report['document-uri'],
    }).slice(0, 500))
  }

  setResponseStatus(event, 204)
  return null
})
