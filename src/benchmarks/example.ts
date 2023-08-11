// IMPORTS
import { Benchmark } from '..'

// MAIN
async function main (): Promise<void> {

  const benchmark = new Benchmark()

  benchmark.add('256', async () => {
    return Array(256).map((_, index) => index)
  })

  benchmark.add('512', async () => {
    return Array(512).map((_, index) => index)
  })

  benchmark.add('1024', async () => {
    return Array(1024).map((_, index) => index)
  })

  benchmark.add('2048', async () => {
    return Array(2048).map((_, index) => index)
  })

  benchmark.add('4096', async () => {
    return Array(4096).map((_, index) => index)
  })

  await benchmark.run(100000)

}

// RUN
main().catch(console.error)
