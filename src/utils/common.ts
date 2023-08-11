// FUNCTION
export function average (values: number[]): number {

  if (values.length === 0) return 0

  let total = 0
  for (const result of values) {
    total += result
  }

  return total / values.length

}
