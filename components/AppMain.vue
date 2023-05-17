import useGameMaster from '../composables/useGameMaster';
<template>
  <VirtualConsole>
    <template #display>
      <VirtualDisplay :answer="answer" />
    </template>
    <template #keyboard>
      <VirtualKeyboard @input="onInput" />
    </template>
  </VirtualConsole>
  <ResultView
    v-if="resultOnDisplay"
    :word-length="wordLength"
    :result="result"
    @close="resultOnDisplay = false"
  />
</template>

<script setup lang="ts">
  const props = defineProps<{
    wordLength: number
    dictionary: string[]
  }>()

  const { wordLength, dictionary } = toRefs(props)
  const { text, input, backspace } = useTextEdit(wordLength)
  const { answer, shake, compare, reset } = useGameBoard(wordLength, text)
  const { resultOnDisplay, result, keepScore, restoreScore } = useGameScorer()
  const { keyLock, enter } = useGameMaster(
    wordLength,
    dictionary,
    text,
    shake,
    compare,
    reset,
    keepScore,
    restoreScore
  )

  function onInput(args: { type: string; value: string }) {
    const { type, value } = args
    if (type === 'kana') !keyLock.value && input(value)
    if (type === 'func' && value === 'backspace') !keyLock.value && backspace()
    if (type === 'func' && value === 'enter') !keyLock.value && enter()
  }
</script>
