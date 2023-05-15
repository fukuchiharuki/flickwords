type Score = {
  records: number[]
  currentStreak: number
  maxStreak: number
  lastPlay: number
  lastWin: number
}

export default Score

export function updateScore(
  score: Score,
  correctedRound: number,
  seeds: number[]
): Score {
  if (score.lastPlay === seeds[0]) return score
  const records = [...score.records]
  records[correctedRound] = records[correctedRound] + 1
  const win = correctedRound > 0 ? 1 : 0
  const continuousWin = win && score.lastWin === seeds[1]
  const currentStreak = win + (continuousWin ? score.currentStreak : 0)
  return {
    records,
    currentStreak,
    maxStreak: Math.max(currentStreak, score.maxStreak),
    lastPlay: seeds[0],
    lastWin: win ? seeds[0] : score.lastWin
  }
}

export function getScore(wordLength: number): Score {
  const data = localStorage.getItem(keyOf(wordLength))
  return data ? (JSON.parse(data) as Score) : initialScore()
}

export function saveScore(wordLength: number, score: Score) {
  const data = JSON.stringify(score)
  localStorage.setItem(keyOf(wordLength), data)
}

function keyOf(wordLength: number): string {
  return `scores.${wordLength}`
}

function initialScore(): Score {
  return {
    records: [0, 0, 0, 0, 0, 0],
    currentStreak: 0,
    maxStreak: 0,
    lastPlay: 0,
    lastWin: 0
  }
}
