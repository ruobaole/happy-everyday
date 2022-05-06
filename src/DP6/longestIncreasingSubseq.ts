// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/YQ0y0QOJQ69
//
// Brute Force
// We permulate all the subsequences by processing each number and branching between
//  if we include that number or not
// Define prob(prevI, curI) as the length of the LIS ending at index curI; prevI is the
//  last included index
// 1. including curI if curNum >= prevNum
//  len1 = 1 + prob(curI, curI + 1)
// 2. not including curI
//  len2 = prob(prevI, curI + 1)
// return max(len1, len2)
//
// Time: O(2^N)
// Space: O(N) - the call stack

export function LIS_bruteforce(nums: number[]): number {
  return LIS_bruteforceHelper(nums, -1, 0)
}

function LIS_bruteforceHelper(
  nums: number[],
  prev: number,
  cur: number
): number {
  if (cur === nums.length) {
    return 0
  }
  let len1 = 0
  if (prev === -1 || nums[cur] >= nums[prev]) {
    // try including the curNum if no numbers before it or
    // if it is larger than the previous
    len1 = 1 + LIS_bruteforceHelper(nums, cur, cur + 1)
  }
  const len2 = LIS_bruteforceHelper(nums, prev, cur + 1)
  return Math.max(len1, len2)
}

// Bottom up DP
// Define DP[i] - the len of the LIS ending at index i
// To get DP[i] --
// iterate j from 0 to i - 1 (i.e. for all the subsequence endings)
//  if nums[j] < nums[i] && DP[j] + 1 > DP[i]; update DP[i] = DP[j] + 1
// Meaning that we can get longer subseq ending at i only if nums[i] is larger
//  than the previous number in the sequence, and no other previous number can
//  generate longer subsequences;
// Base Case:
//  DP[i] = 1
// Return the max of all in DP[]
//
// Time: O(N^2)
// Space: O(N)

export function LIS_DP(nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }
  const DP = new Array(nums.length).fill(1)
  let maxLen = 1
  for (let i = 1; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[j] <= nums[i] && DP[j] <= DP[i]) {
        DP[i] = DP[j] + 1
        maxLen = Math.max(maxLen, DP[i])
      }
    }
  }
  return maxLen
}

//--- r1 ---//
//
// DP[i] -- length of the longest increasing subsequence ending at index i
// To get each DP[i], we need to iterate all possible subsequences that ends before
//  i, and find the longest possible one; That is ---
// Iterate j from 0 to i - 1, if nums[j] < nums[i] -- increasing:
//  DP[i] = max(DP[i], DP[j] + 1)
// Base Case:
//  DP[i] = 1
// return the global max in DP
//
// Time: O(N * N)
// Space: O(N)

export function LISubseq(nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }
  const DP = new Array(nums.length).fill(1)
  let maxLen = 0
  for (let i = 1; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[j] < nums[i]) {
        DP[i] = Math.max(DP[i], DP[j] + 1)
        maxLen = Math.max(maxLen, DP[i])
      }
    }
  }
  return maxLen
}
