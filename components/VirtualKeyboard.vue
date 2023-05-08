<template>
  <div class="keyboard">
    <div class="keyboard-layout keyboard-layout--left">
      <KeyboardSideKey label="☰" @click="onClick('menu')" />
      <KeyboardSideKey label="❔" @click="onClick('manual')" />
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
      <KeyboardSideKey label="⌫" @click="onClick('backspace')" />
      <KeyboardSideKey label="⏎" @click="onClick('enter')" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'input', args: { type: string; value: string }): void
  }>()

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
    { label: '小゛゜', options: ['小', '゛', null, '゜', null] },
    { label: 'わ', options: ['わ', 'を', 'ん', 'ー', null] },
    { label: '、。？！', options: ['、', '。', '？', '！', null] }
  ]

  function onInput(value: string) {
    emit('input', {
      type: 'kana',
      value
    })
  }

  function onClick(value: string) {
    emit('input', {
      type: 'func',
      value
    })
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
      margin: 4px;

      button {
        // leyout
        width: 100%;
        height: 100%;
        // style
        border-radius: 4px;
        border: 0;
        box-sizing: border-box;
        text-align: center;
        // font
        font-weight: bold;
        font-size: large;
        font-family: 'Segoe UI Symbol', 'Apple Symbols', 'Noto Sans Symbols 2';
      }
    }

    .keyboard-key {
      width: calc(33.3% - 8px);
      height: 48px;

      button {
        line-height: 48px;
      }

      &--side {
        width: calc(100% - 8px);
        height: 104px;

        button {
          line-height: 104px;
        }
      }
    }
  }
</style>
