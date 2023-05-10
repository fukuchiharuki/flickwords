type Char = {
  value: string
}

type Word = {
  chars: Char[]
}

export type Answer = {
  words: Word[]
}

export default function useGameBoard(text: Ref<string>): {
  answer: ComputedRef<Answer>
} {
  const base = reactive(initAnswer())
  const cursor = ref(0)
  const answer = computed<Answer>(() => {
    const words = [...base.words] as Word[]
    words[cursor.value] = {
      chars: [...text.value.padEnd(5, ' ')].map((c) => ({
        value: c
      }))
    }
    return { words }
  })
  return {
    answer
  }
}

function initAnswer(): Answer {
  return {
    words: [...Array(6)].map((_) => ({
      chars: [...Array(5)].map((_) => ({
        value: ''
      }))
    }))
  }
}
