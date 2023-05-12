import { transformingMap } from '~/consts/charMap'

export default function useTextEdit(maxLength: Ref<number>) {
  const text = ref('')

  return {
    text,
    input,
    backspace,
    newline
  }

  function input(value: string) {
    if (!['小', '゛', '゜'].includes(value)) {
      if (text.value.length < maxLength.value) text.value = text.value + value
    } else {
      if (text.value.length === 0) return
      const lastChar = text.value.slice(-1)
      text.value = text.value.slice(0, -1) + transform(lastChar, value)
    }
  }

  function backspace() {
    if (text.value.length !== 0) text.value = text.value.slice(0, -1)
  }

  function newline() {
    text.value = text.value + '\n'
  }

  function transform(char: string, input: string): string {
    return (transformingMap[char] || {})[input] || char
  }
}
