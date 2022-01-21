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

export const findTargetSubsets = (num: number[], s: number): number => {}
