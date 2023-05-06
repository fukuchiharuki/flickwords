<template>
  <div>
    <button @click="test('click test')">test</button>
  </div>
</template>

<script setup lang="ts">
  function test(v: string) {
    alert(v)
  }
</script>
