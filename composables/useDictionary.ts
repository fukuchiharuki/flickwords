export default async function useDictionary(): Promise<{
  data: Ref<string[] | null>
  pending: Ref<boolean>
  ready: ComputedRef<boolean>
}> {
  const { data, pending } = await useFetch<string[]>('dictionaries/kana5.json')
  const ready = computed(
    () => !!(data.value && data.value.length && !pending.value)
  )
  return {
    data,
    pending,
    ready
  }
}
