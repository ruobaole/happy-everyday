// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/gxp0yR37zBr
//
// This is similar to the Longest Increasing Subsquence problem;
// However, we need to know for DP[i], is the last 2 elements in ascending
//  or descending order
// We use 2 rows of DP;
// DP[i][0] - length of the LAS for subarray ending at i where
//  the last 2 in ASC order;
// DP[i][1] - ... in DES order;
// In getting each DP[i][1] or DP[i][0]; we need to examine all the
//  previous indices j (from 0 to i-1); judging from nums[j] and nums[i],
//  we know if we need to put in DP[i][1] or DP[i][0]; we also know if we
//  need to refer DP[j][0] or DP[j][1]
// NOTICE that the LAS we are looking for is not necessarily ending at the last
//  of the array - hence, we should return the max of all in DP
//
// Time: O(N^2)
// Space: O(N)

export function lenLAS(nums: number[]): number {
  if (nums.length <= 1) {
    return 0
  }
  // column0 - ASC; column1 - DES;
  const DP = new Array(nums.length).fill(0).map(() => new Array(2).fill(1))
  let maxLen = 0
  for (let i = 1; i < nums.length; i += 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      if (nums[j] < nums[i]) {
        // cur - Asc
        DP[i][0] = Math.max(DP[i][0], DP[j][1] + 1)
        maxLen = Math.max(maxLen, DP[i][0])
      }
      if (nums[j] > nums[i]) {
        // cur - Des
        DP[i][1] = Math.max(DP[i][1], DP[j][0] + 1)
        maxLen = Math.max(maxLen, DP[i][1])
      }
    }
  }
  return maxLen
}
