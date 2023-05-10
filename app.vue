<template>
  <div class="app">
    <VirtualConsole>
      <template #display>
        <VirtualDisplay :text="text" />
      </template>
      <template #keyboard>
        <VirtualKeyboard @input="onInput" />
      </template>
    </VirtualConsole>
  </div>
</template>

<script setup lang="ts">
  const { text, input, backspace, newline } = useTextEdit(5)

  function onInput(args: { type: string; value: string }) {
    const { type, value } = args
    if (type === 'kana') input(value)
    if (type === 'func' && value === 'backspace') backspace()
    if (type === 'func' && value === 'enter') newline()
  }
</script>
