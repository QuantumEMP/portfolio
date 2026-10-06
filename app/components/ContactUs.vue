<script setup lang="ts">
import { contact } from '~/data/contact'

const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  message: '',
  company: '', // honeypot
})

const status = ref<'idle' | 'sending' | 'sent'>('idle')

const onSubmit = async () => {
  status.value = 'sending'
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    status.value = 'sent'
    Object.assign(form, { name: '', email: '', message: '', company: '' })
    toast.add({
      title: 'Message sent',
      description: 'Thanks for reaching out — we\'ll get back to you soon.',
      icon: 'i-lucide-circle-check',
      color: 'success',
    })
  }
  catch (error) {
    status.value = 'idle'
    const reason = (error as { statusMessage?: string }).statusMessage
    toast.add({
      title: 'Message not sent',
      description: `${reason ?? 'Something went wrong.'} You can email us directly at ${contact.email}.`,
      icon: 'i-lucide-circle-x',
      color: 'error',
      duration: 10000,
    })
  }
}
</script>

<template>
  <section id="contact" class="tk blk blk-primary">
    <div class="wrap tk-grid">
      <div class="tk-info">
        <h2 class="tk-title">Deal me in</h2>
        <p class="sec-sub">Book a consultation and commission a dream come true.</p>
        <p>
          Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          Whether you have a question or just want to say hi, reach out.
        </p>
        <ul class="tk-facts">
          <li><a :href="`mailto:${contact.email}`" class="tk-mail">{{ contact.email }}</a></li>
          <li>{{ contact.location }}</li>
        </ul>
        <div class="tk-socials">
          <a
            v-for="social in contact.socials"
            :key="social.label"
            :href="social.to"
            target="_blank"
            rel="noopener"
            class="btn"
          >
            <UIcon :name="social.icon" class="size-4" />
            {{ social.label }}
          </a>
        </div>
      </div>

      <!-- Admit-one ticket: form on the body, stub behind the perforation -->
      <div class="tk-ticket">
        <div v-if="status === 'sent'" class="tk-body tk-sent" role="status">
          <h3 class="tk-sent-title">Your hand has been dealt.</h3>
          <p>Message received. We'll be in touch soon.</p>
          <button type="button" class="btn" @click="status = 'idle'">Send another</button>
        </div>

        <form v-else class="tk-body" @submit.prevent="onSubmit">
          <!-- Honeypot: hidden from people, bots fill it in -->
          <input
            v-model="form.company"
            class="tk-hp"
            type="text"
            name="company"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          >
          <label class="tk-field">
            <span>Name</span>
            <input v-model="form.name" name="name" placeholder="Jude Rose" maxlength="100" autocomplete="name" required>
          </label>
          <label class="tk-field">
            <span>Email</span>
            <input v-model="form.email" type="email" name="email" placeholder="hello@example.com" autocomplete="email" required>
          </label>
          <label class="tk-field">
            <span>Message</span>
            <textarea v-model="form.message" name="message" placeholder="Tell us about the dream..." rows="5" maxlength="5000" required />
          </label>
          <button type="submit" class="btn btn-gold tk-send" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending...' : 'Send message' }}
          </button>
        </form>

        <div class="tk-stub" aria-hidden="true">Admit one</div>
      </div>
    </div>
  </section>
</template>

<style>
.tk-grid {
  display: grid;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .tk-grid { grid-template-columns: 1fr 1.45fr; gap: 4rem; }
}
.tk-info {
  display: grid;
  gap: 1.25rem;
  justify-items: start;
}
.tk-title {
  font-family: var(--font-kings);
  font-weight: 400;
  font-size: clamp(4rem, 8vw, 6rem);
  line-height: 1;
}
.tk-info > .sec-sub { margin-top: -0.5rem; }
.tk-facts { display: grid; gap: 0.25rem; }
.tk-mail {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
.tk-socials { display: flex; flex-wrap: wrap; gap: 0.75rem; }

/* ── The ticket ── */
.tk-ticket {
  --notch: 1.4rem;
  position: relative;
  display: grid;
  border: 4px solid var(--color-ink);
  border-radius: 1rem;
  background: var(--color-paper);
  color: var(--color-ink);
  box-shadow: 10px 10px 0 var(--color-ink);
}
/* Notches punched out at both ends of the perforation */
.tk-ticket::before,
.tk-ticket::after {
  content: "";
  position: absolute;
  width: calc(var(--notch) * 2);
  height: calc(var(--notch) * 2);
  border: 4px solid var(--color-ink);
  border-radius: 50%;
  background: var(--blk-bg);
}
.tk-body {
  display: grid;
  gap: 1rem;
  padding: 1.75rem 1.5rem;
}
.tk-stub {
  display: grid;
  place-items: center;
  padding: 1rem;
  border-top: 3px dashed var(--color-ink);
  font-family: var(--font-kings);
  font-size: 2.75rem;
  line-height: 1;
  color: var(--color-primary);
}
/* Mobile: stub along the bottom, notches on the left and right */
.tk-ticket::before { left: calc(var(--notch) * -1 - 4px); bottom: calc(5rem - var(--notch)); }
.tk-ticket::after  { right: calc(var(--notch) * -1 - 4px); bottom: calc(5rem - var(--notch)); }
.tk-stub { height: 5rem; }

/* Desktop: stub on the right, notches top and bottom */
@media (min-width: 1024px) {
  .tk-ticket { grid-template-columns: 1fr 9rem; }
  .tk-body { padding: 2.25rem 2.5rem; }
  .tk-stub {
    height: auto;
    border-top: 0;
    border-left: 3px dashed var(--color-ink);
    writing-mode: vertical-rl;
    font-size: 3.25rem;
  }
  .tk-ticket::before { left: auto; right: calc(9rem - var(--notch) - 2px); top: calc(var(--notch) * -1 - 4px); bottom: auto; }
  .tk-ticket::after  { right: calc(9rem - var(--notch) - 2px); bottom: calc(var(--notch) * -1 - 4px); }
}

.tk-field {
  display: grid;
  gap: 0.35rem;
  font-weight: 700;
  font-size: 0.875rem;
}
.tk-field input,
.tk-field textarea {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 2.5px solid var(--color-ink);
  border-radius: 0.6rem;
  background: var(--color-paper);
  color: var(--color-ink);
  font-weight: 400;
  font-size: 1rem;
}
.tk-field input::placeholder,
.tk-field textarea::placeholder { color: color-mix(in srgb, var(--color-ink) 60%, var(--color-paper)); }
.tk-field input:focus-visible,
.tk-field textarea:focus-visible { outline-offset: 1px; }
.tk-send { justify-self: start; --blk-drop: var(--color-ink); }
.tk-hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.tk-sent {
  justify-items: start;
  align-content: center;
  min-height: 20rem;
}
.tk-sent-title {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 2rem;
}
</style>
