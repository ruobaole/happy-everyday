// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/NE52PnMY376
//
// The problem can be expressed as ----
// countWays(n) = countWays(n - 1) + countWays(n - 3) + countWays(n - 4) for n >= 4
// base cases:
// countWays(0) = 1
// countWays(1) = 1; {1}
// countWays(2) = 1; {1, 1}
// countWays(3) = 2; {1, 1, 1}, {3}
// Thus, the fibbonacci pattern
//
// Time: O(N)
// Space: O(1)

export function countWays(n: number): number {
  if (n <= 2) {
    return 1
  }
  if (n === 3) {
    return 2
  }
  let minus1 = 2
  let minus2 = 1
  let minus3 = 1
  let cur = minus1
  for (let i = 4; i <= n; i += 1) {
    cur = minus1 + minus2 + minus3
    minus3 = minus2
    minus2 = minus1
    minus1 = cur
  }
  return cur
}
