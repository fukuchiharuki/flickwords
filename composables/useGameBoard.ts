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
} {
  const base = reactive(initialAnser())
  const cursor = ref(0)
  const answer = computed<Answer>(() => {
    const words = [...base.words] as Word[]
    words[cursor.value] = {
      chars: [...text.value.padEnd(5, ' ')].map((c) => ({
        value: c.trim()
      }))
    }
    return { words }
  })
  return {
    answer
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
