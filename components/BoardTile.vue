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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    border: 2px solid lightgray;

    &.unused {
      background-color: #e9e9e9;
      border-color: #e9e9e9;
      color: white;
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

      &.vowel {
        background: linear-gradient(
          135deg,
          #c9b458 0%,
          #c9b458 50%,
          #6aaa64 50%,
          #6aaa64 100%
        );
        border-color: #c9b458 #6aaa64 #6aaa64 #c9b458;
      }

      &.consonant {
        background: linear-gradient(
          135deg,
          #6aaa64 0%,
          #6aaa64 50%,
          #c9b458 50%,
          #c9b458 1000%
        );
        border-color: #6aaa64 #c9b458 #c9b458 #6aaa64;
      }
    }

    &.absent {
      color: white;
      background-color: #86888a;
      border-color: #86888a;

      &.vowel {
        background: linear-gradient(
          135deg,
          #86888a 0%,
          #86888a 50%,
          #6aaa64 50%,
          #6aaa64 100%
        );
        border-color: #86888a #6aaa64 #6aaa64 #86888a;
      }

      &.consonant {
        background: linear-gradient(
          135deg,
          #6aaa64 0%,
          #6aaa64 50%,
          #86888a 50%,
          #86888a 100%
        );
        border-color: #6aaa64 #86888a #86888a #6aaa64;
      }
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
