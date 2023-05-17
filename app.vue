<template>
  <div class="app">
    <AppMain
      v-if="!pending && dictionary.length"
      :word-length="wordLength"
      :dictionary="dictionary"
      @switch="switchGame"
    />
  </div>
</template>

<script setup lang="ts">
  import 'animate.css'

  const wordLength = ref(5)
  const { data, pending, refresh } = await useDictionary(wordLength)
  const dictionary = computed(() => data.value || [])

  async function switchGame(nextWordLength: number) {
    wordLength.value = nextWordLength
    await refresh()
  }
</script>
