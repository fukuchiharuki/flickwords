import { Status } from './useGameBoard'
import { consonantMap, regulationMap, vowelMap } from '~/consts/charMap'

export default function useGameMaster(
  wordLength: Ref<number>,
  dictionary: Ref<string[]>,
  text: Ref<string>,
  shake: () => void,
  compare: (results: string[][]) => Status
): {
  keyLock: Ref<boolean>
  enter: () => void
} {
  const keyLock = ref(false)
  const correct = ref(correctOf(dictionary.value, rand(seed())))

  return {
    keyLock,
    enter
  }

  function enter() {
    if (wordLength.value > text.value.length) {
      shake()
      return
    }
    keyLock.value = true
    const status = compare(results(text.value, correct.value))
    setTimeout(() => {
      if (!status.gameOver) keyLock.value = false
      if (status.gameOver) alert('GAME OVER')
    }, status.duration)
  }
}

function seed(): string {
  const dt = new Date()
  const yyyy = dt.getFullYear()
  const MM = ('00' + (dt.getMonth() + 1)).slice(-2)
  const dd = ('00' + dt.getDate()).slice(-2)
  return (yyyy + MM + dd).slice(-6)
}

function rand(seed: string): number {
  const rand = [...seed].reverse().join('')
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
