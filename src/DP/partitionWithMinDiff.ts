// educative.io/courses/grokking-the-coding-interview/mE53y85Wqw9
//
// Solution1. Brute Force solution
// For every index in the list -- i, choosing between adding the i-th element
//   to sum1 or sum2
// sum1 and sum2 are the sum of the 2 sets generated from the parent tree --
//  i.e first i-1 elements
// For the 2 branches -- continue processing the rest elements
// return the difference smaller difference of the 2 choices
// Base Case is when i === num.length
// now the difference is the difference of sum1 and sum2 -- because there're no
//  further elements
// Thus, the recusion func is problem(num, i, sum1, sum2)
//
// Time: O(2^N)
// Space: O(N) -- the calling stack

export const minDiffPartition1Helper = (
  num: number[],
  idx: number,
  sum1: number,
  sum2: number
): number => {
  if (idx === num.length) {
    return Math.abs(sum1 - sum2)
  }
  const diff1 = minDiffPartition1Helper(num, idx + 1, sum1 + num[idx], sum2)
  const diff2 = minDiffPartition1Helper(num, idx + 1, sum1, sum2 + num[idx])
  return Math.min(diff1, diff2)
}

export const minDiffPartition1 = (num: number[]): number => {
  return minDiffPartition1Helper(num, 0, 0, 0)
}

// Solution 2 - Top Down DP
// The pattern of the top down DP is to keep a memo DP[][] to
//  memorize the answers to the problems to avoid duplicated caculations
// At the first glance, the problem is identified with 3 params --
//  idx, sum1 and sum2
// In fact, the params can be reduced to 2 -- idx, sum1
// Because for the first i elements, the total sum is fixed, we know sum2
//  if we know i and sum1
// Hence, we can use DP[idx][sum1] to mark the answer to problem(idx, sum1, sum2)
//
// Time: O(N * S)
// Space: O(N * S)

const minDiffPartition2Helper = (
  num: number[],
  idx: number,
  sum1: number,
  sum2: number,
  DP: number[][]
): number => {
  if (idx === num.length) {
    return Math.abs(sum1 - sum2)
  }
  if (DP[idx][sum1] !== -1) {
    return DP[idx][sum1]
  }
  const diff1 = minDiffPartition2Helper(num, idx + 1, sum1 + num[idx], sum2, DP)
  const diff2 = minDiffPartition2Helper(num, idx + 1, sum1, sum2 + num[idx], DP)
  DP[idx][sum1] = Math.min(diff1, diff2)
  return DP[idx][sum1]
}

export const minDiffPartition2 = (num: number[]): number => {
  const sum = num.reduce((sum, n) => sum + n)
  const DP = new Array(num.length)
    .fill(-1)
    .map(() => new Array(sum + 1).fill(-1))
  // Since the absolute diff cannot be -1, we use -1 as placeholders for
  // unfilled cells
  return minDiffPartition2Helper(num, 0, 0, 0, DP)
}

// Solution3 - Bottom up DP
// TRICKY: to find the minimum diff is to find a subset with its sum close to
//  S/2
// The problem can be transformed into -- finding the subset with its sum added up
//  to as close as S/2
// DP[i][sum] -- if we can find a subset within the first i elements that added up to sum
// if DP[num.length-1][sum] === true at last, the min diff is 0
// otherwise, we have to decrease sum by 1 each time, to find the DP[i][s] that is true
// -- s is the sum of one set, totalSum - s is the other set's sum
// -- diff is abs(s - (totalSum - s))
//
// Time: O(N * S)
// Space: O(S) -- use the reduced space strategy

export const minDiffPartition3 = (num: number[]): number => {
  const totalSum = num.reduce((sum, n) => sum + n)
  const S = Math.floor(totalSum / 2)
  const DP = new Array(S + 1).fill(false)
  // try find a subset with sum equals S
  // Base Cases
  DP[0] = true
  for (let sum = 1; sum <= S; sum += 1) {
    DP[sum] = num[0] === sum
  }
  for (let i = 1; i < num.length; i += 1) {
    for (let sum = S; sum >= 0; sum -= 1) {
      if (!DP[sum] && num[i] <= sum) {
        // try including the element
        DP[sum] = DP[sum - num[i]]
      }
    }
  }
  let sum1 = S
  if (!DP[S]) {
    for (let sum = S; sum >= 0; sum -= 1) {
      if (DP[sum]) {
        sum1 = sum
        break
      }
    }
  }
  return Math.abs(totalSum - sum1 - sum1)
}
