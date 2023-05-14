export default async function useDictionary(wordLength: number): Promise<{
  data: Ref<string[] | null>
  pending: Ref<boolean>
}> {
  const { data, pending } = await useFetch<string[]>(
    `dictionaries/kana${wordLength}.json`
  )
  return {
    data,
    pending
  }
}
