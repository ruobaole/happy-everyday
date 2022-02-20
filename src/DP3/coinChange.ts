// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/gx763A3x9Pl
//
// DP[i][m] - number of ways to get to a total amount of m using the first i+1 coins (ith being the last)
// Deduction:
// 1) if coin_i <= m, try including the ith coin in the changes
// DP[i][m] += DP[i][m - coin[i]]
// 2) not including the ith coin
// DP[i][m] += DP[i - 1][m]
// Base Case:
// 1) DP[i][0] -- 1 because there is always 1 way for total money of 0
// 2) DP[0][m] -- 1 if m % coin[i] === 0
//
// Time: O(N * M)
// Space: O(N * M) -- can be reduced to O(2*M) if reusing to rows in turn

export function waysOfChanges(denominations: number[], total: number): number {
  if (total < 0) {
    return 0
  }
  const DP = new Array(denominations.length)
    .fill(0)
    .map(() => new Array(total + 1).fill(0))
  // Base Case
  DP[0][0] = 1
  for (let m = 1; m <= total; m += 1) {
    DP[0][m] = m % denominations[0] === 0 ? 1 : 0
  }
  for (let i = 1; i < denominations.length; i += 1) {
    for (let m = 0; m <= total; m += 1) {
      if (denominations[i] <= m) {
        DP[i][m] += DP[i][m - denominations[i]]
      }
      DP[i][m] += DP[i - 1][m]
    }
  }
  return DP[denominations.length - 1][total]
}
