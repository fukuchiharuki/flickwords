import { Answer } from '~/composables/useGameBoard'

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
