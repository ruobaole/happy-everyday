// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/m2yRjwxBY7A
//
// Brute Force
// Define prob(start, end) -- the length of the longest palindromic substring within
//   [start, end]
// For every start, end
// 1. if str[start] === str[end], we need to check if prob(start+1, end-1) === end - start - 1
//  if true -- the inner substring is also a palindrome -- return 2 + prob(start+1, end-1)
// 2. else, return max(prob(start + 1, end), prob(start, end - 1))
// Base case:
//  start > end: return 0
//  start === end: return 1
//
// Time: O(2^N) -- max 2 recursive calls in each sub-prob
// Space: O(N)

export function findLPSubstringLength_bruteForce(st: string): number {
  return findLPSubstringLength_bruteForceHelper(st, 0, st.length - 1)
}

function findLPSubstringLength_bruteForceHelper(
  st: string,
  start: number,
  end: number
): number {
  if (start > end) {
    return 0
  }
  if (start === end) {
    return 1
  }
  if (st[start] === st[end]) {
    const innerLen = findLPSubstringLength_bruteForceHelper(
      st,
      start + 1,
      end - 1
    )
    if (innerLen === end - start - 1) {
      return innerLen + 2
    }
  }
  const len1 = findLPSubstringLength_bruteForceHelper(st, start + 1, end)
  const len2 = findLPSubstringLength_bruteForceHelper(st, start, end - 1)
  return Math.max(len1, len2)
}

// Bottom-up DP
// Define: DP[start][end] true if the substring of [start, end] is palindrome
//  -- the length of the palindromic substring is naturally end - start + 1
// Hence, we filling in the DP matrix while updating a global maxLen
// Since start < end, we only need to fill the upper-right half of the matrix
// Base Case:
// DP[i][i] = true
// Deduction:
//  DP[start][end] = str[start] === str[end] && (DP[start + 1][end - 1] ||
//  the substring contains only 2 chars)
//  we should update maxLen = max(maxLen, end - start + 1) when the cell is true
// Notice that when filling the matrix, we need only the bottom-left cell, hence
//  we should filling the matix in order -- bottom up and left to right
//
// Time: O(N^2)
// Space: O(N^2)
// There's actually a non-DP O(N) solution for this problem ----
//   https://en.wikipedia.org/wiki/Longest_palindromic_substring Manacher's
//   algorithm

export function findLPSubstringLength_DP(st: string): number {
  if (st.length === 0) {
    return 0
  }
  if (st.length === 1) {
    return 1
  }
  const N = st.length
  const DP = new Array(N).fill(0).map(() => new Array(N).fill(false))
  for (let i = 0; i < N; i += 1) {
    DP[i][i] = true
  }
  let maxLen = 1
  for (let start = N - 1; start >= 0; start -= 1) {
    for (let end = start + 1; end < N; end += 1) {
      if (st[start] === st[end]) {
        if (DP[start + 1][end - 1] || end - start === 1) {
          DP[start][end] = true
          maxLen = Math.max(maxLen, end - start + 1)
        }
      }
    }
  }
  return maxLen
}
