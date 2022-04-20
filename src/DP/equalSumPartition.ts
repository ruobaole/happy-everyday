// https://www.educative.io/courses/grokking-the-coding-interview/g7QYlD8RwRr
//
// To find if we can partition the numbers into 2 sets with equal sum, we can first sum
//  all numbers --> S, and then try to find the subset with sum equals S/2 in the
//  number array
// Thus, the problem becomes -- try to find a subset whose sum is S/2
// For every number element, we can choose between if we include the number in the sum or
//  not.
// The problem can be defined as problem(i, S): boolean -- whether we can find the subset from
//   the first i elements whose sum equals S
// To get problem(i, S) --
//   1. try to include ni -- if ni <= S (all elements are positive)
//   return problem(i-1, S-ni)
//   2. try to exclude ni: return problem(i-1, S)
//   return 1 || 2
// It can be seen that, each problem() is determined by some problem with smaller i and s
// Thus, we can store problem(i, S) into a matrix DP[i][S]
// Base Case:
// - DP[i][0] = true -- because we can always exclude the number to get 0 sum
// - DP[0][S] = n0 === S
// Iteration: try filling the matrix top -> down, left -> right
// return DP[num.length-1][S]
//
// Time: O(N * S)
// Space: O(N * S)

export const canPartition = (num: number[]): boolean => {
  // Assume that all numbers are positive integers
  let S = num.reduce((sum, n) => sum + n)
  if (S % 2 !== 0) {
    return false
  }
  S /= 2
  const DP: boolean[][] = new Array(num.length).fill(false).map(() => {
    return new Array(S + 1).fill(false)
  })
  for (let i = 0; i < num.length; i += 1) {
    for (let j = 0; j <= S; j += 1) {
      if (j === 0) {
        DP[i][j] = true
        continue
      }
      if (i === 0 && j !== 0) {
        DP[i][j] = num[0] === j
        continue
      }
      // 1. try including this element
      if (num[i] <= j) {
        DP[i][j] = DP[i - 1][j - num[i]]
      } else {
        // 2. try exluding the element
        DP[i][j] = DP[i - 1][j]
      }
    }
  }
  return DP[num.length - 1][S]
}

//--- r1 ---//

// We first get the total sum of the array. And the problem would
//  be transformed to -- if we can find a subset within the array
//  that sumed to targetSum = totalSum / 2.
// Thus, for every number, we have 2 choices --
// 1. add it to the subset
// 2. do not add it to the subset
// If any of the choice give us the total sum of the targetSum we're
//  looking for so far -- we can get a subset with the targetSum.
// Define - DP[i][s] if we can find a subset within the first i elements
//  that sum up to target s.
// Deduction:
//  - 1) including the i-th element
//    DP[i][s] = DP[i-1][s - num[i]]
//  - 2) not including the i-th element
//    DP[i][s] = DP[i-1][s]
// Base case:
// 1. DP[0][s] = num[0] === s
// 2. DP[i][0] = true -- because we can always get a subset with sum 0 by
//  not having any element in the subset
// SAVE SPACE: note that in calculating DP[i][s], we only need some cell in the
//  last row to the left of the current one.
// Hence, we can save space by reusing an array and filling in the array from right
//  to left.
//
// Time: O(N * SUM)
// Space: O(SUM)

export const canPartition_r1 = (num: number[]): boolean => {
  // Assume that all numbers are positive -- so that the sum could
  // not be negative
  if (num.length === 0) {
    return true
  }
  const totalSum = num.reduce((sum, n) => sum + n)
  if (totalSum % 2 !== 0) {
    return false
  }
  const SUM = totalSum / 2
  const DP = new Array(SUM + 1).fill(false)
  for (let s = 0; s <= SUM; s += 1) {
    if (s === 0) {
      DP[s] = true
    } else {
      DP[s] = num[0] === s
    }
  }
  for (let i = 0; i < num.length; i += 1) {
    for (let s = SUM; s >= 0; s -= 1) {
      // DP[s] - case1 -- not including the element
      if (!DP[s] && num[i] <= s) {
        // case2 - including the element
        DP[s] = DP[s - num[i]]
      }
    }
  }
  return DP[SUM]
}

//--- r2 ---//
//
// First, we get the total sum of the array; then the problem becomes --
//  if there exists a subset whose sum equals totalSum / 2;
// Define DP[i][s] -- true if the first i items in the original array can
//  get a subset with sum -- s;
// To get DP[i][s], we have 2 choices:
// 1. try including the i-1 th item if num[i - 1] <= s
//  DP[i-1][s - num[i - 1]]
// 2. try not including the item
//  DP[i-1][s]
// return case1 || case2
// Base Case:
// 1. DP[0][s] = s === 0
// SPACE SAVING
// Notice that in getting each cell, we only need to refer 2 cells --
// - the top cell
// - the one in the top row and to the left of the current
// Hence, we can save space by reusing only one row -- DP[s]
// in each row iteration, we fill in the columns in order right -> left
//
// Time: O(N * SUM)
// Space: O(SUM)

export function canPartition_r2(num: number[]): boolean {
  // Assume that no negative number exists in the array
  const totalSum = num.reduce((sum, n) => sum + n)
  if (totalSum % 2 !== 0) {
    return false
  }
  const target = totalSum / 2
  const DP = new Array(target + 1).fill(false)
  DP[0] = true
  for (let i = 1; i <= num.length; i += 1) {
    for (let s = target; s >= 0; s -= 1) {
      // now DP[s] is actually DP[i-1][s]
      // try including the item
      if (!DP[s] && num[i - 1] <= s) {
        DP[s] = DP[s - num[i - 1]]
      }
    }
  }
  return DP[target]
}
