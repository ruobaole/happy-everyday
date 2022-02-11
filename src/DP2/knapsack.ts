// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/RM1BDv71V60
//
// 1. Brute Force Solution
// for each i -- index of the item
//  case1: if the capacity >= than the weight of the i-th item
//    create a new set including the i-th item -- the profit will be the i-th item's profit +
//    the profits of the rest of items to the right of i
//  case2: create a new set excluding the i-th item -- the profit will be the profits of the rest of the
//  items to the right of i
// return the max of the 2 cases
// Thus, the problem can be identified using problem(profits, weights, capacity, i)
//
// Time: O(2^N)
// Space: O(N) -- for the recursion stack

export function solveKnapsack_bruteForce(
  profits: number[],
  weights: number[],
  capacity: number
): number {
  if (
    profits.length === 0 ||
    profits.length !== weights.length ||
    capacity <= 0
  ) {
    return 0
  }
  return solveKnapsack_bruteForceHelper(profits, weights, capacity, 0)
}

function solveKnapsack_bruteForceHelper(
  profits: number[],
  weights: number[],
  capacity: number,
  idx: number
): number {
  if (idx === profits.length) {
    return 0
  }
  // 1. try including the item
  let profit1 = 0
  if (capacity >= weights[idx]) {
    profit1 = solveKnapsack_bruteForceHelper(
      profits,
      weights,
      capacity - weights[idx],
      idx + 1
    )
  }
  // 2. try not including the item
  const profit2 = solveKnapsack_bruteForceHelper(
    profits,
    weights,
    capacity,
    idx + 1
  )
  return Math.max(profit1, profit2)
}

// 2. Bottom-up DP
// Since we can identify problem with 2 params -- capcity and idx, we're thinking of
// saving the answers to these problems in a matrix DP[c][i]
// We can iterativly fill out the matrix from top-left to bottom-right -- i.e. bottom-up DP
// Now, since we're solving the problem in a bottom up fashion, the DP[c][i] has a different meaning
//  to the previous problem(c, i)
// DP[c][i] -- the max profit the first i + 1 items can draw under the capacity of c
// The deduction rule is hence --
//  case1. try including the i-th item
//  if the weight of i <= c, DP[c][i] = DP[c - weights[i]][i - 1] + profits[i]
//  case2. try not including the i-th item, the profit will be the same as the first i items under
//  the capacity of c
//  DP[c][i] = DP[c][i-1]
//  DP[c][i] = max(case1profit, case2profit)
// Base Case:
//  1. when c === 0, no profits can be draw -> DP[0][i] = 0
//  2. when i === 0, DP[c][0] = if c >= weights[i] --> profits[i]
//
// Time: O(N * C)
// Space: O(N * C)
//
// NOTE that when we are filling the matrix, for each DP[c][i], we only need elements at
//  DP[c-weights[i]][i - 1] and DP[c][i-1] -> 2 elements in the previous column
// Of course we can change the matrix to DP[i][c] -> hence more easy to understand -->
//  we only need 2 elements in the previous row:
//  one on the top of the current; another to the left of the current
// Hence, we can save space by reusing only 1 row -- for both the previous and current iteration.
// Since we need the item to the right of the current, to avoid overriding the element in the
//  previous iteration, we can always fill the array from right to left.

export function solveKnapsack_DP2(
  profits: number[],
  weights: number[],
  capacity: number
): number {
  if (
    profits.length === 0 ||
    profits.length !== weights.length ||
    capacity <= 0
  ) {
    return 0
  }
  const N = profits.length
  const DP = new Array(capacity + 1).fill(0)
  // initialize base case
  for (let c = 0; c <= capacity; c += 1) {
    if (c >= weights[0]) {
      DP[c] = profits[0]
    }
  }
  for (let i = 1; i < N; i += 1) {
    for (let c = capacity; c >= 0; c -= 1) {
      // now DP[c] is the answer of the previous row
      if (weights[i] <= c) {
        DP[c] = Math.max(DP[c], DP[c - weights[i]] + profits[i])
      }
    }
  }
  return DP[capacity]
}

// 3. To get the selected items
// Looking at the final matrix, we know that for each cell, the number
// could either
// 1) comes from the one to the top of it -- not including the item
// 2) including the item -- by adding the current profit to the one on the
//  same row somewhere to the left of it
// Thus, by examing the cell and its top cell we can know if the item is included.
// From the bottom right corner, we go up to find the first cell that is not equal to
//  the current cell -> including the current item to the selected list
// Having the curCapacity = current column, curCapacity -= weights[i]
// Jump to the column curCapacity at the row
// Repeat the two step until we got to the first row. Now there're 2 cases --
// 1. the cell's content is 0 -- we have collected all the items selected
// 2. the cell's content is not 0 - meaning that there is only 1 item selected and
//  is the first item

export function solveKnapsack3(
  profits: number[],
  weights: number[],
  capacity: number
): number[] {
  // return the indices of the items selected
  if (
    profits.length === 0 ||
    profits.length !== weights.length ||
    capacity <= 0
  ) {
    return []
  }
  const N = profits.length
  const DP = new Array(N).fill(0).map(() => new Array(capacity + 1).fill(0))
  for (let c = 0; c <= capacity; c += 1) {
    if (weights[0] <= c) {
      DP[0][c] = profits[0]
    }
  }
  for (let i = 1; i < N; i += 1) {
    for (let c = 1; c <= capacity; c += 1) {
      let profit1 = 0
      if (weights[i] <= c) {
        profit1 = profits[i] + DP[i - 1][c - weights[i]]
      }
      const profit2 = DP[i - 1][c]
      DP[i][c] = Math.max(profit1, profit2)
    }
  }
  const selected: number[] = []
  let curProfit = DP[N - 1][capacity]
  let curCap = capacity
  for (let i = N - 1; i >= 0; i -= 1) {
    if (DP[i][curCap] !== curProfit) {
      // item i+1 is included
      selected.push(i + 1)
      curCap -= weights[i + 1]
      curProfit -= profits[i + 1]
    }
  }
  if (curProfit !== 0) {
    return [0]
  }
  return selected
}
