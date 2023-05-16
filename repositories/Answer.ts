export type Char = {
  value: string
  unused: boolean
  result: string[]
}

export type Word = {
  chars: Char[]
  shake: boolean
  bounce: boolean
}

export type Answer = {
  words: Word[]
}

export function initialAnser(wordLength: number): Answer {
  return {
    words: [...Array(6)].map((_) => ({
      chars: [...Array(5)].map((_, index) => ({
        value: '',
        unused: index >= wordLength,
        result: []
      })),
      shake: false,
      bounce: false
    }))
  }
}

export function nextCursor(answer: Answer): number {
  return answer.words
    .map((w) => w.chars.map((c) => c.value).join(''))
    .reduce((acc, word, index) => (word.length ? index + 1 : acc), 0)
}

export function outOfRange(cursor: number, answer: Answer): boolean {
  return !(cursor < answer.words.length)
}

export function finished(answer: Answer): boolean {
  const cursor = nextCursor(answer)
  if (outOfRange(cursor, answer)) return true
  return answer.words[cursor].chars
    .map((c) => c.result)
    .flat()
    .reduce((acc, result) => acc && result === 'correct', true)
}

type AnswerBackup = {
  [key: number]: Answer
}

export function getAnswerBackup(seed: number): Answer | null {
  const data = localStorage.getItem(key())
  return data ? (JSON.parse(data) as AnswerBackup)[seed] || null : null
}

export function saveAnswerBackup(seed: number, answer: Answer) {
  const data = JSON.stringify({ [seed]: answer } as AnswerBackup)
  localStorage.setItem(key(), data)
}

function key(): string {
  return `answer`
}
