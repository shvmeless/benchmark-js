// FUNCTION
export function average (values: number[]): number {

  if (values.length === 0) return 0

  let total = 0
  for (const result of values) {
    total += result
  }

  return total / values.length

}

// FUNCTION
export function round (number: number, decimals = 0): number {
  if (decimals <= 0) return Math.round(number)
  const factor = Math.pow(10, decimals)
  return Math.round(number * factor) / factor
}

// FUNCTION
export function progressBar (percent: number, width = 50): string {

  if (percent > 100) percent = 100
  if (percent < 0) percent = 0

  const progress = Math.ceil(width * percent / 100)

  const output: string[] = []

  for (let i = 1; i <= width; i++) {
    if (i < progress) output.push('▧')
    else if (i === progress) output.push('▧')
  }

  return output.join('')

}
