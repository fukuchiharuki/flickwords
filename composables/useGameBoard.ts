export type Char = {
  value: string
  unused: boolean
}

export type Word = {
  chars: Char[]
}

export type Answer = {
  words: Word[]
}

export default function useGameBoard(
  wordLength: number,
  text: Ref<string>
): {
  answer: ComputedRef<Answer>
  enter: () => void
} {
  const base = reactive(initialAnser(wordLength))
  const cursor = ref(0)
  const answer = computedAnswer(base, cursor, text, wordLength)
  return {
    answer,
    enter
  }

  function enter() {
    if (cursor.value < 6)
      base.words[cursor.value] = wordFrom(text.value, wordLength)
    text.value = ''
    cursor.value = cursor.value + 1
  }
}

function initialAnser(wordLength: number): Answer {
  return {
    words: [...Array(6)].map((_) => ({
      chars: [...Array(5)].map((_, index) => ({
        value: '',
        unused: index >= wordLength
      }))
    }))
  }
}

function computedAnswer(
  base: Answer,
  cursor: Ref<number>,
  text: Ref<string>,
  wordLength: number
): ComputedRef<Answer> {
  return computed<Answer>(() => {
    if (cursor.value >= 6) return base
    const words = [...base.words] as Word[]
    words[cursor.value] = wordFrom(text.value, wordLength)
    return { words }
  })
}

function wordFrom(text: string, wordLength: number): Word {
  return {
    chars: [...text.padEnd(5, ' ')].map((c, index) => ({
      value: c.trim(),
      unused: index >= wordLength
    }))
  }
}
