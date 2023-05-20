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
  import {
    initialWordLength,
    SettingsChange,
    saveSettingsChange
  } from './repositories/Settings'

  const wordLength = ref(initialWordLength())
  const { data, pending, refresh } = await useDictionary(wordLength)
  const dictionary = computed(() => data.value || [])

  async function switchGame(newWordLength: number) {
    wordLength.value = newWordLength
    await refresh()
    saveWordLength(newWordLength)
  }

  function saveWordLength(wordLength: number) {
    saveSettingsChange({ wordLength } as SettingsChange)
  }
</script>
