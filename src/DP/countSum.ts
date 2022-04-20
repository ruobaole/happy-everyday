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

//--- r1 ---//

// DP[i][s] -- the number of ways to construct subset using the first i elements
//  to get a total sum of s;
// Deduction:
//  case1. not including the i-th element to the subset
//  if DP[i-1][s] > 0, DP[i][s] = DP[i-1][s] ways of getting to DP[i][s]
//  case2. including the i-th element to the subset
//  if DP[i-1][s - num[i]] > 0; DP[i][s] += DP[i-1][s-num[i]]
//  (DP[i-1][s-num[i]] more ways of getting the current position)
// return DP[num.length][sum]
// Base case:
//  DP[i][0] = 1 -- because there should always be 1 way to get total sum of 0
//  DP[0][s] = num[0] === s ? 1 : 0
//
// Time: O(N * SUM)
// Space: O(SUM) -- reuse one row of array

export const countSubsets_r1 = (num: number[], sum: number): number => {
  const DP = new Array(sum + 1).fill(0)
  for (let s = 0; s <= sum; s += 1) {
    if (s === 0) {
      DP[s] = 0
    } else {
      DP[s] = num[0] === s ? 1 : 0
    }
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

//--- r2 ---//
//
// Define DP[i][s] - number of subsets within the first i elements in the given array whose
//  sum equals to s
// Deduction:
// 1. try including the i-1 th element in the subset if its value not exceeding s
//  DP[i-1][s-num[i-1]]
// 2. try excluding the element
//  DP[i-1][s]
// the sum of the 2 cases
// Base Case:
// - DP[0][s] = s === 0 ? 1 : 0
// We can reuse one array in each row iteration to save space
//
// Time: O(N * SUM)
// Space: O(SUM)

export function countSubsets_r2(num: number[], sum: number): number {
  // Assume that the array contains only positive numbers
  if (sum < 0) {
    return 0
  }
  const DP = new Array(sum + 1).fill(0)
  DP[0] = 1
  for (let i = 1; i <= num.length; i += 1) {
    for (let s = sum; s >= 0; s -= 1) {
      // now DP[s] is in fact DP[i - 1][s]
      if (num[i - 1] <= s) {
        DP[s] += DP[s - num[i - 1]]
      }
    }
  }
  return DP[sum]
}
