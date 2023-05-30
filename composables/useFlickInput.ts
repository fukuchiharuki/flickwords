import isTouchDevice from 'is-touch-device'

export default function useFlickInput(
  options: (string | null)[],
  onInput: (value: string | null) => void
): {
  input: ComputedRef<string | null>
  operating: Ref<boolean>
  onTouchStart: (e: TouchEvent) => void
  onTouchMove: (e: TouchEvent) => void
  onTouchEnd: (e: TouchEvent) => void
  onMouseDown: (e: MouseEvent) => void
  onMouseMove: (e: MouseEvent) => void
  onMouseUp: (e: MouseEvent) => void
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
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp
  }

  function onTouchStart(e: TouchEvent) {
    _start(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
  }

  function onTouchMove(e: TouchEvent) {
    _move(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
  }

  function onTouchEnd() {
    _end()
  }

  function onMouseDown(e: MouseEvent) {
    if (isTouchDevice()) return
    _start(e.clientX, e.clientY)
  }

  function onMouseMove(e: MouseEvent) {
    if (isTouchDevice()) return
    if (!operating.value) return
    _move(e.clientX, e.clientY)
  }

  function onMouseUp() {
    if (isTouchDevice()) return
    if (!operating.value) return
    _end()
  }

  function _start(x: number, y: number) {
    startX.value = x
    startY.value = y
    cursor.value = 0
    operating.value = true
  }

  function _move(x: number, y: number) {
    const diffX = x - startX.value
    const diffY = y - startY.value
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

  function _end() {
    operating.value = false
    onInput(input.value)
  }
}
