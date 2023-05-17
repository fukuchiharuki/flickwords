<template>
  <div class="menu animate__animated animate__fadeInUp">
    <strong class="title">FLICKWORDS</strong>
    <strong>MORE GAMES</strong>
    <ul>
      <li>
        <span class="icon">☕️</span>Next Game
        <span class="note">(One game a day)</span>
      </li>
      <li v-if="wordLength !== 3">
        <span class="icon">☘️</span>3 Letter Words
      </li>
      <li v-if="wordLength !== 4">
        <span class="icon">🍀</span>4 Letter Words
      </li>
      <li v-if="wordLength !== 5">
        <span class="icon">🌸</span>5 Letter Words
      </li>
    </ul>
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
  .menu {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    background-color: white;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 32px 16px;

    &.animate__fadeInUp {
      --animate-duration: 0.4s;
    }

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    strong {
      display: block;
      font-size: small;

      &.title {
        font-size: large;
        font-family: 'Cabin', sans-serif;
        font-weight: bold;
        letter-spacing: 2px;
      }

      & + strong {
        margin-top: 16px;
      }
    }

    ul {
      margin: 24px 0;
      padding-left: 0;
      list-style-type: none;
      font-size: small;

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
