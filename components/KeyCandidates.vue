<template>
  <div :class="{ operating: operating }" class="keyboard-key-candidates">
    <div
      v-for="(candidate, index) in candidates"
      :key="index"
      :class="{ selected: input && candidate === input }"
      class="item"
    >
      {{ candidate }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    options: (string | null)[]
    input: string | null
    operating: boolean
  }>()

  const candidates = [
    null,
    props.options[2],
    null,
    props.options[1],
    props.options[0],
    props.options[3],
    null,
    props.options[4],
    null
  ]
</script>

<style lang="scss" scoped>
  .keyboard-key-candidates {
    display: none;
    &.operating {
      display: inline-block;
    }

    position: absolute;
    top: 0;
    left: 50%;
    margin-top: -108px; // -(84+24)
    margin-left: -42px;
    width: 84px;
    height: 84px;
    border-radius: 2px;
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

    .item {
      float: left;
      width: 28px;
      height: 28px;
      margin: 0;
      padding: 0;
      text-align: center;
      line-height: 28px;
      font-size: small;

      &.selected {
        border-radius: 2px;
        background-color: #333333;
        color: white;
        font-size: medium;
      }
    }
  }
</style>
