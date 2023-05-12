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
      unused: char.unused
    }"
  >
    <div class="char">{{ char.value }}</div>
  </div>
</template>

<script setup lang="ts">
  import { Char } from '../composables/useGameBoard'

  defineProps<{
    char: Char
  }>()
</script>

<style lang="scss" scoped>
  .tile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    border: 2px solid lightgray;

    &.unused {
      background-color: darkgray;
      border-color: darkgray;
      color: white;

      .char::before {
        content: '－';
      }
    }

    &.correct {
      color: white;
      background-color: #6aaa64;
      border-color: #6aaa64;
    }

    &.present {
      color: white;
      background-color: #c9b458;
      border-color: #c9b458;
    }

    &.absent {
      color: white;
      background-color: #86888a;
      border-color: #86888a;
    }

    &.vowel {
      border-bottom-right-radius: 25%;
    }

    .char {
      text-align: center;
      font-weight: bold;
      font-size: medium;
    }

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
