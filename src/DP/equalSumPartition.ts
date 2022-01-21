// https://www.educative.io/courses/grokking-the-coding-interview/g7QYlD8RwRr
//
// To find if we can partition the numbers into 2 sets with equal sum, we can first sum
//  all numbers --> S, and then try to find the subset with sum equals S/2 in the
//  number array
// Thus, the problem becomes -- try to find a subset whose sum is S/2
// For every number element, we can choose between if we include the number in the sum or
//  not.
// The problem can be defined as problem(i, S): boolean -- whether we can find the subset from
//   the first i elements whose sum equals S
// To get problem(i, S) --
//   1. try to include ni -- if ni <= S (all elements are positive)
//   return problem(i-1, S-ni)
//   2. try to exclude ni: return problem(i-1, S)
//   return 1 || 2
// It can be seen that, each problem() is determined by some problem with smaller i and s
// Thus, we can store problem(i, S) into a matrix DP[i][S]
// Base Case:
// - DP[i][0] = true -- because we can always exclude the number to get 0 sum
// - DP[0][S] = n0 === S
// Iteration: try filling the matrix top -> down, left -> right
// return DP[num.length-1][S]
//
// Time: O(N * S)
// Space: O(N * S)

export const canPartition = (num: number[]): boolean => {
  // Assume that all numbers are positive integers
  let S = num.reduce((sum, n) => sum + n)
  if (S % 2 !== 0) {
    return false
  }
  S /= 2
  const DP: boolean[][] = new Array(num.length).fill(false).map(() => {
    return new Array(S + 1).fill(false)
  })
  for (let i = 0; i < num.length; i += 1) {
    for (let j = 0; j <= S; j += 1) {
      if (j === 0) {
        DP[i][j] = true
        continue
      }
      if (i === 0 && j !== 0) {
        DP[i][j] = num[0] === j
        continue
      }
      // 1. try including this element
      if (num[i] <= j) {
        DP[i][j] = DP[i - 1][j - num[i]]
      } else {
        // 2. try exluding the element
        DP[i][j] = DP[i - 1][j]
      }
    }
  }
  return DP[num.length - 1][S]
}
