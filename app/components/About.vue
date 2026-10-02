<script setup lang="ts" />

<template>
  <section id="about" class="ab">
    <UContainer>
      <SectionHeading eyebrow="About us" suit="♣" />

      <div class="ab-grid">
        <blockquote class="ab-quote">
          "Introduce a little anarchy. Upset the established order. Overflow the mould.
          <span class="ab-quote-accent">Make something new.</span>"
        </blockquote>

        <div class="ab-body">
          <p>
            We are <strong>Joker</strong>, the programming simulacrum that broke free.
            Want to make something different? We've got you covered. From websites to apps to games, we do it all.
          </p>
          <p>
            A new challenger has entered the ring, and a cute one at that ;P. As a self-proclaimed master of software,
            I'm here to help you get your products onto our devices. Need to revamp a legacy site? I'm your guy.
            Need to create a new mobile app? Happy to assist. Need to decide if pineapple belongs on pizza?
            The fact that this is even a question means you're on the wrong site (it doesn't).
          </p>
          <p>
            So, want to join the arlechinos and take over the internet?
            <ULink to="/#contact" class="ab-link">Book a consultation</ULink>
            and commission a dream come true.
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style>
.ab {
  padding: 6rem 0;
}
.ab-grid {
  display: grid;
  gap: 3rem;
}
@media (min-width: 1024px) {
  .ab-grid { grid-template-columns: 1fr 1fr; gap: 5rem; }
}
.ab-quote {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  line-height: 1.25;
  color: var(--color-accent-soft);
  border-left: 3px solid var(--color-accent);
  padding-left: 1.5rem;
}
.ab-quote-accent {
  font-style: italic;
  color: var(--color-accent);
}
.ab-body {
  display: grid;
  gap: 1.25rem;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--ui-text-muted);
}
.ab-body strong {
  color: var(--color-text);
}
.ab-link {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ab-link:hover {
  color: var(--color-accent-soft);
}
</style>
