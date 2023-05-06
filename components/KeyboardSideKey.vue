<template>
  <div class="keyboard-key keyboard-key--side">
    <button>{{ label }}</button>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string
  }>()
</script>

<style lang="scss" scoped>
  .keyboard-key--side {
    button {
      background-color: gray;
      color: white;
    }
  }
</style>
