import { solveKnapsack2 } from './knapsack'

test('case1', () => {
  const profits = [1, 6, 10, 16]
  const weights = [1, 2, 3, 5]
  const capacity = 6
  expect(solveKnapsack2(profits, weights, capacity)).toStrictEqual(17)
})
