import { Status } from './useGameBoard'
import {
  Answer,
  finished,
  getAnswerBackup,
  saveAnswerBackup
} from '~/repositories/Answer'
import { consonantMap, regulationMap, vowelMap } from '~/consts/charMap'
import { generateSeed, indexFrom } from '~/libs/seed'

export default function useGameMaster(
  wordLength: Ref<number>,
  dictionary: Ref<string[]>,
  text: Ref<string>,
  shake: () => void,
  compare: (results: string[][]) => Status,
  reset: (answer: Answer | null) => void,
  keepScore: (wordLength: number, seed: number[], answer: Answer) => void,
  restoreScore: (wordLength: number, seed: number[], answer: Answer) => void
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
    correctWord.value =
      dictionary.value[indexFrom(seed.value, dictionary.value.length)]
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
      keyLock.value = true
      setTimeout(() => {
        restoreScore(wordLength.value, seed.value, answer)
      }, 1500)
    }
  }

  function enter() {
    if (
      text.value.length < wordLength.value ||
      !dictionary.value.includes(text.value)
    ) {
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

function results(text: string, correctWord: string): string[][] {
  const textChars = [...text].map((c) => regulated(c))
  const correctChars = [...correctWord].map((c) => regulated(c))
  return textChars.map((char, index) => {
    if (char === correctChars[index]) return ['correct']
    return [
      vowel(char) === vowel(correctChars[index]) ? 'vowel' : null,
      consonant(char) === consonant(correctChars[index]) ? 'consonant' : null,
      correctChars.includes(char) ? 'present' : 'absent'
    ].filter((it) => it) as string[]
  })
}

function regulated(char: string) {
  return regulationMap[char] || char
}

function vowel(regulatedChar: string) {
  return vowelMap[regulatedChar] || regulatedChar
}

function consonant(regulatedChar: string) {
  return consonantMap[regulatedChar] || regulatedChar
}
