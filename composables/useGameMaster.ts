import { Status } from './useGameBoard'

const regulationMap = {
  が: 'か',
  ぎ: 'き',
  ぐ: 'く',
  げ: 'け',
  ご: 'こ',
  ざ: 'さ',
  じ: 'し',
  ず: 'す',
  ぜ: 'せ',
  ぞ: 'そ',
  だ: 'た',
  ぢ: 'ち',
  づ: 'つ',
  で: 'て',
  ど: 'と',
  ば: 'は',
  び: 'ひ',
  ぶ: 'ふ',
  べ: 'へ',
  ぼ: 'ほ',
  ぱ: 'は',
  ぴ: 'ひ',
  ぷ: 'ふ',
  ぺ: 'へ',
  ぽ: 'ほ',
  ゃ: 'や',
  ゅ: 'ゆ',
  ょ: 'よ',
  ぁ: 'あ',
  ぃ: 'い',
  ぅ: 'う',
  ぇ: 'え',
  ぉ: 'お',
  ゔ: 'う',
  っ: 'つ'
} as { [key: string]: string }

const vowelMap = {
  か: 'あ',
  き: 'い',
  く: 'う',
  け: 'え',
  こ: 'お',
  さ: 'あ',
  し: 'い',
  す: 'う',
  せ: 'え',
  そ: 'お',
  た: 'あ',
  ち: 'い',
  つ: 'う',
  て: 'え',
  と: 'お',
  な: 'あ',
  に: 'い',
  ぬ: 'う',
  ね: 'え',
  の: 'お',
  は: 'あ',
  ひ: 'い',
  ふ: 'う',
  へ: 'え',
  ほ: 'お',
  ま: 'あ',
  み: 'い',
  む: 'う',
  め: 'え',
  も: 'お',
  や: 'あ',
  ゆ: 'う',
  よ: 'お',
  わ: 'あ',
  を: 'お'
} as { [key: string]: string }

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
  return dictionary[rand % dictionary.length]
}

function results(text: string, correct: string): string[][] {
  const textChars = [...text]
  const correctChars = [...correct]
  return textChars.map((char, index) => {
    if (regulated(char) === correctChars[index]) return ['correct']
    return [
      vowel(char) === vowel(correctChars[index]) ? 'vowel' : null,
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
