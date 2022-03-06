// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/gx6jmzrMwgZ
//
// Bottom-up DP | memory optimization
// fibbo(0) = 0; fibbo(1) = 1
// fibbo(n) = fibbo(n - 1) + fibbo(n - 2)
// We do not actually need the whole array, but reusing the n-1 and n-2 number would
//  be enough
//
// Time: O(N)
// Space: O(1)

export function fibbonacci(n: number): number {
  if (n < 2) {
    return n
  }
  let prev = 1
  let prevprev = 0
  let cur = prev
  for (let i = 2; i <= n; i += 1) {
    cur = prev + prevprev
    prevprev = prev
    prev = cur
  }
  return cur
}
