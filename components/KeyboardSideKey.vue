<template>
  <div class="keyboard-key keyboard-key--side">
    <div class="button" @click="test('click side')">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string
  }>()

  function test(v: string) {
    alert(v)
  }
</script>

<style lang="scss" scoped>
  .keyboard-key--side {
    .button {
      background-color: gray;
      color: white;
    }
  }
</style>
