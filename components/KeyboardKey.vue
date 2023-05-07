<template>
  <div class="keyboard-key">
    <button
      @touchstart.prevent="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onTouchEnd"
    >
      {{ label }}
    </button>
    <KeyCandidates :options="options" :input="input" :operating="operating" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label: string
    options: (string | null)[]
  }>()

  const emit = defineEmits<{
    (e: 'input', value: string | null): void
  }>()

  const { input, operating, onTouchStart, onTouchMove, onTouchEnd } =
    useFlickInput(props.options, onInput)

  function onInput(input: string | null) {
    input && emit('input', input)
  }
</script>

<style lang="scss" scoped>
  .keyboard-key {
    position: relative;

    button {
      background-color: white;
      color: #333333;
    }
  }
</style>
