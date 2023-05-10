<template>
  <div class="board-col">
    <div class="tile">
      <div class="char">
        {{ char.value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Char } from '../composables/useGameBoard'

  defineProps<{
    char: Char
  }>()
</script>

<style lang="scss" scoped>
  .board-col {
    & + .board-col {
      margin-left: 4px;
    }

    flex: 1;
    height: 100%;
  }
  .tile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    border: 2px solid lightgray;

    .char {
      text-align: center;
      font-weight: bold;
      font-size: large;
    }
  }
</style>
