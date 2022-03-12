// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/RMkk7NwE44R
//
// Brute Force
// Permulate all possible substrings and get the length of the longest matched
//  substrings
// Define: prob(i, j, cnt) -- the length of the longest common substrings with
//  str1 headed at index i, string2 headed at index j and there're cnt common
//  length before the 2 heads
// Recursion:
//  1) if s1[i] === s2[j], try include the 2 chars
//   len1 prob(i + 1, j + 1, cnt + 1)
//  2) else, try excluding a char from each of the substring
//   len2 = prob(i + 1, j, 0)
//   len3 = prob(i, j + 1, 0)
//   return max(len1, len2, len3)
// Base Case:
//   return cnt when i === s1.length || j === s2.length
//
// Time: O(3^(M + N)) -- 3 branches at every level
// Space: O(M + N) -- call stack

export function longestCommonSubstring_bruteForce(
  s1: string,
  s2: string
): number {
  return longestCommonSubstring_bruteForceHelper(s1, s2, 0, 0, 0)
}

function longestCommonSubstring_bruteForceHelper(
  s1: string,
  s2: string,
  i: number,
  j: number,
  cnt: number
): number {
  if (i === s1.length || j === s2.length) {
    return cnt
  }
  let len1 = 0
  if (s1[i] === s2[j]) {
    len1 = longestCommonSubstring_bruteForceHelper(
      s1,
      s2,
      i + 1,
      j + 1,
      cnt + 1
    )
  }
  const len2 = longestCommonSubstring_bruteForceHelper(s1, s2, i + 1, j, 0)
  const len3 = longestCommonSubstring_bruteForceHelper(s1, s2, i, j + 1, 0)
  return Math.max(len1, Math.max(len2, len3))
}

// Bottom up DP
// Define DP[i][j] - length of common string ended at s1[i-1] and s2[j-1]
// Deduction:
//  if s1[i] === s2[j]: DP[i][j] = DP[i-1][j-1] + 1
//  else: DP[i][j] = 0
// Base Case:
//  DP[i][0] = 0; DP[0][j] = 0
// Filling the matrix while updating maxLen
// return maxLen
//
// Time: O(N*M)
// Notice that we can reduce the space to O(N) by reusing the row
// Because we need the left cells in the former row in filling each cell
// We should populating the row from right to left

export function longestCommonSubstring_DP(s1: string, s2: string): number {
  const N1 = s1.length
  const N2 = s2.length
  if (N1 === 0 || N2 === 0) {
    return 0
  }
  const DP = new Array(N2 + 1).fill(0)
  let maxLen = 0
  for (let i = 1; i <= N1; i += 1) {
    for (let j = N2; j > 0; j -= 1) {
      if (s1[i - 1] === s2[j - 1]) {
        DP[j] = DP[j - 1] + 1
        maxLen = Math.max(maxLen, DP[j])
      } else {
        DP[j] = 0
      }
    }
  }
  return maxLen
}
