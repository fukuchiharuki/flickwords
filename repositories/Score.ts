type Score = {
  records: number[]
  currentStreak: number
  maxStreak: number
  lastPlay: number
  lastWin: number
  resultRound: number
}

type Statistics = {
  played: number
  winAverage: number
  currentStreak: number
  maxStreak: number
}

type GuessDistribution = {
  lastResult: boolean
  count: number
  ratio: number
}

export default Score

export function statisticsOf(score: Score): Statistics {
  const played = score.records.reduce((acc, record) => acc + record, 0)
  const win = score.records.slice(1).reduce((acc, record) => acc + record, 0)
  return {
    played,
    winAverage: Math.trunc((win / played) * 100),
    currentStreak: score.currentStreak,
    maxStreak: score.maxStreak
  }
}

export function guessDistributionOf(score: Score): GuessDistribution[] {
  const played = score.records.reduce((acc, record) => acc + record, 0)
  return score.records.map((record, index) => ({
    lastResult: score.resultRound === index,
    count: record,
    ratio: Math.trunc((record / played) * 100)
  }))
}

export function updateScore(
  score: Score,
  resultRound: number,
  seed: number[]
): Score {
  if (score.lastPlay === seed[0]) return score
  const records = [...score.records]
  records[resultRound] = records[resultRound] + 1
  const win = resultRound > 0 ? 1 : 0
  const continuousWin = win && score.lastWin === seed[1]
  const currentStreak = win + (continuousWin ? score.currentStreak : 0)
  return {
    records,
    currentStreak,
    maxStreak: Math.max(currentStreak, score.maxStreak),
    lastPlay: seed[0],
    lastWin: win ? seed[0] : score.lastWin,
    resultRound
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
    records: [0, 0, 0, 0, 0, 0, 0],
    currentStreak: 0,
    maxStreak: 0,
    lastPlay: 0,
    lastWin: 0,
    resultRound: 0
  }
}
