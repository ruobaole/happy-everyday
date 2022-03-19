// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/gx842pQXGM9
//
// The problem is similar to the Longest Increasing Subsequence problem
// We need 2 DP arrays - DP1 and DP2
// DP1[i] marked the longest increasing subsequence from 0 till i
// DP2[i] marked the longest increasing subsequence from end to right till i
// After we got DP1[i] and DP2[i] using the solution of finding the longest
//  increasing subsequence, we just need to traverse the 2 arrays again and
//  get the i that has the max DP1[i] + DP2[i] - 1
//
// Time: O(N^2)
// Space: O(N)

export function lenLBS(nums: number[]): number {
  if (nums.length <= 1) {
    return 0
  }
  const DP1 = new Array(nums.length).fill(1)
  const DP2 = new Array(nums.length).fill(1)
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      if (nums[j] < nums[i]) {
        DP1[i] = Math.max(DP1[i], DP1[j] + 1)
      }
    }
  }

  for (let i = nums.length - 1; i >= 0; i -= 1) {
    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[j] < nums[i]) {
        DP2[i] = Math.max(DP2[i], DP2[j] + 1)
      }
    }
  }

  let maxLen = 0
  for (let i = 0; i < nums.length; i += 1) {
    const bioLen = DP1[i] + DP2[i] - 1
    if (bioLen > 1) {
      maxLen = Math.max(maxLen, bioLen)
    }
  }
  return maxLen
}
