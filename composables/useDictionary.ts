import { regulatedWord } from './useGameMaster'

export default async function useDictionary(wordLength: Ref<number>): Promise<{
  data: Ref<string[] | null>
  pending: Ref<boolean>
  refresh: () => Promise<void>
}> {
  const { data, pending, refresh } = await useFetch<string[]>(
    () => `dictionaries/kana${wordLength.value}.json`,
    {
      transform: (org: string[]) => org.map((word) => regulatedWord(word))
    }
  )

  return {
    data,
    pending,
    refresh
  }
}
