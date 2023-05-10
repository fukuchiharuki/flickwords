<template>
  <div class="app">
    <VirtualConsole>
      <template #display>
        <VirtualDisplay :answer="answer" />
      </template>
      <template #keyboard>
        <VirtualKeyboard @input="onInput" />
      </template>
    </VirtualConsole>
  </div>
</template>

<script setup lang="ts">
  const { text, input, backspace } = useTextEdit(5)
  const { answer, enter } = useGameBoard(text)

  function onInput(args: { type: string; value: string }) {
    const { type, value } = args
    if (type === 'kana') input(value)
    if (type === 'func' && value === 'backspace') backspace()
    if (type === 'func' && value === 'enter') enter()
  }
</script>
