<script setup lang="ts">
const { toasts, remove } = useToast()
</script>

<template>
  <!-- Always in the DOM, so screen readers hear toasts as they're added -->
  <div class="toasts" role="status" aria-live="polite">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :class="toast.color && `toast--${toast.color}`"
    >
      <Icon v-if="toast.icon" :name="toast.icon" class="toast-icon" aria-hidden="true" />
      <div class="toast-text">
        <p class="toast-title">{{ toast.title }}</p>
        <p v-if="toast.description">{{ toast.description }}</p>
      </div>
      <button type="button" class="toast-close" aria-label="Dismiss" @click="remove(toast.id)">×</button>
    </div>
  </div>
</template>

<style>
.toasts {
  position: fixed;
  z-index: 10000;
  right: 1rem;
  bottom: 1rem;
  display: grid;
  gap: 0.75rem;
  width: min(24rem, calc(100vw - 2rem));
}
.toast {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  border: 3px solid var(--color-ink);
  border-radius: 0.75rem;
  background: var(--color-paper);
  color: var(--color-ink);
  box-shadow: 6px 6px 0 var(--color-ink);
  font-size: 0.9375rem;
  line-height: 1.45;
}
.toast-icon { flex: none; width: 1.25rem; height: 1.25rem; margin-top: 0.1rem; }
.toast--success .toast-icon { color: #15803d; }
.toast--error .toast-icon { color: #b91c1c; }
.toast-text { flex: 1; }
.toast-title { font-weight: 700; }
.toast-close {
  flex: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}
</style>
