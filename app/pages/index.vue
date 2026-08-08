<script setup lang="ts">
import About from "~/components/About.vue";
import Alter from "~/components/Alter.vue";
import ContactUs from "~/components/ContactUs.vue";
import HeroAnimationVue from "~/components/HeroAnimation.vue";
import Projects from "~/components/Projects.vue";
import SectionSplit from "~/components/SectionSplit.vue";
import Skills from "~/components/Skills.vue";
import CurtainAnimation from "~/components/CurtainAnimation.vue";
</script>

<template>
  <CurtainAnimation />
  <HeroAnimationVue />
  <SectionSplit />
  <About />
  <SectionSplit />
  <Alter />
  <SectionSplit />
  <Skills />
  <SectionSplit />
  <Projects />
  <SectionSplit />
  <ContactUs />
</template>
