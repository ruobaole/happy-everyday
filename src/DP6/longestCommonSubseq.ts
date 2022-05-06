// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/B8Pq4ZnBN0N
//
// Brute force
// Define prob(i, j) - the longest common subsequence for s1 starting at index i and
//  s2 starting at index j
// Recursion:
//  if s1[i] === s2[j]: return 1 + prob(i + 1, j + 1)
//  else:
//   len1 = prob(i+1, j)
//   len2 = prob(i, j+1)
//   return max(len1, len2)
// Base Case:
//   when i === s1.length || j === s2.length
//   return 0
//
// Time: O(2^(M + N)) - at most 2 branches in each level
// Space: O(M + N)

export function longestCSubseq_bf(s1: string, s2: string): number {
  return longestCSubseq_bfHelper(s1, s2, 0, 0)
}

function longestCSubseq_bfHelper(
  s1: string,
  s2: string,
  i: number,
  j: number
): number {
  if (i === s1.length || j === s2.length) {
    return 0
  }
  if (s1[i] === s2[j]) {
    return 1 + longestCSubseq_bfHelper(s1, s2, i + 1, j + 1)
  }
  const len1 = longestCSubseq_bfHelper(s1, s2, i + 1, j)
  const len2 = longestCSubseq_bfHelper(s1, s2, i, j + 1)
  return Math.max(len1, len2)
}

// Bottom-up DP
// Define DP[i][j] - longest common subsequence for s1 ended at index i - 1
//  and s2 ended at index j - 1
// Deduction:
//  if s1[i-1] === s2[j-1]: DP[i][j] = 1 + DP[i - 1][j - 1]
//  else:
//  DP[i][j] = max(DP[i-1][j], DP[i][j-1])
// Base Case:
//  DP[i][0] = 0; DP[0][j] = 0
// update maxLen while filling the DP matrix, return maxLen
//
// Time: O(N * M)
// Space: O(N * M)

export function longestCSubseq_DP(s1: string, s2: string): number {
  const N1 = s1.length
  const N2 = s2.length
  if (N1 === 0 || N2 === 0) {
    return 0
  }
  const DP = new Array(N1 + 1).fill(0).map(() => new Array(N2 + 1).fill(0))
  let maxLen = 0
  for (let i = 1; i <= N1; i += 1) {
    for (let j = 1; j <= N2; j += 1) {
      if (s1[i - 1] === s2[j - 1]) {
        DP[i][j] = 1 + DP[i - 1][j - 1]
      } else {
        DP[i][j] = Math.max(DP[i - 1][j], DP[i][j - 1])
      }
      maxLen = Math.max(maxLen, DP[i][j])
    }
  }
  return maxLen
}

//--- r1 ---//
//
// DP[i][j] - length of the longest common subsequence for s1 ending at index i-1;
//  s2 ending at index j-1;
// The difference from longest common substring is that in subsequence, chars need not to
//  be next to each other;
// Thus, we can always grow the length based on DP[i-1][j-1], DP[i][j-1] and DP[i-1][j]
// Deduction:
// 1. if s1[i-1] === s2[j-1]:
//  DP[i][j] = 1 + DP[i-1][j-1]
// 2. else:
//  DP[i][j] = max(DP[i-1][j], DP[i][j-1])
// find the global max in the maxtrix
// Base Case:
//  DP[i][j] = 0
//
// Time: O(N * M)
// Space: O(N * M)

export function LCSubseq(s1: string, s2: string): number {
  const N1 = s1.length
  const N2 = s2.length
  if (N1 === 0 || N2 === 0) {
    return 0
  }
  const DP = new Array(N1 + 1).fill(0).map(() => new Array(N2 + 1).fill(0))
  let maxLen = 0
  for (let i = 1; i <= N1; i += 1) {
    for (let j = 1; j <= N2; j += 1) {
      if (s1[i - 1] === s2[j - 1]) {
        DP[i][j] = 1 + DP[i - 1][j - 1]
      } else {
        DP[i][j] = Math.max(DP[i - 1][j], DP[i][j - 1])
      }
      maxLen = Math.max(maxLen, DP[i][j])
    }
  }
  return maxLen
}
