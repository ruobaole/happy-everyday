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

//--- r1 ---//
//
// Define the prob(i) as the max wealth we can get by stealing from
//  the first i houses;
// To get prob(i), we need to consider 2 cases --
// 1) stealing from the i-1 th house; so that we have to skip the i-2 th house;
//  it is equivalent of prob(i-2) + wealth[i-1]
// 2) not stealing from the i-1 th house; the wealth should equal
//  prob(i-1)
// prob(i) = max(case1, case2)
// Base Case:
//  1) prob(0) = 0 no wealth can get if no houses
//  2) prob(1) = wealth[0]
// As can be seen, the deduction rule follows the fibonacci pattern; thus, we can
//  save the space by reusing 2 constances -- prev, prevprev
//
// Time: O(N)
// Space: O(1)

export function findMaxSteal_r1(wealth: number[]): number {
  if (wealth.length === 0) {
    return 0
  }
  if (wealth.length === 1) {
    return wealth[0]
  }
  // prob(0)
  let prevprev = 0
  // prob(1)
  let prev = wealth[0]
  let cur = prev
  for (let i = 2; i <= wealth.length; i += 1) {
    cur = Math.max(prevprev + wealth[i], prev)
    prevprev = prev
    prev = cur
  }
  return cur
}
