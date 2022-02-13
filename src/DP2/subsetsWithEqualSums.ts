// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/3jEPRo5PDvx
//
// Bottom up DP
// Since the array contains only possitive numbers, the problem asks us to find if there
//  exists subsets with sum equals to totalSum / 2
// This is the same us 0/1 knapsack problem.
// The brute force solution would be to ----
// for each number in the array:
//  case1. if the number <= S/2, create a subset including the number
//  recursivly process the rest numbers (numbers to the right of the current)
//  and see if it returns true
//  case2. create a subset not including the number, recursively process the further
//  numbers, see if it returns true
//  return case1 || case2
// The problem is identified with 2 params -- i, sum
// We can use bottom up DP with DP[i][sum] -- true if the first i+1 (including the i-th element)
//  elements could find a subset with sum
// Deduction rule:
// case1. if num[i] <= sum, try including the number
// DP[i-1][sum - num[i]]
// case2. try not including the number
// DP[i-1][sum]
// return DP[i-1][sum - num[i]] || DP[i-1][sum]
// Base Case:
// 1. DP[i][0] = true -- since we can always have an empty subset
// 2. DP[0][sum] = num[0] === sum
// As can be see, when calculate DP[i][sum], we only use the cell to the top of it
//  and somewhere on the former row to the left of the curren cell
// Thus, we can save space to O(SUM) by reusing the same row
//
// Time: O(N * SUM)
// Space: O(SUM)

export function canParitition(num: number[]): boolean {
  const S = num.reduce((sum, n) => sum + n)
  if (S % 2 !== 0) {
    return false
  }
  const targetSum = S / 2
  const DP = new Array(targetSum + 1).fill(false)
  DP[0] = true
  for (let s = 1; s <= targetSum; s += 1) {
    DP[s] = num[0] === s
  }
  for (let i = 1; i < num.length; i += 1) {
    for (let s = targetSum; s >= 0; s -= 1) {
      if (!DP[s] && num[i] <= s) {
        DP[s] = DP[s - num[i]]
      }
    }
  }
  return DP[targetSum]
}
