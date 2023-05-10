export type Char = {
  value: string
}

export type Word = {
  chars: Char[]
}

export type Answer = {
  words: Word[]
}

export default function useGameBoard(text: Ref<string>): {
  answer: ComputedRef<Answer>
  enter: () => void
} {
  const base = reactive(initialAnser())
  const cursor = ref(0)
  const answer = computedAnswer(base, cursor, text)
  return {
    answer,
    enter
  }

  function enter() {
    if (cursor.value < 6) base.words[cursor.value] = word(text.value)
    text.value = ''
    cursor.value = cursor.value + 1
  }
}

function initialAnser(): Answer {
  return {
    words: [...Array(6)].map((_) => ({
      chars: [...Array(5)].map((_) => ({
        value: ''
      }))
    }))
  }
}

function computedAnswer(
  base: Answer,
  cursor: Ref<number>,
  text: Ref<string>
): ComputedRef<Answer> {
  return computed<Answer>(() => {
    if (cursor.value >= 6) return base
    const words = [...base.words] as Word[]
    words[cursor.value] = word(text.value)
    return { words }
  })
}

function word(text: string): Word {
  return {
    chars: [...text.padEnd(5, ' ')].map((c) => ({
      value: c.trim()
    }))
  }
}
