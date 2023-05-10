<template>
  <div class="board-col">
    <BoardTile :char="char" />
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
</style>
