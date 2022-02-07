// https://www.educative.io/courses/grokking-the-coding-interview/gkZNLjV2kBk

// 1. Brute Force Solution
// DFS to traverse the tree
// level - index of fruit
// branching between including this fruit or not.
// For each fruit at index i, two cases:
// 1) including this fruit
//   check the fruit's weight to see if still addable
//   if not -- profit = 0
//   if yes -- profit[i] + solveKnapsack(profits, weights, i+1, capacity - weight[i])
// 2) not including this fruit
//   solveKnapsack(profits, weights, i+1, capacity)
// return the max of the 2 choices
// Base Case: capacity <= 0 || i >= weights.length
//   return 0 becasue no profit can be made
//
// Time: O(2^N)
// Space: O(N) - the call stack

const solveKnapsack1Helper = (
  profits: number[],
  weights: number[],
  idx: number,
  capacity: number
): number => {
  if (idx >= profits.length || capacity <= 0) {
    return 0
  }
  // 1) including the fruit
  let profit1 = 0
  if (weights[idx] <= capacity) {
    profit1 += solveKnapsack1Helper(
      profits,
      weights,
      idx + 1,
      capacity - weights[idx]
    )
  }
  // 2) not including the fruit
  const profit2 = solveKnapsack1Helper(profits, weights, idx + 1, capacity)
  return Math.max(profit1, profit2)
}

export const solveKnapsack1 = (
  profits: number[],
  weights: number[],
  capacity: number
): number => {
  if (profits.length !== weights.length) {
    return 0
  }

  return solveKnapsack1Helper(profits, weights, 0, capacity)
}

// 2. Top-down DP
// The above brute-force solution, the problem can be described as
//   problem(idx, capacity) -- because the problem is only influenced
//   by the idx and capacity.
// Thus, it is easily found that many overlapping subproblem exists --
//  problem(n, c) will be called many times.
// We can use a memo[n][c] to memorize the value of the solved problems.
// Notice that the capacity is actually ranging from [0, c] -- c+1 spaces.
// Hence, the time complexity can be reduced to O(N*C) -- just filling the
//  matrix
// Space is enlarged to O(N*C)

const solveKnapsack2Helper = (
  profits: number[],
  weights: number[],
  idx: number,
  capacity: number,
  memo: number[][]
): number => {
  if (idx >= profits.length || capacity <= 0) {
    return 0
  }
  if (memo[idx][capacity] !== -1) {
    return memo[idx][capacity]
  }
  // 1) including the fruit
  let profit1 = 0
  if (weights[idx] <= capacity) {
    profit1 =
      profits[idx] +
      solveKnapsack2Helper(
        profits,
        weights,
        idx + 1,
        capacity - weights[idx],
        memo
      )
  }
  // 2) not including the fruit
  const profit2 = solveKnapsack2Helper(
    profits,
    weights,
    idx + 1,
    capacity,
    memo
  )

  const profit = Math.max(profit1, profit2)
  memo[idx][capacity] = profit
  return profit
}

export const solveKnapsack2 = (
  profits: number[],
  weights: number[],
  capacity: number
): number => {
  if (profits.length !== weights.length) {
    return 0
  }
  // use -1 as placeholder for unsolved subproblem --
  //  because profits cannot be negative
  const memo: number[][] = new Array(profits.length)
    .fill(-1)
    .map(() => new Array(capacity + 1).fill(-1))
  return solveKnapsack2Helper(profits, weights, 0, capacity, memo)
}

//--- r1 ---//

// For every item, we should branching between adding this item
//  in the current subset or not. And return the one with the
//  larger profit.
// Define - problem(i, c) is the largest profit we gain from the first
//  i items under the capacity c
// - 1. including the i-th item
//  problem(i, c) = problem(i - 1, c - weights[i]) + profits[i]
// - 2. not including the i-th item
//  problem(i) = problem(i-1, c)
// As can be seen, the problem can be solved using bottom up DP.
// Base Case:
// 1. problem(i, 0) is 0 for all i
// 2. problem(0, c) = weights[0] <= c ? profits[0] : 0
// return problem(N, capacity)
// NOTE: observe the deduction rule, to get DP[i][c], we
//  only need to refer to cells in the last row and to the left
//  of the current col.
// Hence, we can save space to O(C) by using only one array as DP,
//  and filling the DP array from right to left.
//
// Time: O(N * C)
// Space: O(C)

export const solveKnapsack_r1 = (
  profits: number[],
  weights: number[],
  capacity: number
): number => {
  if (
    profits.length === 0 ||
    profits.length !== weights.length ||
    capacity <= 0
  ) {
    return 0
  }
  const DP = new Array(capacity + 1)
  // filling in the Base Case
  for (let c = 0; c <= capacity; c += 1) {
    DP[c] = weights[0] <= c ? profits[0] : 0
  }
  for (let i = 1; i < profits.length; i += 1) {
    for (let c = capacity; c >= 0; c -= 1) {
      // case: including the item
      let case1 = 0
      if (weights[i] <= c) {
        case1 = DP[c - weights[i]] + profits[i]
      }
      if (case1 > DP[c]) {
        DP[c] = case1
      }
    }
  }
  return DP[capacity]
}
