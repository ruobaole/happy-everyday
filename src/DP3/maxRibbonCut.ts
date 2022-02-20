// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/YQVZJx1k0WY
//
// DP[i][l] - max number of pieces to get total length of l with the first i+1 possible pieces
//  (-1 if the length cannot be get using the pieces)
// Deduction:
// 1) if lengths[i] <= l, try including at least 1 piece indexed i
//  if DP[i][l - lengths[i]] > -1, DP[i][l - lengths[i]] + 1
//  else -1
// 2) try not including any of the piece indexed i
//  DP[i-1][l]
// if any of the choices is -1, DP[i][l] is the other one
// else: DP[i][l] = max(choice1, choice2)
// Base Case:
// 1) DP[i][0] = 0 for all i, because we don't need any piece for length 0
// 2) DP[0][l] = l % lengths[0] === 0 ? l / lengths[0] : -1
//
// Time: O(N * L)
// Space: O(N * L)

export function maxRibbonCut(ribbonLengths: number[], total: number): number {
  if (total < 0) {
    return -1
  }
  const N = ribbonLengths.length
  const DP = new Array(N).fill(-1).map(() => new Array(total + 1).fill(-1))
  DP[0][0] = 0
  for (let l = 1; l <= total; l += 1) {
    DP[0][l] = l % ribbonLengths[0] === 0 ? l / ribbonLengths[0] : -1
  }
  for (let i = 1; i < N; i += 1) {
    for (let l = 0; l <= total; l += 1) {
      let cnt1 = -1
      if (ribbonLengths[i] <= l) {
        if (DP[i][l - ribbonLengths[i]] > -1) {
          cnt1 = DP[i][l - ribbonLengths[i]] + 1
        }
      }
      const cnt2 = DP[i - 1][l]
      DP[i][l] = Math.max(cnt1, cnt2)
    }
  }
  return DP[N - 1][total]
}
