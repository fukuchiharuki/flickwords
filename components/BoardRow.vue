<template>
  <div class="board-row">
    <BoardCol
      v-for="(char, charIndex) in word.chars"
      :key="charIndex"
      :char="char"
    />
  </div>
</template>

<script setup lang="ts">
  import { Word } from '../composables/useGameBoard'

  defineProps<{
    word: Word
  }>()
</script>

<style lang="scss" scoped>
  .board-row {
    & + .board-row {
      margin-top: 4px;
    }

    flex: 1;
    display: flex;
    flex-direction: row;
  }
</style>
