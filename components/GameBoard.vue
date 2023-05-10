<template>
  <div class="game-wrapper">
    <div class="game-board">
      <div
        v-for="(word, wordIndex) in answer.words"
        :key="wordIndex"
        class="word-row"
      >
        <div
          v-for="(char, charIndex) in word.chars"
          :key="charIndex"
          class="word-col"
        >
          <div class="tile">
            <div class="char">
              {{ char.value }}
            </div>
          </div>
        </div>
      </div>
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

  .word-row {
    & + .word-row {
      margin-top: 4px;
    }

    flex: 1;
    display: flex;
    flex-direction: row;

    .word-col {
      & + .word-col {
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
  }
</style>
