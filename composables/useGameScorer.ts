import { Answer } from '~/repositories/Answer'
import Score, { getScore, saveScoreUpdate } from '~/repositories/Score'

export default function useGameScorer(): {
  resultOnDisplay: Ref<boolean>
  result: Ref<{ seed: number[]; score: Score; emojiTiles: string[] }>
  keepScore: (wordLength: number, seed: number[], answer: Answer) => void
  restoreScore: (wordLength: number, seed: number[], answer: Answer) => void
} {
  const resultOnDisplay = ref(false)
  const result = ref({
    seed: [] as number[],
    score: {} as Score,
    emojiTiles: [] as string[]
  })

  return {
    resultOnDisplay,
    result,
    keepScore,
    restoreScore
  }

  function keepScore(wordLength: number, seed: number[], answer: Answer) {
    const resultRound = resultRoundOf(answer)
    const updatedScore = saveScoreUpdate(wordLength, seed, resultRound)
    const emojiTiles = resultRound
      ? emojiTilesOf(answer, wordLength).slice(0, resultRound)
      : emojiTilesOf(answer, wordLength)
    show(seed, updatedScore, emojiTiles)
  }

  function restoreScore(wordLength: number, seed: number[], answer: Answer) {
    const resultRound = resultRoundOf(answer)
    const score = getScore(wordLength)
    const emojiTiles = resultRound
      ? emojiTilesOf(answer, wordLength).slice(0, resultRound)
      : emojiTilesOf(answer, wordLength)
    show(seed, score, emojiTiles)
  }

  function show(seed: number[], score: Score, emojiTiles: string[]) {
    result.value = { seed, score, emojiTiles }
    resultOnDisplay.value = true
  }
}

function resultRoundOf(answer: Answer): number {
  return answer.words.reduce(
    (resultRound, word, index) =>
      word.chars
        .filter((c) => !c.unused)
        .reduce((acc, char) => acc && char.result.includes('correct'), true)
        ? index + 1
        : resultRound,
    0
  )
}

function emojiTilesOf(answer: Answer, wordLength: number): string[] {
  return answer.words.map((word) =>
    word.chars
      .slice(0, wordLength)
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
