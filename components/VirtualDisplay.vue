<template>
  <div class="display" @click="test('click display')">Display</div>
</template>

<script setup lang="ts">
  function test(v: string) {
    alert(v)
  }
</script>

<style lang="scss" scoped>
  //.display {
  //}
</style>
