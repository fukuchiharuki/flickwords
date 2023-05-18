export function generateSeed(): number[] {
  const current = currentGame()
  const previous = previousGameOf(current)
  return [current, previous]
}

export const CURRENT_GAME = 0
export const PREVIOUS_GAME = 1

function interval(): number {
  // TODO: One game a day
  // return 86400000 // 24 hours: 1000 * 60 * 60 * 24
  return 60000 // 1 minute: 1000 * 60
}

function currentGame(): number {
  const date = new Date()
  const timestamp = date.getTime()
  return timestamp - (timestamp % interval()) + date.getTimezoneOffset() * 60000
}

function previousGameOf(currentGame: number): number {
  return currentGame - interval()
}

function primitiveGame(): number {
  const date = new Date(2023, 5 - 1, 18)
  return date.getTime()
}

export function indexFrom(seed: number[]): number {
  return (
    (seed[CURRENT_GAME] - primitiveGame()) /
    (seed[CURRENT_GAME] - seed[PREVIOUS_GAME])
  )
}

export function gameNumberFrom(seed: number[]): number {
  return indexFrom(seed) + 1
}
