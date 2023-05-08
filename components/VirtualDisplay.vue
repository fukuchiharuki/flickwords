<template>
  <div class="display">text: {{ text }}</div>
</template>

<script setup lang="ts">
  defineProps<{
    text: string
  }>()
</script>

<style lang="scss" scoped>
  //.display {
  //}
</style>
