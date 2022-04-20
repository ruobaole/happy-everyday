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

//--- r1 ---//

// For every number, we branching between putting the number in subset1
//  and putting it in subset2.
// We need to mark the sum of the 2 subsets we have so far respectively.
// Define the problem: problem(i, sum1, sum2) returns the min diff of partitioning
//  the first i elements.
// - case1. putting the element in subset1
//  diff1 = problem(i+1, sum1 + num[i], sum2)
// - case2. putting the element in subset2
//  diff2 = problem(i+1, sum1, sum2 + num[i])
// problem(i, sum1, sum2) = min(diff1, diff2)
// The problem seems to be depended on 3 parameters, but actually not.
// The total sum of the first i element is fixed, thus we can identify each problem
//  once we're given i, sum1.
// We can use DP[i][s] to memorize the answer to each subproblems -- top down DP
//
// Time: O(N * SUM) not more than the size of DP
// Space: O(N * SUM)

const helper1 = (
  num: number[],
  i: number,
  sum1: number,
  sum2: number,
  DP: number[][]
): number => {
  if (i === num.length) {
    // Base Case
    return Math.abs(sum1 - sum2)
  }
  if (DP[i][sum1] !== -1) {
    return DP[i][sum1]
  }
  const diff1 = helper1(num, i + 1, sum1 + num[i], sum2, DP)
  const diff2 = helper1(num, i + 1, sum1, sum2 + num[i], DP)
  const diff = Math.min(diff1, diff2)
  DP[i][sum1] = diff
  return diff
}

export const minDiffPartition_r1_DP1 = (num: number[]): number => {
  if (num.length === 0) {
    return 0
  }
  const totalSum = num.reduce((sum, n) => sum + n)
  const DP = new Array(num.length)
    .fill(-1)
    .map(() => new Array(totalSum + 1).fill(-1))
  return helper1(num, 0, 0, 0, DP)
}

// Bottom up DP
// We first calculate the totalSum of the array.
// To get the min difference, we're actually to to get a subset with sum
//  equals to Math.floor(totalSum / 2)
// Thus, problem becomes -- if there exisits a subset with sum equals to a targetSum.
// However, we could end up unable to get such subset -- returns false.
// In that case, we should traverse the last row of our DP[i][s] matrix, from
//  right to left, trying to find the first cell that returns T.
// The s now should be the sum closest to the target sum we can get. And we can use it
//  as sum1, the final difference should be Math.abs(totalSum - sum1 - sum1)
// Reusing a single array with length SUM+1 and filling in the array from right to left
//  to save space.
//
// Time: O(N * SUM)
// Space: O(SUM)

export const minDiffPartition_r1_DP2 = (num: number[]): number => {
  // Assuming that all numbers are positive
  const totalSum = num.reduce((sum, n) => sum + n)
  const targetSum = Math.floor(totalSum / 2)
  if (targetSum === 0) {
    return totalSum - targetSum - targetSum
  }
  const DP = new Array(targetSum + 1).fill(false)
  for (let s = 0; s <= targetSum; s += 1) {
    if (s === 0) {
      DP[s] = true
    } else {
      DP[s] = num[0] === s
    }
  }

  for (let i = 1; i < num.length; i += 1) {
    for (let s = targetSum; s >= 0; s -= 1) {
      if (!DP[s] && num[i] <= s) {
        // try including the element
        DP[s] = DP[s - num[i]]
      }
    }
  }
  let sum1 = targetSum
  while (sum1 > 0 && !DP[sum1]) {
    sum1 -= 1
  }
  return Math.abs(totalSum - sum1 - sum1)
}

//--- r2 ---//
//
// Observe that if we can find a subset within the array whose sum equals
//  Math.floor(totalSum / 2), the min difference should be 0;
// If we cannot find such subset; we should get the sum closest to the target,
//  as the sum of subset1;
// Now, sum of subset2 should be totalSum - sum1; and the difference should be
//  abs(sum1 - sum2)
// How do we find the sum closest to the target?
// just iterate the last row of DP from right to left, the first cell that returns true
//  gives us the sum that is closest to the target;
//
// Time: O(N * SUM)
// Space: O(SUM) -- reusing only one row

export function minDiffPartition_r2(num: number[]): number {
  // Assume that no negative numbers exist in the array
  const totalSum = num.reduce((sum, n) => sum + n)
  const target = Math.floor(totalSum / 2)
  const DP = new Array(target + 1).fill(false)
  // if no items can be selected, we can get sum 0
  DP[0] = true
  for (let i = 1; i <= num.length; i += 1) {
    for (let s = target; s >= 0; s -= 1) {
      // DP[s] now is DP[i - 1][s]
      if (!DP[s] && num[i - 1] <= s) {
        DP[s] = DP[s - num[i - 1]]
      }
    }
  }
  let sum1 = target
  while (sum1 > 0 && !DP[sum1]) {
    sum1 -= 1
  }
  const sum2 = totalSum - sum1
  return Math.abs(sum1 - sum2)
}
