<template>
  <div>
    <VirtualConsole>
      <template #display>
        <VirtualDisplay />
      </template>
      <template #keyboard>
        <VirtualKeyboard @input="onInput" />
      </template>
    </VirtualConsole>
  </div>
</template>

<script setup lang="ts">
  function onInput(args: { type: string; value: string }) {
    const { type, value } = args
    console.log(type, value)
  }
</script>
