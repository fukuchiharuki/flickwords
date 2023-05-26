<template>
  <div class="floating-window menu animate__animated animate__fadeInUp">
    <strong class="title">FLICKWORDS</strong>
    <p>
      Flickwords is a flick-typing Japanese word game based on the
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
    <strong>Support Me</strong>
    <ul>
      <li>
        <a href="https://forms.gle/3hrkaJKyJvFCwkvg9" target="_blank">
          <span class="icon">📋</span>Feedback
        </a>
      </li>
    </ul>

    <hr />
    <p>
      This application uses the
      <a href="https://github.com/fukuchiharuki/kana345/" target="_blank"
        >kana345</a
      >
      data files based on the
      <a
        href="https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project"
        target="_blank"
        >JMdict</a
      >
      dictionary files.
    </p>
    <p>
      The JMdict dictionary files are the property of the
      <a href="https://www.edrdg.org/" target="_blank">
        Electronic Dictionary Research and Development Group</a
      >, and are used in conformance with the Group's
      <a href="https://www.edrdg.org/edrdg/licence.html" target="_blank"
        >licence</a
      >.
    </p>
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

        a {
          text-decoration: inherit;
          color: inherit;
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
