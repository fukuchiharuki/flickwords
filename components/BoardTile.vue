<template>
  <div
    class="tile animate__animated"
    :class="{
      animate__bounceIn: char.value && !char.result.length,
      animate__flipInX: char.result.length,
      correct: char.result.includes('correct'),
      present: char.result.includes('present'),
      absent: char.result.includes('absent'),
      vowel: char.result.includes('vowel'),
      consonant: char.result.includes('consonant'),
      unused: char.unused
    }"
  >
    <div class="char">{{ char.value }}</div>
  </div>
</template>

<script setup lang="ts">
  import { Char } from '~/repositories/Answer'

  defineProps<{
    char: Char
  }>()
</script>

<style lang="scss" scoped>
  .tile {
    &.animate__animated {
      opacity: 1 !important;
    }

    &.animate__bounceIn {
      --animate-duration: 0.2s;
      border-color: #86888a;
    }

    &.animate__flipInX {
      --animate-duration: 0.8s;
    }
  }
</style>
