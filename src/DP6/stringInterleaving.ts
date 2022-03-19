// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/RMM68YXRwEK
//
// Define DP[i][j] -- true if substring m[0, i-1] and n[0, j-1] are the strings interleaving
//  of p's substring p[0, i+j-1]
// Because every chars in p has to be matched, we can infer p's index once we know m and n's index.
// Deduction:
//  1. if the current char in p matches with char in m
//  i.e. p[i+j-1] matches with m[i-1]
//  DP[i-1][j]
//  2. if the current char in p matches with char in n
//  DP[i][j-1]
//  any of the above scenario === true would make DP[i][j] true
// Base Case:
//  DP[0][0] = true
//  DP[i][0] - true if m[i-1] matches with p[i-1]
//  DP[0][j] - true if n[j-1] matches with p[j-1]
// return DP[M][N]
//
// Time: O(M * N)
// Space: O(M * N)

export function isStrInterleaving(m: string, n: string, p: string): boolean {
  const M = m.length
  const N = n.length
  const DP = new Array(M + 1).fill(true).map(() => new Array(N + 1).fill(false))
  DP[0][0] = true
  for (let i = 1; i <= M; i += 1) {
    DP[i][0] = m[i - 1] === p[i - 1]
  }
  for (let j = 1; j <= N; j += 1) {
    DP[0][j] = n[j - 1] === p[j - 1]
  }
  for (let i = 1; i <= M; i += 1) {
    for (let j = 1; j <= N; j += 1) {
      if (m[i - 1] === p[i + j - 1]) {
        if (DP[i - 1][j]) {
          DP[i][j] = true
        }
      }
      if (!DP[i][j] && n[j - 1] === p[i + j - 1]) {
        DP[i][j] = DP[i][j - 1]
      }
    }
  }
  return DP[M][N]
}
