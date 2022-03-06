// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/m2EOxJ0Nkp3
//
// Say that DP[i] is the max wealth get from i houses
// For each i, we have 2 choices:
// 1) stealing from the i-th house (have to skip i - 1)
//  DP[i - 2] + wealth[i - 1] (wealth[i-1] is the wealth of the i-th house)
// 2) not stealing from the i-th house (skip the ith house)
// DP[i - 1]
// DP = max(case1, case2)
// Base Case:
// DP[0] = 0 (nothing if 0 houses)
// DP[1] = wealth[0]
// return DP[wealth.length]
// NOTICE that we only need i-2 and i-1 in every iteration, hence, the space
//  can be saved by recording and updating only the prev and prevprev

export function findMaxSteal(wealth: number[]): number {
  if (wealth.length === 0) {
    return 0
  }
  if (wealth.length < 2) {
    return wealth[0]
  }
  // DP[0]
  let prevprev = 0
  // DP[1]
  let prev = wealth[0]
  let cur = prev
  for (let i = 2; i <= wealth.length; i += 1) {
    cur = Math.max(prevprev + wealth[i - 1], prev)
    prevprev = prev
    prev = cur
  }
  return cur
}
