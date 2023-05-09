<template>
  <div class="display">
    <div class="title">Flick Input - ja</div>
    <div class="text">{{ text }}<span class="cursor">|</span></div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    text: string
  }>()
</script>

<style lang="scss" scoped>
  .title {
    padding: 8px 0;
    text-align: center;
    font-size: large;
    border-bottom: 1px solid lightgray;
  }

  .text {
    white-space: pre-line;
  }

  .cursor {
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    51% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
</style>
