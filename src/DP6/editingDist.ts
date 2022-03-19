// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/gx2QMvEorYY
//
// Define DP[i][j] - the min editing distance for to transform substring s1[0, i-1] to s2[0, j-1];
// (i, j are lengths)
// Deduction Rule:
// 1. if the 2 chars match
//   DP[i-1][j-1]
// 2. else, we try the 3 operations and pick the smallest one
//  1 + min(DP[i-1][j-1], DP[i-1][j], DP[i][j-1])
// Base Case:
// DP[0][j] = j -- we have to insert chars to make empty string match with non-empty one
// DP[i][0] = i
// return DP[s1.length][s2.length]
//
// Time: O(N*M)
// Space: O(N*M)

export function editingDist(s1: string, s2: string): number {
  const N = s1.length
  const M = s2.length
  const DP = new Array(N + 1).fill(0).map(() => new Array(M + 1).fill(0))
  for (let i = 0; i <= N; i += 1) {
    DP[i][0] = i
  }
  for (let j = 0; j <= M; j += 1) {
    DP[0][j] = j
  }
  for (let i = 1; i <= N; i += 1) {
    for (let j = 1; j <= M; j += 1) {
      if (s1[i - 1] === s2[j - 1]) {
        DP[i][j] = DP[i - 1][j - 1]
      } else {
        DP[i][j] =
          Math.min(DP[i - 1][j], Math.min(DP[i][j - 1], DP[i - 1][j - 1])) + 1
      }
    }
  }
  return DP[N][M]
}
