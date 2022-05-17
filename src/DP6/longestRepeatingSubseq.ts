// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/7npz2VooPl1
//
// Brute Force
// This is very much similar to the problem "longest common subsequence"
// The only difference is that 1) we're looking for the LCSubseq among the array and
//  itself; 2) the indices of the matching chars cannot be the same
// Hence, we define prob(i, j) - the len of the LRS for substrings str[i, end] and
//  str[j, end];
// if the 2 chars matched and i !== j:
//  return prob(i + 1, j + 1) + 1
// else, try skipping one char from both the substrings and continue
//  return max(prob(i+1, j), prob(i, j+1))
//
// Time: O(2^N) - max 2 branches each level
// Space: O(N)

export function lenLRS_bruteforce(str: string): number {
  return lenLRS_bruteforceHelper(str, 0, 0)
}

function lenLRS_bruteforceHelper(str: string, i: number, j: number): number {
  if (i === str.length || j === str.length) {
    return 0
  }
  if (i !== j && str[i] === str[j]) {
    return 1 + lenLRS_bruteforceHelper(str, i + 1, j + 1)
  }
  return Math.max(
    lenLRS_bruteforceHelper(str, i + 1, j),
    lenLRS_bruteforceHelper(str, i, j + 1)
  )
}

//--- r1 ---//
//
// The problem is similar to "longest common subsequence"
// We're to find the LCSubseq for a string and itself, and the indices cannot be the same;
// DP[i][j] -- length of the longest repeating subseq. for the first i elements of the string and
//  the first j elements of the string
// Deduction:
// 1) if the 2 chars match -- str[i-1] === str[j-1] AND i !== j
//  DP[i][j] = 1 + DP[i-1][j-1]
// 2) else, try eliminating one chars from each of the substrings and get the longer one
//  DP[i][j] = max(DP[i-1][j], DP[i][j-1])
// Base Case:
//  DP[0][j] = 0
//  DP[i][0] = 0
// return DP[N][N]
//
// Time: O(N*N)
// Space: O(N*N) -- although can be reduced to O(N) by reusing 2 rows

export function lenLRS(str: string): number {
  if (str.length === 0) {
    return 0
  }
  const DP = new Array(str.length + 1)
    .fill(0)
    .map(() => new Array(str.length + 1).fill(0))

  for (let i = 1; i <= str.length; i += 1) {
    for (let j = 1; j <= str.length; j += 1) {
      if (str[i - 1] === str[j - 1] && i !== j) {
        DP[i][j] = DP[i - 1][j - 1] + 1
      } else {
        DP[i][j] = Math.max(DP[i - 1][j], DP[i][j - 1])
      }
    }
  }

  return DP[str.length][str.length]
}
