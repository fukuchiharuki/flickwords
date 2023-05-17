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
  <MenuView
    v-if="menuOnDisplay"
    :word-length="wordLength"
    @switch="$emit('switch', $event)"
    @close="menuOnDisplay = false"
  />
</template>

<script setup lang="ts">
  const props = defineProps<{
    wordLength: number
    dictionary: string[]
  }>()

  defineEmits<{
    (e: 'switch', wordLength: number): void
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

  const menuOnDisplay = ref(false)

  function onInput(args: { type: string; value: string }) {
    const { type, value } = args
    if (type === 'kana') !keyLock.value && input(value)
    if (type === 'func' && value === 'backspace') !keyLock.value && backspace()
    if (type === 'func' && value === 'enter') !keyLock.value && enter()
    if (type === 'func' && value === 'menu') {
      menuOnDisplay.value = true
    }
  }
</script>
