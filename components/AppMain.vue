<template>
  <VirtualConsole>
    <template #display>
      <VirtualDisplay :answer="answer" />
    </template>
    <template #keyboard>
      <VirtualKeyboard @input="onInput" />
    </template>
  </VirtualConsole>
</template>

<script setup lang="ts">
  const props = defineProps<{
    wordLength: number
    dictionary: string[]
  }>()

  const { text, input, backspace } = useTextEdit(props.wordLength)
  const { answer, enter } = useGameBoard(props.wordLength, text)

  function onInput(args: { type: string; value: string }) {
    const { type, value } = args
    if (type === 'kana') input(value)
    if (type === 'func' && value === 'backspace') backspace()
    if (type === 'func' && value === 'enter') enter()
  }
</script>
