// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/m27pwPZ3yvG
//
// Bottom up DP
// Very similar to 'find subsets with sum' problem.
// This time, DP[i][sum] -- the number of subsets in the first i+1 elements that
//  can generate sum equals to sum
// Deduction Rule:
// case1. try including the i-th element to the subset if num[i] <= sum
//   if DP[i-1][sum - num[i]] > 0, meaning there're multiple ways to get to
//   the former step
//   Hence, DP[i][sum] should be += DP[i-1][sum-num[i]]
// case2. try not including the i-th element
//   DP[i][sum] should further add DP[i-1][sum]
// Base Case:
// 1. DP[i][0] = 1 -- because there're always one way to get sum 0 by
//   having an empty subset
// 2. DP[0][sum] = num[0] === sum ? 1 : 0
// NOTE that we can also save space by reusing one row
//
// Time: O(N * SUM)
// Space: O(SUM)

export function countSubsets(num: number[], sum: number): number {
  // Assume the array contains only positive numbers
  if (sum <= 0) {
    return 0
  }
  const DP = new Array(sum + 1).fill(0)
  DP[0] = 1
  for (let s = 1; s <= sum; s += 1) {
    DP[s] = num[0] === s ? 1 : 0
  }

  for (let i = 1; i < num.length; i += 1) {
    for (let s = sum; s >= 0; s -= 1) {
      if (num[i] <= s) {
        DP[s] += DP[s - num[i]]
      }
    }
  }

  return DP[sum]
}
