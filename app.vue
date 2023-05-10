<template>
  <div class="app">
    <AppMain v-if="ready" :word-length="wordLength" />
  </div>
</template>

<script setup lang="ts">
  const wordLength = 5
  const { data, ready } = await useDictionary(wordLength)
</script>
