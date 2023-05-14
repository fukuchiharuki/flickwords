import { Answer } from './useGameBoard'

export default function useGameScorer(): {
  score: (answer: Answer) => void
} {
  return {
    score
  }

  function score(answer: Answer) {
    const correctedRound = correctedRoundOf(answer)
    const emojiTiles = correctedRound
      ? emojiTilesOf(answer).slice(0, correctedRound)
      : emojiTilesOf(answer)
    console.log('GAME OVER', correctedRound, emojiTiles)
  }
}

function correctedRoundOf(answer: Answer): number {
  return answer.words.reduce(
    (correctedRound, word, index) =>
      word.chars.reduce(
        (acc, char) => acc && char.result.includes('correct'),
        true
      )
        ? index + 1
        : correctedRound,
    0
  )
}

function emojiTilesOf(answer: Answer) {
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
