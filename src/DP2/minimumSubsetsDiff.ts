// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/xVVNRPPXQGr
//
// Bottom up DP
// Inspired by the 'subsets with equal sum' problem, we know that if we can find a subset
//   with sum equals to totalSum / 2, the minimum differernce would be 0
// If we cannot find such subsets, the closest sum we can get would give us the min difference.
// How to find the closest sum?
// In the last row of the final DP, we just need to traverse the row right -> left, the
//   first cell that gives us true would be the closest sum.
//
// Time: O(N * SUM)
// Space: O(SUM)

export function minSubsetsDifference(num: number[]): number {
  // Assume that the array contains only positive numbers
  const totalSum = num.reduce((sum, n) => sum + n)
  const S = Math.floor(totalSum / 2)
  const DP = new Array(S + 1).fill(false)
  DP[0] = true
  for (let s = 1; s <= S; s += 1) {
    DP[s] = num[0] === s
  }

  for (let i = 1; i < num.length; i += 1) {
    for (let s = S; s >= 0; s -= 1) {
      if (!DP[s] && num[i] <= s) {
        DP[s] = DP[s - num[i]]
      }
    }
  }

  let sum1 = S
  while (sum1 >= 0 && !DP[sum1]) {
    sum1 -= 1
  }
  const sum2 = totalSum - sum1
  return Math.abs(sum2 - sum1)
}
