import { consonantMap, regulationMap, vowelMap } from '~/consts/charMap'

export function regulatedWord(word: string) {
  return [...word].map((char) => regulated(char)).join('')
}

export function regulated(char: string) {
  return regulationMap[char] || char
}

export function vowel(regulatedChar: string) {
  return vowelMap[regulatedChar] || regulatedChar
}

export function consonant(regulatedChar: string) {
  return consonantMap[regulatedChar] || regulatedChar
}
