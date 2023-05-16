import { Answer } from './useGameBoard'
import { getScore, saveScore, updateScore } from '~/repositories/Score'

export default function useGameScorer(): {
  firstGame: (wordLength: number, seed: number) => boolean
  score: (wordLength: number, seeds: number[], answer: Answer) => void
} {
  return {
    firstGame,
    score
  }

  function firstGame(wordLength: number, seed: number): boolean {
    const score = getScore(wordLength)
    const firstGame = score.lastPlay !== seed
    console.log('firstGame', firstGame)
    return firstGame
  }

  function score(wordLength: number, seeds: number[], answer: Answer) {
    const correctedRound = correctedRoundOf(answer)
    const score = getScore(wordLength)
    const updatedScore = updateScore(score, correctedRound, seeds)
    saveScore(wordLength, updatedScore)
    const emojiTiles = correctedRound
      ? emojiTilesOf(answer).slice(0, correctedRound)
      : emojiTilesOf(answer)
    console.log('GAME OVER', wordLength, correctedRound, emojiTiles)
    console.log(updatedScore)
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
