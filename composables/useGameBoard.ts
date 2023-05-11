export type Char = {
  value: string
  unused: boolean
}

export type Word = {
  chars: Char[]
  shake: boolean
}

export type Answer = {
  words: Word[]
}

export default function useGameBoard(
  wordLength: Ref<number>,
  text: Ref<string>
): {
  answer: ComputedRef<Answer>
  enter: () => void
  shake: () => void
  compare: (results: string[][]) => void
  reset: () => void
} {
  const base = reactive(initialAnser(wordLength.value))
  const cursor = ref(0)
  const _shake = ref(false)
  const answer = computedAnswer(base, cursor, _shake, text, wordLength)
  return {
    answer,
    enter,
    shake,
    compare,
    reset
  }

  // TODO: compareに置き換える
  function enter() {
    if (cursor.value < 6)
      base.words[cursor.value] = wordFrom(text.value, wordLength.value)
    text.value = ''
    cursor.value = cursor.value + 1
  }

  function shake() {
    _shake.value = true
    setTimeout(() => {
      _shake.value = false
    }, 400)
  }

  function compare(results: string[][]) {
    console.log(results)
  }

  function reset() {
    text.value = ''
    base.words = initialAnser(wordLength.value).words
    cursor.value = 0
  }
}

function initialAnser(wordLength: number): Answer {
  return {
    words: [...Array(6)].map((_) => ({
      chars: [...Array(5)].map((_, index) => ({
        value: '',
        unused: index >= wordLength
      })),
      shake: false
    }))
  }
}

function computedAnswer(
  base: Answer,
  cursor: Ref<number>,
  _shake: Ref<boolean>,
  text: Ref<string>,
  wordLength: Ref<number>
): ComputedRef<Answer> {
  return computed<Answer>(() => {
    if (cursor.value >= 6) return base
    const words = [...base.words] as Word[]
    words[cursor.value] = {
      ...wordFrom(text.value, wordLength.value),
      shake: _shake.value
    }
    return { words }
  })
}

function wordFrom(text: string, wordLength: number): Word {
  return {
    chars: [...text.padEnd(5, ' ')].map((c, index) => ({
      value: c.trim(),
      unused: index >= wordLength
    })),
    shake: false
  }
}
