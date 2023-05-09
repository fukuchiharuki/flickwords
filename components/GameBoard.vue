<template>
  <div class="game-wrapper">
    <div class="game-board">
      <div class="word-row">
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
      </div>
      <div class="word-row">
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
      </div>
      <div class="word-row">
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
      </div>
      <div class="word-row">
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
      </div>
      <div class="word-row">
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
      </div>
      <div class="word-row">
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
        <div class="word-col"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
      justify-content: space-around;
    }
  }

  .word-row {
    & + .word-row {
      margin-top: 4px;
    }

    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .word-col {
      & + .word-col {
        margin-left: 4px;
      }

      flex: 1;
      height: 100%;
      box-sizing: border-box;
      border: 2px solid lightgray;
    }
  }
</style>
