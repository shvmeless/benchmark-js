# Benchmark JS

This library helps you compare the performance of different functions and identify which implementation has better performance (speed).

**How it works ?**

The functions are executed several times, the system calculates the average execution time of each one and displays the results in the console.

> It is designed to be as simple as possible.

## Usage

Initialize a the `Benchmark` class.

```typescript
const benchmark = new Benchmark()
```

Add the functions using the `add` method.
> You must pass a name for each function.

```typescript
benchmark.add('vanilla', async () => {
  return random().sort((a, b) => (a - b))
})

benchmark.add('bubble', async () => {
  const array = random()
  return bubbleSort(array)
})

benchmark.add('selection', async () => {
  const array = random()
  return selectionSort(array)
})

benchmark.add('insertion', async () => {
  const array = random()
  return insertionSort(array)
})

benchmark.add('merge', async () => {
  const array = random()
  return mergeSort(array)
})
```

Run the benchmark with the `run` method, passing the number of repetitions.
> The more repetitions, the more accurate the results will be, but it will take longer to complete.

```typescript
const repetitions = 1000000
await benchmark.run(repetitions)
```

## Output

Once the benchmark has finished, the results will be printed to the console automatically.

```
Completed 1000000 repetitions in 3m 19s 759ms

  vanilla ▧▧▧ 0.004 ms
   bubble ▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧ 0.044 ms
selection ▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧ 0.044 ms
insertion ▧▧▧ 0.006 ms
    merge ▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧ 0.098 ms
```
