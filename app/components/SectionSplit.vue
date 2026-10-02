<script setup lang="ts" />

<template>
  <div class="section-split" role="separator">
    <span class="suit-black">♠</span>
    <span class="suit-red">♥</span>
    <span class="suit-black">♣</span>
    <span class="suit-red">♦</span>
  </div>
</template>

<style>
.section-split {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  max-width: 80rem;
  padding: 0 1rem;
  font-size: 0.875rem;
}
.section-split::before,
.section-split::after {
  content: "";
  flex: 1;
  border-top: 1px solid var(--color-border);
}
</style>
