// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/JY7yZ2VyJnP
//
// Brute Force
// We process every index in the str with every index in the pattern
// - If the 2 chars matched, we can continue process prob(strI + 1, patI + 1)
// - we can always skip one char from the string, because we're matching sequences, not
//  substrings; however, we cannot skip chars from pat -- because all chars in pat have
//  to be matched;
//  prob(strI + 1, patI)
// prob(strI, patI) is the sum of the above 2 branches
// Base Case:
// 1. if patI reaches to the end -- pattern matched!
//  return 1
// 2. if strI reaches to the end and patI does not -- cannot matche
//  return 0
//
// Time: O(2^(N + M))
// Space: O(N + M)

export function cntSPM_bf(str: string, pat: string): number {
  return cntSPM_bfHelper(str, pat, 0, 0)
}

function cntSPM_bfHelper(
  str: string,
  pat: string,
  strI: number,
  patI: number
): number {
  if (patI === pat.length) {
    // matched!
    return 1
  }
  if (strI === str.length) {
    // strI reaches to the end while patI not
    // -- cannot match
    return 0
  }
  let cnt1 = 0
  if (str[strI] === pat[patI]) {
    cnt1 = cntSPM_bfHelper(str, pat, strI + 1, patI + 1)
  }
  const cnt2 = cntSPM_bfHelper(str, pat, strI + 1, patI)
  return cnt1 + cnt2
}

// Bottom-up DP
// Define DP[i][j] as the cnt of SPM for substring str[0, i-1] and pat[0, j-1]
// (i and j are lengths)
// Each DP[i][j] is made up of 2 parts:
// 1. if the 2 chars matched; the cnt of DP[i-1][j-1]
// 2. we can always ignore the char in the str:
//   DP[i-1][j]
// Base Case:
// DP[0][j] = 0 -- empty chars cannot match with the pattern
// DP[i][0] = 1 -- empty patterns matches with every string
// Return DP[str.length][pat.length]
//
// Time: O(N * M)
// Space: O(N * M)

export function cntSPM_DP(str: string, pat: string): number {
  const N = str.length
  const M = pat.length
  const DP = new Array(N + 1).fill(0).map(() => new Array(M + 1).fill(0))
  for (let i = 0; i <= N; i += 1) {
    DP[i][0] = 1
  }
  for (let i = 1; i <= N; i += 1) {
    for (let j = 1; j <= M; j += 1) {
      if (str[i - 1] === pat[j - 1]) {
        DP[i][j] += DP[i - 1][j - 1]
      }
      DP[i][j] += DP[i - 1][j]
    }
  }
  return DP[N][M]
}

//--- r1 ---//
//
// DP[i][j] -- number of pattern match for the first i chars in string and the first j
//  chars in pat;
// Deduction:
// each DP[i][j] is made up of 2 parts --
// 1) if the 2 chars matched, the count is at least DP[i-1][j-1]
// 2) moreover, we can always ignore one char from the string
//  DP[i-1][j]
// add the 2 cases
// Base Case:
//  DP[0][j] = 0 -- no string cannot match with any pattern
//  DP[i][0] = 1 -- an empty pattern can match with any strings
// Return DP[N][M]
//
// Time: O(N * M)
// Space: O(N * M) -- although can be reduced to O(M) by reusing 2 rows

export function cntSPM(str: string, pat: string): number {
  const N = str.length
  const M = pat.length
  if (M === 0) {
    return 1
  }
  if (N === 0) {
    return 0
  }
  const DP = new Array(N + 1).fill(0).map(() => new Array(M + 1).fill(0))
  for (let i = 0; i <= N; i += 1) {
    DP[i][0] = 1
  }
  for (let i = 1; i <= N; i += 1) {
    for (let j = 1; j <= M; j += 1) {
      if (str[i - 1] === pat[j - 1]) {
        DP[i][j] += DP[i - 1][j - 1]
      }
      DP[i][j] += DP[i - 1][j]
    }
  }
  return DP[N][M]
}
