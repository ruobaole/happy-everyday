// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/3jjLPyLGnAR
//
// Brute Force
// The brute force solution sould be to compare each char in s1 with each char in s2
//  get the SCS starting from char1 and char2;
// Define prob(i1, i2) -- len of the the SCS for substring in s1 starting from i1 and
//  substring in s2 starting from i2
// 1. if s1[i1] === s2[i2] the 2 chars equals
//  return 1 + prob(i1 + 1, i2 + 1)
// 2. else, 2 choices -- either skip one char from s1, or skip one char from s2
//  get the one with the smaller length
//  return 1 + min(prob(i1 + 1, i2), prob(i1, i2 + 1))
// Base Case:
//  if any of the indices reach to the end, we should return the length
//  of the other strings remaining length -- s2.length - i2
//  because we have to include the subsequence
//
// Time: O(2^(M + N)) -- max 2 branches at each level
// Space: O(M + N)

export function findLenSCS_bruteforce(s1: string, s2: string): number {
  return findLenSCS_bruteforceHelper(s1, s2, 0, 0)
}

function findLenSCS_bruteforceHelper(
  s1: string,
  s2: string,
  i1: number,
  i2: number
): number {
  if (i1 === s1.length) {
    return s2.length - i2
  }
  if (i2 === s2.length) {
    return s1.length - i1
  }
  if (s1[i1] === s2[i2]) {
    return 1 + findLenSCS_bruteforceHelper(s1, s2, i1 + 1, i2 + 1)
  }
  return (
    1 +
    Math.min(
      findLenSCS_bruteforceHelper(s1, s2, i1 + 1, i2),
      findLenSCS_bruteforceHelper(s1, s2, i1, i2 + 1)
    )
  )
}

// Bottom up DP
// DP[i][j] - the length of the SCS for substring s1[0, i+1] and s2[0, j+1]
// (i and j are length)
// Deduction:
// 1) if s1[i-1] === s2[j-1] -> the 2 chars matches -> only one more char
//  DP[i - 1][j - 1] + 1
// 2) else
//  1 + min(DP[i - 1][j], DP[i][j - 1])
// Base Case:
// 1) DP[0][j] = j
// 2) DP[i][0] = i
// Return DP[s1.length][s2.length]
//
// Time: O(N * M)
// Space: O(N * M) although can be reduced to O(M) if reusing the prev and cur
//  rows

export function findLenSCS_DP(s1: string, s2: string): number {
  const len1 = s1.length
  const len2 = s2.length
  if (len1 === 0) {
    return len2
  }
  if (len2 === 0) {
    return len1
  }
  const DP = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0))

  for (let i = 0; i <= len1; i += 1) {
    for (let j = 0; j <= len2; j += 1) {
      if (i === 0) {
        DP[i][j] = j
      } else if (j === 0) {
        DP[i][j] = i
      } else {
        if (s1[i - 1] === s2[j - 1]) {
          DP[i][j] = DP[i - 1][j - 1] + 1
        } else {
          DP[i][j] = Math.min(DP[i - 1][j], DP[i][j - 1]) + 1
        }
      }
    }
  }
  return DP[len1][len2]
}
