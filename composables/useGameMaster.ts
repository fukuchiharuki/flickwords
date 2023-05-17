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
  reset: (answer: Answer | null) => void,
  keepScore: (wordLength: number, seed: number[], answer: Answer) => void,
  restoreScore: (wordLength: number, answer: Answer) => void
): {
  keyLock: Ref<boolean>
  enter: () => void
} {
  const keyLock = ref(false)
  const seed = ref([] as number[])
  const correctWord = ref('')

  initialize()

  return {
    keyLock,
    enter
  }

  function initialize() {
    keyLock.value = false
    seed.value = generateSeed()
    correctWord.value = correctWordOf(
      dictionary.value,
      randomFrom(seed.value[0])
    )
    validateStart(restore())
  }

  function restore(): Answer | null {
    const answer = getAnswerBackup(wordLength.value, seed.value[0])
    reset(answer)
    return answer
  }

  function validateStart(answer: Answer | null) {
    if (!answer) return
    if (finished(answer)) {
      console.log('key locked')
      keyLock.value = true
      setTimeout(() => {
        restoreScore(wordLength.value, answer)
      }, 1500)
    }
  }

  function enter() {
    if (wordLength.value > text.value.length) {
      shake()
      return
    }

    keyLock.value = true
    const status = compare(results(text.value, correctWord.value))
    setTimeout(() => {
      saveAnswerBackup(wordLength.value, seed.value[0], status.answer)
      if (!status.gameOver) keyLock.value = false
      if (status.gameOver)
        setTimeout(() => {
          keepScore(wordLength.value, seed.value, status.answer)
        }, 1000)
    }, status.duration)
  }
}

function generateSeed(): number[] {
  const current = currentSeed()
  const previous = previousSeedOf(current)
  return [current, previous]
}

function interval(): number {
  // return 86400000 // 24 hours: 1000 * 60 * 60 * 24
  return 1000 * 60
}

function currentSeed(): number {
  const date = new Date()
  const timestamp = date.getTime()
  return timestamp - (timestamp % interval()) + date.getTimezoneOffset() * 60000
}

function previousSeedOf(currentSeed: number): number {
  return currentSeed - interval()
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

function correctWordOf(dictionary: string[], rand: number): string {
  console.log(rand % dictionary.length, dictionary[rand % dictionary.length])
  return dictionary[rand % dictionary.length]
}

function results(text: string, correctWord: string): string[][] {
  const textChars = [...text]
  const correctChars = [...correctWord]
  return textChars.map((char, index) => {
    if (regulated(char) === regulated(correctChars[index])) return ['correct']
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
