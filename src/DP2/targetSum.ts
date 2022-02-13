// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/7nAOY4oy64A
//
// If we group the numbers with + sign and numbers with - signs by the sign the have, we can
//  have 2 subsets -- set1 and set2
// The final equation is actually identical with sum(set1) - sum(set2) = s
// i.e. sum1 - sum2 = s
// add totalSum (i.e. sum1 + sum2) to both sides of the equation ----
// 2 * sum1 = s + totalSum
// Thus, sum1 = (s + totalSum) / 2
// We're actually asked to find count of subsets with sum equals (s + totalSum) / 2
// Hence the same as the 'count subsets with sum' problem
//
// Time: O(N * SUM)
// Space: O(SUM)

export function totalWaysOfTargetSum(num: number[], s: number): number {}
