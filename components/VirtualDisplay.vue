<template>
  <div class="display">
    <h1 class="title">FLICKWORDS</h1>
    <div class="container">
      <GameBoard :answer="answer" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Answer } from '~/repositories/Answer'

  defineProps<{
    answer: Answer
  }>()
</script>

<style lang="scss" scoped>
  .display {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .title {
    margin: 0;
    padding: 8px 0;
    border-bottom: 1px solid lightgray;
    text-align: center;
    font-size: large;
    font-family: 'Cabin', sans-serif;
    font-weight: bold;
    letter-spacing: 2px;

    sup {
      font-size: x-small;
    }
  }

  .container {
    flex: 1;
  }
</style>
