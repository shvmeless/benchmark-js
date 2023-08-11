// IMPORTS
import { stdout } from 'process'
import { trunc } from './common'
import chalk from 'chalk'

// FUNCTION
function bold (str: string | number): string {
  str = str.toString()
  return chalk.bold.yellow(str)
}

// FUNCTION
function time (milliseconds: number): string {

  let seconds = trunc(milliseconds / 1000)
  milliseconds = trunc(milliseconds % 1000)
  const minutes = trunc(seconds / 60)
  seconds = trunc(seconds % 60)

  const output: string[] = []

  if (minutes >= 1) output.push(`${bold(minutes)} m`)
  if (seconds >= 1) output.push(`${bold(seconds)} s`)
  if (milliseconds >= 1) output.push(`${bold(milliseconds)} ms`)

  return output.join(' ')

}

// CLASS
export class Loading {

  // PROPERTIES
  private _start: number = 0
  private _checkpoint: number = 0

  // METHOD
  public start (total: number): void {

    this._start = performance.now()
    this._checkpoint = this._start

    stdout.write(`\nCompleted ${bold('0%')} of ${bold(total)} repetitions\n`)
    stdout.write('Calculating remaining time ...\n')

  }

  // METHOD
  public refresh (current: number, total: number): void {

    const now = performance.now()
    const diff = now - this._checkpoint

    if (diff < 50) return
    this._checkpoint = now

    const elapsed = now - this._start
    const remaining = elapsed / current * (total - current)

    const progress = current * 100 / total

    stdout.write('\x1B[3A\x1B[0J')
    stdout.write(`\nCompleted ${bold(progress.toFixed(0) + '%')} of ${bold(total)} repetitions\n`)
    stdout.write(`Remaining time ${time(remaining)}\n`)

  }

  // METHOD
  public done (total: number): void {

    const now = performance.now()
    const elapsed = now - this._start

    stdout.write('\x1B[3A\x1B[0J')
    stdout.write(`\nCompleted ${bold(total)} repetitions in ${time(elapsed)}\n\n`)

  }

}
