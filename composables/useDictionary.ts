import { regulatedWord } from '~/libs/word'

export default async function useDictionary(wordLength: Ref<number>): Promise<{
  data: Ref<string[] | null>
  pending: Ref<boolean>
  refresh: () => Promise<void>
}> {
  const config = useRuntimeConfig()
  const { data, pending, refresh } = await useFetch<string[]>(
    () => `${config.public.dictionariesBaseURL}/kana${wordLength.value}.json`,
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
