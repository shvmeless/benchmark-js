// IMPORTS
import { average, progressBar, round } from './utils/common'
import { type BenchmarkItem } from './utils/interfaces'
import { stdout } from 'process'
import chalk from 'chalk'

// CLASS
export class Benchmark {

  // PROPERTIES
  private _functions: BenchmarkItem[] = []

  // METHOD
  public add (name: string, fn: () => Promise<unknown>): void {
    this._functions.push({ name, function: fn, values: [], average: 0 })
  }

  // METHOD
  public async run (repetitions: number): Promise<void> {

    this._functions = this._functions.map((current) => ({
      name: current.name,
      function: current.function,
      values: [],
      average: 0,
    }))

    for (let i = 1; i <= repetitions; i++) {
      for (const current of this._functions) {
        const start = performance.now()
        await current.function()
        const end = performance.now()
        current.values.push(end - start)
      }
    }

    this._functions = this._functions.map((current) => ({
      name: current.name,
      function: current.function,
      values: current.values,
      average: average(current.values),
    }))

    this.print()

  }

  // METHOD
  private print (): void {

    const averages = this._functions.map((current) => (current.average))
    const minAverage = Math.min(...averages)
    const maxAverage = Math.max(...averages)

    let longestNameLength = 0

    const data = this._functions.map((current) => {

      const percent = current.average * 100 / maxAverage

      if (current.name.length > longestNameLength) longestNameLength = current.name.length

      return {
        name: current.name,
        bar: progressBar(percent, 50),
        average: `${round(current.average, 4)} ms`,
        min: current.average === minAverage,
        max: current.average === maxAverage,
      }

    })

    for (const row of data) {

      row.name = row.name.padStart(longestNameLength, ' ')

      let output = `${row.name} ${row.bar} ${row.average}`
      if (row.min) output = chalk.green(output)
      if (row.max) output = chalk.red(output)

      stdout.write(`${output}\n`)

    }

  }

}
