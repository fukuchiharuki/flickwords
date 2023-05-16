import { Status } from './useGameBoard'
import {
  Answer,
  finished,
  getAnswerBackup,
  saveAnswerBackup
} from '~/repositories/Answer'
import { consonantMap, regulationMap, vowelMap } from '~/consts/charMap'

export default function useGameMaster(
  wordLength: Ref<number>,
  dictionary: Ref<string[]>,
  text: Ref<string>,
  shake: () => void,
  compare: (results: string[][]) => Status,
  reset: (answer?: Answer | null) => void,
  score: (wordLength: number, seeds: number[], answer: Answer) => void
): {
  keyLock: Ref<boolean>
  enter: () => void
} {
  const keyLock = ref(false)
  const seed = ref(generateSeed())
  const previousSeed = computed(() => previousSeedOf(seed.value))
  const correct = ref(correctOf(dictionary.value, randomFrom(seed.value)))

  validateStart(restore())

  return {
    keyLock,
    enter
  }

  function restore(): Answer | null {
    const answer = getAnswerBackup(seed.value)
    reset(answer)
    return answer
  }

  function validateStart(answer: Answer | null) {
    if (!answer) return
    if (finished(answer)) {
      keyLock.value = true
      // TODO: スコア表示
    }
  }

  function enter() {
    if (wordLength.value > text.value.length) {
      shake()
      return
    }

    keyLock.value = true
    const status = compare(results(text.value, correct.value))
    setTimeout(() => {
      saveAnswerBackup(seed.value, status.answer)
      if (!status.gameOver) keyLock.value = false
      if (status.gameOver)
        setTimeout(() => {
          score(
            wordLength.value,
            [seed.value, previousSeed.value],
            status.answer
          )
        }, 1000)
    }, status.duration)
  }
}

function generateSeed(): number {
  const date = new Date()
  const timestamp = date.getTime()
  return timestamp - (timestamp % 86400000) + date.getTimezoneOffset() * 60000
}

function previousSeedOf(seed: number): number {
  return seed - 86400000
}

function randomFrom(seed: number): number {
  const dt = new Date(seed)
  const yyyy = dt.getFullYear()
  const MM = ('00' + (dt.getMonth() + 1)).slice(-2)
  const dd = ('00' + dt.getDate()).slice(-2)
  const yyMMdd = (yyyy + MM + dd).slice(-6)
  const rand = [...yyMMdd].reverse().join('')
  return Number(rand)
}

function correctOf(dictionary: string[], rand: number): string {
  console.log(rand % dictionary.length, dictionary[rand % dictionary.length])
  return dictionary[rand % dictionary.length]
}

function results(text: string, correct: string): string[][] {
  const textChars = [...text]
  const correctChars = [...correct]
  return textChars.map((char, index) => {
    if (regulated(char) === correctChars[index]) return ['correct']
    return [
      vowel(char) === vowel(correctChars[index]) ? 'vowel' : null,
      consonant(char) === consonant(correctChars[index]) ? 'consonant' : null,
      correctChars.includes(regulated(char)) ? 'present' : 'absent'
    ].filter((it) => it) as string[]
  })
}

function regulated(char: string) {
  return regulationMap[char] || char
}

function vowel(char: string) {
  return vowelMap[regulated(char)] || char
}

function consonant(char: string) {
  return consonantMap[regulated(char)] || char
}
