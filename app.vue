<template>
  <div class="app">
    <AppMain
      v-if="ready"
      :word-length="wordLength"
      :dictionary="dictionary"
      @switch="switchGame"
    />
    <LoadingSign v-if="!ready" />
  </div>
</template>

<script setup lang="ts">
  import 'animate.css'
  import {
    initialWordLength,
    ProfileChange,
    saveProfileChange
  } from './repositories/Profile'

  const wordLength = ref(initialWordLength())
  const { data, pending, refresh } = await useDictionary(wordLength)
  const dictionary = computed(() => data.value || [])

  const ready = computed(() => !pending.value && dictionary.value.length)

  async function switchGame(newWordLength: number) {
    wordLength.value = newWordLength
    await refresh()
    saveWordLength(newWordLength)
  }

  function saveWordLength(wordLength: number) {
    saveProfileChange({ wordLength } as ProfileChange)
  }
</script>
