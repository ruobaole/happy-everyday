// https://www.educative.io/courses/grokking-the-coding-interview/qZgJyPqwJ80
//
// DP[i][s] -- number of sutsets that has sum === s within the first i elements
// Deduction:
// 1) try including the i-th element if num[i] <= s
// if DP[i-1][s-num[i]] > 0 -- meaning there are x ways we can form sum s by including
//   the element --> DP[i][s] = DP[i-1][s-num[i]]
// 2) try excluding the element
// if DP[i-1][s] > 0 -- meaning that there are y ways we can form the sum by excluding
//   the element --> DP[i][s] += DP[i-1][s]
// return DP[num.length-1][sum]
// Base Case:
//  DP[i][0] = 1 for all i -- because we can always get subset with sum 0 for any array
//    by forming an empty subset
//  DP[0][s] = num[0] === s ? 1 (the only subset is {num[0]}) : 0
// Actually, we can reduce the space used to O(S) by DP[s]
// -- filling DP from right to left, so that the leftside part of the array is DP[i-1][s]
//
// Time: O(N * S)
// Space: O(S)

export const countSubsets = (num: number[], sum: number): number => {
  const DP = new Array(sum + 1).fill(0)
  DP[0] = 1
  for (let s = 1; s <= sum; s += 1) {
    DP[s] = num[0] === s ? 1 : 0
  }
  for (let i = 1; i < num.length; i += 1) {
    for (let s = sum; s >= 0; s -= 1) {
      // try including the element
      if (num[i] <= s) {
        DP[s] += DP[s - num[i]]
      }
    }
  }
  return DP[sum]
}
