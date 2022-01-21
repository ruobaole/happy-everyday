// https://www.educative.io/courses/grokking-the-coding-interview/gxrnL0GQGqk
//
// DP[i][sum] - if we can find a subset with sum === sum within the first i elements in
//  the array
// Dedection Rule:
// 1) try to include the i-th element in the sebset
//  if ni <= sum -- return DP[i-1][sum - ni]
// 2) try not to include the i-th element
//  return DP[i-1][sum]
// Base Case:
//  DP[i][0] for all the i should be true, because we can always exclude all the
//  elements to get a subset with sum 0
//  DP[0][sum] = n0 === sum
// Return: DP[num.length - 1][sum]
// As can be seen, to get DP[i][s], we only need to refer the previous row of i-1
//  and columns (sum) to the left of the current s
// Thus, we actually only need one row -- DP[sum]
//  DP[sum] is inited with n0 === sum
//  Then, try filling the DP from right to left.
// In this way, when we are referring DP[i-1][s], just refer the current DP[s]
//
// Time: O(N * S)
// Space: O(N)

export const subsetSum = (num: number[], sum: number): boolean => {
  const DP = new Array(sum + 1).fill(false)
  for (let i = 0; i < num.length; i += 1) {
    for (let s = sum; s >= 0; s -= 1) {
      if (i === 0) {
        DP[s] = num[i] === s
      } else {
        // 1) try excluding the i-th element
        // DP[i-1][s] in fact
        const tryExcluding = DP[s]
        // 2) try including the i-th element in the subset
        if (!tryExcluding && num[i] <= s) {
          DP[s] = DP[s - num[i]]
        }
      }
    }
  }
  return DP[sum]
}
