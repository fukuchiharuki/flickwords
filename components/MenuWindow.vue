<template>
  <div class="floating-window menu animate__animated animate__fadeInUp">
    <strong class="title">FLICKWORDS</strong>
    <p>
      Flickwords is a flick input Japanese word game based off of the
      <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank"
        >New York Times' Wordle</a
      >. The words update daily.
    </p>
    <ul>
      <li @click="$emit('switch', wordLength)">
        <span class="icon">☕️</span>New Game
        <span class="note">(One game a day)</span>
      </li>
      <li v-if="wordLength !== 3" @click="$emit('switch', 3)">
        <span class="icon">☘️</span>3 Letter Words
      </li>
      <li v-if="wordLength !== 4" @click="$emit('switch', 4)">
        <span class="icon">🍀</span>4 Letter Words
      </li>
      <li v-if="wordLength !== 5" @click="$emit('switch', 5)">
        <span class="icon">🌸</span>5 Letter Words
      </li>
    </ul>
    <hr />
    <div class="close" @click="$emit('close')">✕️</div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    wordLength: number
  }>()

  defineEmits<{
    (e: 'switch', wordLength: number): void
    (e: 'close'): void
  }>()
</script>

<style lang="scss" scoped>
  .menu {
    ul {
      margin: 24px 0;
      padding-left: 0;
      list-style-type: none;

      li {
        & + li {
          margin-top: 16px;
        }

        .icon {
          display: inline-block;
          width: 32px;
          font-size: medium;
        }

        .note {
          font-size: x-small;
        }
      }
    }
  }
</style>
