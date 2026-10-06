<script setup lang="ts">
// Arlecchino diamonds: rows alternate between the suit colour and ink,
// so neighbouring diamonds never share a colour
withDefaults(defineProps<{ size?: number }>(), { size: 46 })

const id = useId()
</script>

<template>
  <svg class="harlequin" aria-hidden="true">
    <defs>
      <pattern :id="id" :width="size" :height="size * 1.4" patternUnits="userSpaceOnUse">
        <rect :width="size" :height="size * 1.4" fill="var(--color-ink)" />
        <path
          fill="var(--color-primary)"
          :d="`M${size / 2} 0 L${size} ${size * 0.7} L${size / 2} ${size * 1.4} L0 ${size * 0.7} Z`"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
  </svg>
</template>

<style>
.harlequin {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
