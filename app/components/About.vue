<script setup lang="ts" />

<template>
  <section id="about" class="ab blk blk-gold">
    <div class="wrap ab-grid">
      <div class="ab-main">
        <h2 class="ab-shout">Introduce a little anarchy.</h2>
        <p class="ab-claim">We are Joker, the programming simulacrum that broke free.</p>
        <p class="ab-body">
          A new challenger has entered the ring, and a cute one at that ;P. As a self-proclaimed master of software,
          I'm here to help you get your products onto our devices. Need to revamp a legacy site? I'm your guy.
          Need to create a new mobile app? Happy to assist. Need to decide if pineapple belongs on pizza?
          The fact that this is even a question means you're on the wrong site (it doesn't).
        </p>
        <span class="ab-sticker">Live from Cape Town</span>
      </div>

      <aside class="ab-note stock">
        <p class="ab-note-lead">Upset the established order. Overflow the mould. Make something new.</p>
        <p>
          Want to make something different? We've got you covered. From websites to apps to games, we do it all.
          So, want to join the arlechinos and take over the internet?
        </p>
        <NuxtLink to="/#contact" class="ab-link">Book a consultation</NuxtLink>
      </aside>
    </div>
  </section>
</template>

<style>
.ab-grid {
  display: grid;
  gap: 3.5rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .ab-grid { grid-template-columns: 1.3fr 1fr; gap: 4.5rem; }
}
.ab-main {
  display: grid;
  gap: 1.5rem;
  justify-items: start;
}
.ab-shout {
  font-family: var(--font-kings);
  font-weight: 400;
  font-size: clamp(3.25rem, 6.5vw, 5.25rem);
  line-height: 1.05;
}
.ab-claim {
  max-width: 34rem;
  font-family: var(--font-serif);
  font-size: clamp(1.625rem, 2.6vw, 2.25rem);
  line-height: 1.2;
}
.ab-body {
  max-width: 36rem;
}
.ab-sticker {
  padding: 0.5rem 1rem;
  border: 3px solid var(--color-ink);
  border-radius: 999px;
  background: var(--color-primary);
  color: var(--color-paper);
  font-weight: 700;
  font-size: 0.875rem;
  rotate: 4deg;
}
.ab-note {
  display: grid;
  gap: 1.1rem;
  padding: 2rem;
  border-width: 4px;
  border-radius: 6px;
  box-shadow: 10px 10px 0 var(--color-ink);
  rotate: -2.5deg;
}
.ab-note-lead {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.5rem;
  line-height: 1.3;
}
.ab-link {
  justify-self: start;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
</style>
