<template>
  <div class="game-wrapper">
    <div class="game-board">
      <BoardRow
        v-for="(word, wordIndex) in answer.words"
        :key="wordIndex"
        :word="word"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Answer } from '../composables/useGameBoard'

  defineProps<{
    answer: Answer
  }>()
</script>

<style lang="scss" scoped>
  .game-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .game-board {
      aspect-ratio: 316 / 380;
      width: auto;
      max-width: calc(100% - 4px);
      height: min(380px, calc(100% - 8px));
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
  }
</style>
