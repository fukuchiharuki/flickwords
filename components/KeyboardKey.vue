<template>
  <div class="keyboard-key">
    <div
      v-touch:press="onTouchStart"
      v-touch:drag="onTouchMove"
      v-touch:release="onTouchEnd"
      class="button"
    >
      {{ label || '&nbsp;' }}
    </div>
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

  const startX = ref(0)
  const startY = ref(0)
  const cursor = ref(0)
  const input = computed(() => props.options[cursor.value])
  const operating = ref(false)

  function onTouchStart(e: TouchEvent) {
    startX.value = e.changedTouches[0].pageX
    startY.value = e.changedTouches[0].pageY
    cursor.value = 0
    operating.value = true
  }

  function onTouchMove(e: TouchEvent) {
    const diffX = e.changedTouches[0].pageX - startX.value
    const diffY = e.changedTouches[0].pageY - startY.value
    const length = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
    const atan2 = Math.atan2(diffY, diffX)
    const rad = atan2 > 0 ? atan2 : atan2 + 6.28318530718 // Math.PI * 2
    cursor.value =
      length < 24
        ? 0 // neutral
        : rad < 0.78539816339 // Math.PI * 1/4
        ? 3 // right
        : rad < 2.35619449019 // Math.PI * 3/4
        ? 4 // down
        : rad < 3.92699081699 // Math.PI * 5/4
        ? 1 // left
        : rad < 5.49778714378 // Math.PI * 7/4
        ? 2 // up
        : 3 // right
  }

  function onTouchEnd() {
    operating.value = false
    emit('input', input.value)
  }
</script>

<style lang="scss" scoped>
  .keyboard-key {
    position: relative;

    .button {
      background-color: white;
    }

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
  }
</style>
