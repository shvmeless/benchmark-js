// IMPORTS
import { type BenchmarkItem } from './utils/interfaces'
import { average } from './utils/common'

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

  }

}
