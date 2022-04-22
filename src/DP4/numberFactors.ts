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

//--- r1 ---//
//
// Define prob(n) as number of ways to get a sum of n;
//  prob(n) = prob(n - 1) + prob(n - 3) + prob(n - 4)
// Base Case:
//  prob(0) = 1 -- because we want prob(4) to be 4
//  prob(1) = 1
//  prob(2) = 1
//  prob(3) = 2
// As can be seen, the problem follows the fibbonacci pattern,
// Thus, it can be solved using a bottom-up DP in O(1) time;
//
// Time: O(N)
// Space: O(1)

export function countWays_r1(n: number): number {
  if (n <= 0) {
    return 0
  }
  if (n <= 2) {
    return 1
  }
  let minus4 = 1
  let minus3 = 1
  let minus2 = 1
  let minus1 = 2
  let cur = minus1
  while (n > 3) {
    cur = minus1 + minus3 + minus4
    minus4 = minus3
    minus3 = minus2
    minus2 = minus1
    minus1 = cur
    n -= 1
  }
  return cur
}
