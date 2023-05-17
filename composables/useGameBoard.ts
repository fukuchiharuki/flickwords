import {
  Answer,
  Word,
  nextCursor,
  initialAnser,
  outOfRange
} from '~/repositories/Answer'

export type Status = {
  duration: number
  gameOver: boolean
  answer: Answer
}

export default function useGameBoard(
  wordLength: Ref<number>,
  text: Ref<string>
): {
  answer: ComputedRef<Answer>
  shake: () => void
  compare: (results: string[][]) => Status
  reset: (answer: Answer | null) => void
} {
  const base = reactive(initialAnser(wordLength.value))
  const cursor = ref(0)
  const _shake = ref(false)
  const answer = computedAnswer(base, cursor, _shake, text, wordLength)
  return {
    answer,
    shake,
    compare,
    reset
  }

  function shake() {
    _shake.value = true
    setTimeout(() => {
      _shake.value = false
    }, 400)
  }

  function compare(results: string[][]): Status {
    const currentWord = cursor.value
    nextWord()
    let duration = openWord(currentWord, results)
    const gameClear = results
      .flat()
      .reduce((acc, result) => acc && result === 'correct', true)
    const gameOver = outOfRange(cursor.value, base)
    if (gameClear) duration = bounceWord(currentWord, duration)
    return {
      duration,
      gameOver: gameClear || gameOver,
      answer: base
    }
  }

  function nextWord() {
    if (!outOfRange(cursor.value, base))
      base.words[cursor.value] = wordFrom(text.value, wordLength.value)
    text.value = ''
    cursor.value = cursor.value + 1
  }

  function openWord(targetWord: number, results: string[][]): number {
    const delay = 360
    results.forEach((result, index) => {
      setTimeout(() => {
        base.words[targetWord].chars[index].result = result
      }, delay * index)
    })
    return delay * results.length
  }

  function bounceWord(targetWord: number, duration: number): number {
    const bounceDulation = 1000
    setTimeout(() => {
      base.words[targetWord].bounce = true
      setTimeout(() => {
        base.words[targetWord].bounce = false
      }, bounceDulation)
    }, duration)
    return duration + bounceDulation
  }

  function reset(answer: Answer | null) {
    text.value = ''
    base.words = answer ? answer.words : initialAnser(wordLength.value).words
    cursor.value = answer ? nextCursor(answer) : 0
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
    if (outOfRange(cursor.value, base)) return base
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
      unused: index >= wordLength,
      result: []
    })),
    shake: false,
    bounce: false
  }
}
