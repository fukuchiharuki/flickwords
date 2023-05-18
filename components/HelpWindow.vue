<template>
  <div class="floating-window help animate__animated animate__fadeInUp">
    <strong class="title">How To Play</strong>
    <p>Guess the Flickwords in 6 tries.</p>
    <p></p>
    <ul>
      <li>Each guess must be a valid {{ wordLength }}-letter word.</li>
      <li>
        The color of the tiles will change to show how close your guess was to
        the word.
      </li>
    </ul>
    <strong>Examples</strong>
    <hr />
    <div class="navi">
      <button @click="$emit('close')">OK, I got it!</button>
    </div>
    <div class="close" @click="$emit('close')">✕️</div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    wordLength: number
  }>()

  defineEmits<{
    (e: 'close'): void
  }>()
</script>

<style lang="scss" scoped>
  .help {
    .navi {
      text-align: center;
    }
  }
</style>
