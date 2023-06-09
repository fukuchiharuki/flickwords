import Chance from 'chance'

export function generateSeed(): number[] {
  const current = currentGame()
  const previous = previousGameOf(current)
  return [current, previous]
}

export const CURRENT_GAME = 0
export const PREVIOUS_GAME = 1

function interval(): number {
  return 86400000 // 24 hours: 1000 * 60 * 60 * 24
}

function currentGame(): number {
  const date = new Date()
  const timestamp = date.getTime()
  const localTimePassage = timestamp - date.getTimezoneOffset() * 60000
  return timestamp - (localTimePassage % interval())
}

function previousGameOf(currentGame: number): number {
  return currentGame - interval()
}

function primitiveGame(): number {
  const date = new Date(2023, 5 - 1, 31)
  return date.getTime()
}

function serialNumberFrom(seed: number[]): number {
  return (
    (seed[CURRENT_GAME] - primitiveGame()) /
    (seed[CURRENT_GAME] - seed[PREVIOUS_GAME])
  )
}

export function indexFrom(seed: number[], size: number): number {
  const chance = new Chance(serialNumberFrom(seed))
  return chance.integer({ min: 0, max: size - 1 })
}

export function gameNumberFrom(seed: number[]): number {
  return serialNumberFrom(seed) + 1
}
