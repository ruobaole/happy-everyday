// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/B8rgqKEW05N
//
// This is similar to the LIS. The subsequence has to be an increasing subseq.
// The only difference is that we're comparing their sums not length;
// Define DP[i] as the sum of the max sum increasing subseq ending at index i;
// To get DP[i], we need to examine all the possible prev numbers (j from 0 to i-1);
//  if nums[i] > nums[j] && DP[i] < DP[j] + nums[i] (meaning that no larger sum can be generated
//  from other prev numbers)
// Base Case: init DP[i] to be nums[i]
// return the max of all in DP[]
//
// Time: O(N^2)
// Space: O(N)

export function maxSumIncreasingSubseq(nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }
  const DP = new Array(nums.length).fill(0)
  nums.forEach((num, idx) => {
    DP[idx] = num
  })
  let maxSum = 0
  for (let i = 1; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[i] > nums[j] && DP[j] + nums[i] >= DP[i]) {
        DP[i] = DP[j] + nums[i]
        maxSum = Math.max(maxSum, DP[i])
      }
    }
  }
  return maxSum
}

//--- r1 ---//
//
// The solution follows the same strategy as the LIS. The only difference is that
//  this time, we compare on the sums, not the lengths of the sequence.
// DP[i] - the max sum of the subsequence ending at index i
// Base Case:
//  DP[i] = nums[i]
// Deduction:
//  loop j from 0 to i-1, if nums[j] < nums[i] && DP[i] < DP[j] + nums[i]
//  update DP[i]
// return the global max of DP
//
// Time: O(N * N)
// Space: O(N)

export function maxSumIncreasingSubseq_r1(nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }
  const DP = [...nums]
  let maxSum = 0
  for (let i = 1; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[j] < nums[i] && DP[j] + nums[i] > DP[i]) {
        DP[i] = DP[j] + nums[i]
        maxSum = Math.max(maxSum, DP[i])
      }
    }
  }
  return maxSum
}
