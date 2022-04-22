// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/YQy7Lx79R0K
//
// we define problem(n) as the number of ways of reaching the top of n staircases
// problem(n) = problem(n-1) + problem(n-2) + problem(n-3) -- because we can either jump 1 staircase, 2
//  or 3 staircases for the first step
// for the base cases, we can have ----
// problem(0) = 1; problem(1) = 1; problem(2) = 2
// As can be seen, this follows the fibbonacci pattern, thus the problem can be solved
//  using the bottom-up DP with memory optimized to O(1)
//
// Time: O(N)
// Space: O(1)

export function countWays(n: number): number {
  if (n <= 1) {
    return 1
  }
  let ppp = 1
  let pp = 1
  let p = 2
  let cur = p
  for (let i = 3; i <= n; i += 1) {
    cur = ppp + pp + p
    ppp = pp
    pp = p
    p = cur
  }
  return cur
}

//--- r1 ---//
//
// Define prob(n) as the number of ways for reaching a staircase of n stairs;
// then, prob(n) = prob(n-1) + prob(n-2) + prob(n-3)
// Base Case:
// - prob(0) = 1
// - prob(1) = 1
// - prob(2) = 2
// As can be seen, the problem follows the fibbonacci pattern. Thus, it can be solved
//  using a bottom-up DP with O(1) space
//
// Time: O(N)
// Space: O(1)

export function countWays_r1(n: number): number {
  if (n < 0) {
    return 0
  }
  if (n <= 1) {
    return 1
  }
  // prob(0)
  let ppp = 1
  // prob(1)
  let pp = 1
  // prob(2)
  let p = 2
  let cur = p
  while (n > 2) {
    cur = ppp + pp + p
    ppp = pp
    pp = p
    p = cur
    n -= 1
  }
  return cur
}
