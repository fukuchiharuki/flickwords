<template>
  <div class="app">
    <AppMain
      v-if="dictionary.length"
      :word-length="wordLength"
      :dictionary="dictionary"
    />
  </div>
</template>

<script setup lang="ts">
  const wordLength = 5
  const { data } = await useDictionary(wordLength)
  const dictionary = computed(() => data.value || [])
</script>
