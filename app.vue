<template>
  <div class="app">
    <AppMain v-if="ready" />
  </div>
</template>

<script setup lang="ts">
  const { data, ready } = await useDictionary()
</script>
