<template>
  <div class="keyboard-key">
    <button
      :class="{ small: label.length > 1 }"
      @touchstart.prevent="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onTouchEnd"
      @click="onClick"
    >
      {{ label }}
    </button>
    <KeyCandidates :options="options" :input="input" :operating="operating" />
  </div>
</template>

<script setup lang="ts">
  import isTouchDevice from 'is-touch-device'

  const props = defineProps<{
    label: string
    options: (string | null)[]
  }>()

  const emit = defineEmits<{
    (e: 'input', value: string): void
  }>()

  const { input, operating, onTouchStart, onTouchMove, onTouchEnd } =
    useFlickInput(props.options, onInput)

  function onInput(value: string | null) {
    value && emit('input', value)
  }

  function onClick() {
    !isTouchDevice() && window.alert('Oops, this only works on mobile.')
  }
</script>

<style lang="scss" scoped>
  .keyboard-key {
    position: relative;

    button {
      background-color: white;
      color: #333333;

      &.small {
        font-size: small;
      }
    }
  }
</style>
