// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/xV73LEk5rx9
//
// Bottom-up DP
// Define DP[start][end] -- true if the substring [start, end] is a palindrome
// We filling the upper-right half of the DP matrix in order bottom -> up, left -> right
//  while counting the palindroms
// Base Case:
//  DP[i][i] = true -- update cnt
// Deduction:
//  The only possible way that DP[start][end] is true is when
//  str[start] === str[end] && (DP[start + 1][end - 1] || only 2 chars)
//  now, update cnt += 1
//
// Time: O(N^2)
// Space:O(N^2)

export function countPalinSubstrings(st: string): number {
  if (st.length === 0) {
    return 0
  }
  const N = st.length
  const DP = new Array(N).fill(false).map(() => new Array(N).fill(false))
  let cnt = 0
  for (let i = 0; i < N; i += 1) {
    DP[i][i] = true
    cnt += 1
  }
  for (let start = N - 1; start >= 0; start -= 1) {
    for (let end = start + 1; end < N; end += 1) {
      if (st[start] === st[end]) {
        if (end - start === 1 || DP[start + 1][end - 1]) {
          DP[start][end] = true
          cnt += 1
        }
      }
    }
  }
  return cnt
}
