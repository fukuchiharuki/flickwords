<template>
  <div class="display">
    <div class="title">jWORDLE - rev.1</div>
    <div class="container">
      <GameBoard />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    text: string
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
    padding: 8px 0;
    border-bottom: 1px solid lightgray;
    text-align: center;
    font-size: large;
    font-family: 'Cabin', sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .container {
    flex: 1;
  }
</style>
