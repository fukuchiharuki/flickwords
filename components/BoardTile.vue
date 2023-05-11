<template>
  <div
    class="tile animate__animated"
    :class="{
      animate__bounceIn: char.value,
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

    .char {
      text-align: center;
      font-weight: bold;
      font-size: medium;
    }

    &.animate__bounceIn {
      --animate-duration: 0.2s;
    }
  }
</style>
