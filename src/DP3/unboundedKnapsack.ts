// educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/qV6RXWME4D3
//
// 1. Brute Force
// For each item in idex i, we have 2 choices:
//  choice1. create a new set including the item if its weight <= capacity, then recurse on the
//  same set of items
//  choice2. create a new set not including the item, then recurse on teh same set of items
// return the choice with max profit
//
// Time: For each item we have 2 choices, but the total number of items we're recursing on is
//  not N; because we need to repeatedly examine the same item until the capacity reaches 0
//  thus, the max is N + C (when the weight for the item is 1)
//  thus, O(2^ (N + C))
// Space: O(N + C) -- call stack

export function unboundedKnapSack_bruteForce(
  profits: number[],
  weights: number[],
  capacity: number
): number {
  if (
    capacity <= 0 ||
    profits.length === 0 ||
    profits.length !== weights.length
  ) {
    return 0
  }
  return unboundedKnapSack_bruteForceHelper(profits, weights, capacity, 0)
}

function unboundedKnapSack_bruteForceHelper(
  profits: number[],
  weights: number[],
  capacity: number,
  idx: number
): number {
  if (idx === profits.length || capacity <= 0) {
    return 0
  }
  let profit1 = 0
  if (weights[idx] <= capacity) {
    profit1 =
      profits[idx] +
      unboundedKnapSack_bruteForceHelper(
        profits,
        weights,
        capacity - weights[idx],
        idx
      )
  }
  const profit2 = unboundedKnapSack_bruteForceHelper(
    profits,
    weights,
    capacity,
    idx + 1
  )
  return Math.max(profit1, profit2)
}

// Bottom-up DP
// DP[i][c] - the max profit we can get from the first i+1 elements
// (i-th being the last element)
// Deduction Rule:
// 1. try including the ith element if the weight <= c
// profits[i] + DP[i][c - weights[i]]
// 2. try not including the ith element
// DP[i-1][c]
// DP[i][c] = Math.max(profit1, profit2)
// Base Case:
// 1) DP[i][0] = 0
// 2) DP[0][c] = Math.floor(c/weights[0]) * profits[0]
// Can we save space up to O(C)?
// Note that when getting DP[i][c], we need element to the
//  top of the cell and  element in the same row somewhere to the left of
//  the cell.
// To save space, we need at least 2 rows, and row = i % 2 each time to make the
//  use one row as i and the other as i - 1
//
// Time: O(N * C)
// Space: O(N * C), but can be saved to O(2C)

export function unboundedKnapSack_DP(
  profits: number[],
  weights: number[],
  capacity: number
): number {
  if (
    capacity <= 0 ||
    profits.length === 0 ||
    profits.length !== weights.length
  ) {
    return 0
  }
  const DP = new Array(profits.length)
    .fill(0)
    .map(() => new Array(capacity + 1).fill(0))
  // Base Case
  for (let c = 0; c <= capacity; c += 1) {
    DP[0][c] = Math.floor(c / weights[0]) * profits[0]
  }

  for (let i = 1; i < profits.length; i += 1) {
    for (let c = 0; c <= capacity; c += 1) {
      // 1) try including the ith element
      let profit1 = 0
      if (weights[i] <= c) {
        profit1 = profits[i] + DP[i][c - weights[i]]
      }
      // 2) try not including the ith element
      const profit2 = DP[i - 1][c]
      DP[i][c] = Math.max(profit1, profit2)
    }
  }
  return DP[profits.length - 1][capacity]
}
