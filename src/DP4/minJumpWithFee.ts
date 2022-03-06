// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/7nDNy6JDP1G
//
// The fibbonacci pattern is ----
// prob(i) = min(prob(i - 1) + fee(i - 1), prob(i - 2) + fee(i - 2), prob(i - 3) + fee(i - 3))
// Base Case:
// 1. prob(0) = 0
// 2. prob(1) = fee(0)
// 3. prob(2) = min(prob(1) + fee(1), fee(0))
//
// Time: O(N)
// Space: O(N)

export function findMinFee(fee: number[]): number {
  if (fee.length === 0) {
    return 0
  }
  const DP = new Array(fee.length).fill(0)
  DP[1] = fee[1]
  if (fee.length < 2) {
    return fee[0]
  }
  DP[2] = Math.min(DP[1] + fee[1], fee[0])
  for (let i = 3; i < fee.length; i += 1) {
    DP[i] = Math.min(
      DP[i - 1] + fee[i - 1],
      DP[i - 2] + fee[i - 2],
      DP[i - 3] + fee[i - 3]
    )
  }
  return DP[fee.length - 1]
}
