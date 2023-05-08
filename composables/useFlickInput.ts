export default function useFlickInput(
  options: (string | null)[],
  onInput: (value: string | null) => void
): {
  input: ComputedRef<string | null>
  operating: Ref<boolean>
  onTouchStart: (e: TouchEvent) => void
  onTouchMove: (e: TouchEvent) => void
  onTouchEnd: (e: TouchEvent) => void
} {
  const startX = ref(0.0)
  const startY = ref(0.0)
  const cursor = ref(0)
  const input = computed(() => options[cursor.value])
  const operating = ref(false)

  return {
    input,
    operating,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }

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
    onInput(input.value)
  }
}
