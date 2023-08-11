// IMPORTS
import { type BenchmarkItem } from './utils/interfaces'

// CLASS
export class Benchmark {

  // PROPERTIES
  private readonly _functions: BenchmarkItem[] = []

  // METHOD
  public add (name: string, fn: () => Promise<unknown>): void {
    this._functions.push({ name, function: fn, values: [], average: 0 })
  }

}
