// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/NE0yNJ1rZy6
//
// DP[i][m] -- the min number of coins needed to make amount of m using the first i+1 coins
//  (-1 if cannnot make that amount)
// Deduction:
// 1) if coins[i] <= m, try including at least one coin[i] in the changes
//  DP[i][m - coin[i]] === -1 ? -1 : DP[i][m - coin[i]] + 1
// 2) try not including any of the coin[i]
//  DP[i-1][m]
// If any of the choices is -1, DP[i][m] is the other choice
// else, DP[i][m] = min(choice1, choice2)
// Base Case:
// 1) DP[i][0] = 0 -- becasue to get amount 0, we do not need any coin
// 2) DP[0][m] = m % coin[0] === 0 ? m / coin[0] : -1
//
// Time: O(N * M)
// Space: O(N * M) or reduced to O(2 * M)

export function minCoinChange(denominations: number[], total: number): number {
  if (total < 0) {
    return -1
  }
  const N = denominations.length
  const DP = new Array(N).fill(-1).map(() => new Array(total + 1).fill(-1))
  DP[0][0] = 0
  for (let m = 1; m <= total; m += 1) {
    DP[0][m] = m % denominations[0] === 0 ? m / denominations[0] : -1
  }
  for (let i = 1; i < N; i += 1) {
    for (let m = 0; m <= total; m += 1) {
      let cnt1 = -1
      if (denominations[i] <= m) {
        if (DP[i][m - denominations[i]] > -1) {
          cnt1 = DP[i][m - denominations[i]] + 1
        }
      }
      const cnt2 = DP[i - 1][m]
      if (cnt1 === -1) {
        DP[i][m] = cnt2
      } else if (cnt2 === -1) {
        DP[i][m] = cnt1
      } else {
        DP[i][m] = Math.min(cnt1, cnt2)
      }
    }
  }
  return DP[N - 1][total]
}
