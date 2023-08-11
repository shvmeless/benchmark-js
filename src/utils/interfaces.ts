// INTERFACE
export interface BenchmarkItem {
  name: string
  function: () => Promise<unknown>
  values: number[]
  average: number
}
