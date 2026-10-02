interface ContactBody {
  name?: unknown
  email?: unknown
  message?: unknown
  /** Honeypot — hidden from people, filled in by bots */
  company?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  // Bots get a fake success so they don't retry
  if (clean(body?.company, 200)) return { ok: true }

  const name = clean(body?.name, 100).replace(/[\r\n]+/g, ' ')
  const email = clean(body?.email, 200)
  const message = clean(body?.message, 5000)

  if (!name || !message || !EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please fill in your name, a valid email and a message.' })
  }

  const { resendApiKey, contactTo, contactFrom } = useRuntimeConfig(event)

  if (!resendApiKey) {
    console.error('[contact] NUXT_RESEND_API_KEY is not set — cannot send email')
    throw createError({ statusCode: 503, statusMessage: 'Email is not configured on the server.' })
  }

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}` },
      body: {
        from: contactFrom,
        to: [contactTo],
        reply_to: email,
        subject: `Consultation request from ${name}`,
        text: `${message}\n\n— ${name} (${email})`,
      },
    })
  }
  catch (error) {
    console.error('[contact] Resend rejected the email', error)
    throw createError({ statusCode: 502, statusMessage: 'The email service failed to send your message.' })
  }

  return { ok: true }
})
