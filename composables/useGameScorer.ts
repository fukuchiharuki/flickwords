import { Answer } from '~/repositories/Answer'
import Score, { getScore, saveScore, updateScore } from '~/repositories/Score'

export default function useGameScorer(): {
  resultOnDisplay: Ref<boolean>
  result: Ref<{ score: Score; emojiTiles: string[] }>
  keepScore: (wordLength: number, seeds: number[], answer: Answer) => void
} {
  const resultOnDisplay = ref(false)
  const result = ref({ score: {} as Score, emojiTiles: [] as string[] })

  return {
    resultOnDisplay,
    result,
    keepScore
  }

  function keepScore(wordLength: number, seeds: number[], answer: Answer) {
    const resultRound = resultRoundOf(answer)
    const score = getScore(wordLength)
    const updatedScore = updateScore(score, resultRound, seeds)
    saveScore(wordLength, updatedScore)
    const emojiTiles = resultRound
      ? emojiTilesOf(answer).slice(0, resultRound)
      : emojiTilesOf(answer)
    show(updatedScore, emojiTiles)
    console.log('GAME OVER', wordLength, resultRound, emojiTiles)
    console.log(updatedScore)
  }

  function show(score: Score, emojiTiles: string[]) {
    result.value = { score, emojiTiles }
    resultOnDisplay.value = true
  }
}

function resultRoundOf(answer: Answer): number {
  return answer.words.reduce(
    (resultRound, word, index) =>
      word.chars.reduce(
        (acc, char) => acc && char.result.includes('correct'),
        true
      )
        ? index + 1
        : resultRound,
    0
  )
}

function emojiTilesOf(answer: Answer): string[] {
  return answer.words.map((word) =>
    word.chars
      .map((char) =>
        char.result.includes('correct')
          ? '🟩'
          : char.result.includes('present')
          ? '🟨'
          : '⬜'
      )
      .join('')
  )
}
