// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/gkX4prBkRLj
//
// The problem is to find the length of the longest palindromic subsequence -- len LPS
// minDeletion = str.length - len(LPS)
// Because, we can delete all chars that is not in the LPS
// The solution also works for problem -- find the max number of chars to insert in making the
//  substring a palindrome
//
// Time: O(N^2)
// Space: O(N^2)

export function minDeletion(st: string): number {
  if (st.length === 0) {
    return 0
  }
  const N = st.length
  const DP = new Array(N).fill(0).map(() => new Array(N).fill(0))
  for (let i = 0; i < N; i += 1) {
    DP[i][i] = 1
  }
  for (let start = N - 1; start >= 0; start -= 1) {
    for (let end = start + 1; end < N; end += 1) {
      if (st[start] === st[end]) {
        DP[start][end] = DP[start + 1][end - 1] + 2
      } else {
        DP[start][end] = Math.max(DP[start + 1][end], DP[start][end - 1])
      }
    }
  }
  return N - DP[0][N - 1]
}

//--- r1 ---//
// Minimum Insertions
// 1. Get the length of the longest palindromatic subsequence -- LPS
// 2. string.length - LPS
// Because for those that are in the string but not in the subsequence, if they have their
//  partner, we can make the string a palin;
//
// Time: O(N^2)
// Space: O(N^2)

function getLPSLength(st: string): number {
  // st.length > 0
  // DP[i][j] -- length of the LPS within substring[i, j]
  const DP = new Array(st.length)
    .fill(0)
    .map(() => new Array(st.length).fill(0))

  for (let i = 0; i < st.length; i += 1) {
    DP[i][i] = 1
  }

  for (let i = st.length - 1; i >= 0; i -= 1) {
    for (let j = i + 1; j < st.length; j += 1) {
      if (st[i] === st[j]) {
        DP[i][j] = 2 + DP[i + 1][j - 1]
      } else {
        DP[i][j] = Math.max(DP[i + 1][j], DP[i][j - 1])
      }
    }
  }
  return DP[0][st.length - 1]
}

export function minInsertion(st: string): number {
  if (st.length === 0) {
    return 0
  }
  return st.length - getLPSLength(st)
}
