// https://www.educative.io/courses/grokking-the-coding-interview/qZWW7Ny0Dk3
//
// For all the numbers with signs, we seperate them into two groups -- with plus signs
//  and with minus signs
// Then, we can reform the equation as: e.g. (1 + 3) - (1 + 2) = 1 -> sum(s1) - sum(s2) = s
// Hence, we are looking for ways to separate the array into two subsets, and the difference
//  of the subsets' sum is s
// Let's see if we can furtherly transform the problem to findSum problems.
// Observe that: sum(s1) + sum(s2) = totalSum
// We add totalSum to the both sides of the equation
// sum(s1) - sum(s2) + sum(s1) + sum(s2) = s + totalSum
// 2sum(s1) = s + totalSum
// sum(s1) = (s + totalSum) / 2
// Hence, the problem is: count the number of subsets with sum equals to (s + totalSum) / 2
// We can use the solution of coundSum(num, s)
//
// Time: O(N * (s + totalSum))
// Space: O(s + totalSum)

//--- r1 ---//

// NOTE that we can always separate the numbers into 2 parts -- ones with + signs
//  and ones with - signs.
// Put parenthesis around all numbers with - signs, we can reform the equation into
//  'the difference of 2 sums' ----
// e.g. {+1-1-2+3} -> 1+3 - (2+2) === s
// sum1 - sum2 = s
// if we add sum1 + sum2 (which is totalSum) to both sides of the equation
// sum1 - sum2 + sum1 + sum2 = s + totalSum
// 2sum1 = s + totalSum
// sum1 = (s + totalSum) / 2
// We are looking for ways of getting subsets with targetSum = sum1
// DP[i][sum] - number of ways of getting subsets with sum using the first i elements
// Deduction:
//  1. try not including the i-th element
//  if DP[i-1][sum] > 0: DP[i][sum] = DP[i-1][sum], else DP[i][sum] = 0
//  2. try including the i-th element:
//  if DP[i][sum] += DP[i-1][sum-num[i]]
// Return DP[num.length - 1][sum]
// Base Case:
// 1. DP[i][0] = 1
// 2. DP[0][sum] = num[0] === sum ? 1 : 0
//
// Time: O(N * SUM)
// Space: O(SUM)

export const findTargetSubsets_r1 = (num: number[], s: number): number => {
  // Assume that all numbers are positive
  const totalSum = num.reduce((sum, n) => sum + n)
  const targetSum = (s + totalSum) / 2
  const DP = new Array(targetSum + 1).fill(0)
  DP[0] = 1
  for (let sum = 1; sum <= targetSum; sum += 1) {
    DP[sum] = num[0] === sum ? 1 : 0
  }
  for (let i = 1; i < num.length; i += 1) {
    for (let sum = targetSum; sum >= 0; sum -= 1) {
      if (num[i] <= sum) {
        DP[sum] += DP[sum - num[i]]
      }
    }
  }
  return DP[targetSum]
}
