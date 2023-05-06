<template>
  <div class="keyboard">
    <div class="keyboard-layout keyboard-layout--left">
      <KeyboardSideKey label="☰" />
      <KeyboardSideKey label="❔" />
    </div>
    <div class="keyboard-layout keyboard-layout--main">
      <KeyboardKey
        v-for="(key, index) in keyboardKeys"
        :key="index"
        :label="key.label"
        :options="key.options"
        @input="onInput"
      />
    </div>
    <div class="keyboard-layout keyboard-layout--right">
      <KeyboardSideKey label="⌫" />
      <KeyboardSideKey label="⏎" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const keyboardKeys = [
    { label: 'あ', options: ['あ', 'い', 'う', 'え', 'お'] },
    { label: 'か', options: ['か', 'き', 'く', 'け', 'こ'] },
    { label: 'さ', options: ['さ', 'し', 'す', 'せ', 'そ'] },
    { label: 'た', options: ['た', 'ち', 'つ', 'て', 'と'] },
    { label: 'な', options: ['な', 'に', 'ぬ', 'ね', 'の'] },
    { label: 'は', options: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
    { label: 'ま', options: ['ま', 'み', 'む', 'め', 'も'] },
    { label: 'や', options: ['や', null, 'ゆ', null, 'よ'] },
    { label: 'ら', options: ['ら', 'り', 'る', 'れ', 'ろ'] },
    { label: '', options: [] },
    { label: 'わ', options: ['わ', 'を', 'ん'] },
    { label: '', options: [] }
  ]

  function onInput(value: string | null) {
    console.log(value)
  }
</script>

<style lang="scss">
  .keyboard {
    display: flex;
    padding: 2px 0;
    background-color: #e9e9e9;
  }

  .keyboard-layout {
    box-sizing: border-box;
    &--main {
      width: 64%;
    }
    &--left,
    &--right {
      flex: 1;
    }

    .keyboard-key {
      // layout
      float: left;
      position: relative;
      margin: 4px;
      width: calc(33.3% - 8px);
      height: 48px;
      &--side {
        width: calc(100% - 8px);
        height: 104px;
      }

      button {
        // leyout
        width: 100%;
        height: 100%;
        // style
        border-radius: 4px;
        border: 0;
        box-sizing: border-box;
        // font
        font-weight: bold;
        font-size: large;
        font-family: 'Segoe UI Symbol', 'Apple Symbols', 'Noto Sans Symbols 2';
      }
    }
  }
</style>
