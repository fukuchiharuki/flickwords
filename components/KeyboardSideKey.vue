<template>
  <div class="keyboard-key keyboard-key--side">
    <button @click="$emit('click')">{{ label }}</button>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string
  }>()

  defineEmits<{
    (e: 'click'): void
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
