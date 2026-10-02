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
  <section id="contact" class="cu">
    <UContainer>
      <SectionHeading
        eyebrow="Contact Us"
        suit="♦"
        title="Ready to deal?"
        subtitle="Book a consultation and commission a dream come true."
      />

      <div class="cu-grid">
        <div class="cu-info">
          <p class="cu-lead">
            Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            Whether you have a question or just want to say hi, reach out.
          </p>

          <ul class="cu-list">
            <li>
              <UIcon name="i-lucide-mail" class="cu-icon" />
              <ULink :to="`mailto:${contact.email}`" class="cu-link">{{ contact.email }}</ULink>
            </li>
            <li>
              <UIcon name="i-lucide-map-pin" class="cu-icon" />
              <span>{{ contact.location }}</span>
            </li>
          </ul>

          <div class="flex gap-2">
            <UButton
              v-for="social in contact.socials"
              :key="social.label"
              :to="social.to"
              :icon="social.icon"
              :label="social.label"
              target="_blank"
              color="neutral"
              variant="outline"
            />
          </div>

          <img class="cu-cards" src="/backgrounds/Aces.png" alt="" width="634" height="886" loading="lazy">
        </div>

        <div v-if="status === 'sent'" class="cu-form cu-sent" role="status">
          <UIcon name="i-lucide-circle-check" class="size-10 text-success" />
          <h3 class="cu-sent-title">Your hand has been dealt.</h3>
          <p class="text-muted">Message received. We'll be in touch soon.</p>
          <UButton label="Send another" color="neutral" variant="outline" @click="status = 'idle'" />
        </div>

        <form v-else class="cu-form" @submit.prevent="onSubmit">
          <!-- Honeypot: hidden from people, bots fill it in -->
          <input
            v-model="form.company"
            class="cu-hp"
            type="text"
            name="company"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          >
          <UFormField label="Name" name="name" required>
            <UInput v-model="form.name" placeholder="Jude Rose" class="w-full" maxlength="100" required />
          </UFormField>
          <UFormField label="Email" name="email" required>
            <UInput v-model="form.email" type="email" placeholder="hello@example.com" class="w-full" required />
          </UFormField>
          <UFormField label="Message" name="message" required>
            <UTextarea
              v-model="form.message"
              placeholder="Tell us about the dream..."
              :rows="6"
              class="w-full"
              maxlength="5000"
              required
            />
          </UFormField>
          <UButton
            type="submit"
            :label="status === 'sending' ? 'Sending...' : 'Send message'"
            :loading="status === 'sending'"
            trailing-icon="i-lucide-send"
            size="lg"
            block
          />
        </form>
      </div>
    </UContainer>
  </section>
</template>

<style>
.cu {
  padding: 6rem 0;
}
.cu-grid {
  display: grid;
  gap: 3rem;
}
@media (min-width: 1024px) {
  .cu-grid { grid-template-columns: 1fr 1fr; gap: 5rem; }
}
.cu-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.cu-lead {
  line-height: 1.75;
  color: var(--ui-text-muted);
}
.cu-list {
  display: grid;
  gap: 1rem;
}
.cu-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text);
}
.cu-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-accent);
}
.cu-link:hover {
  color: var(--color-accent);
}
.cu-cards {
  display: none;
  width: 14rem;
  rotate: -10deg;
  margin-top: auto;
  filter: drop-shadow(0 24px 32px rgb(0 0 0 / 0.5));
}
@media (min-width: 1024px) {
  .cu-cards { display: block; }
}
.cu-form {
  display: grid;
  gap: 1.25rem;
  align-self: start;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: var(--color-card);
}
.cu-hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.cu-sent {
  justify-items: center;
  text-align: center;
  padding: 3rem 2rem;
}
.cu-sent-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text);
}
</style>
