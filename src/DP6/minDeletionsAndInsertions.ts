// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/m27OkE8D08O
//
// 1. find the length of the LCSubsequence of s1 and s2 -- say length is c
// 2. we need to first delete all elements from s1 that are not in c
//   minDel = len1 - c
// 3. now, insert elements that is in s2 and not in c to c
//   minInser = len2 - c
// The way to save space in DP is by reusing 2 rows, one as the cur row
//   and one as the last row
// We only need to convert i to the row number of current row --
// thisI = i % 2
// lastI = (i - 1) % 2
//
// Time: O(N * M)
// Space: O(N)

export function minDeletionsAndInsertions(
  s1: string,
  s2: string
): [number, number] {
  let minDel = s1.length
  let minInser = s2.length
  const N1 = s1.length
  const N2 = s2.length
  if (N1 === 0) {
    return [0, minInser]
  }
  if (N2 === 0) {
    return [minDel, 0]
  }
  const DP = [new Array(N2 + 1).fill(0), new Array(N2 + 1).fill(0)]
  let c = 0
  for (let i = 1; i <= N1; i += 1) {
    const thisI = i % 2
    const lastI = (i - 1) % 2
    for (let j = 1; j <= N2; j += 1) {
      if (s1[i - 1] === s2[j - 1]) {
        DP[thisI][j] = 1 + DP[lastI][j - 1]
      } else {
        DP[thisI][j] = Math.max(DP[lastI][j], DP[thisI][j - 1])
      }
      c = Math.max(c, DP[thisI][j])
    }
  }
  minDel = N1 - c
  minInser = N2 - c
  return [minDel, minInser]
}

//--- r1 ---//
//
// 1. find the length of the longest common subsequence of s1 and s2 -- say the c
// 2. delete all chars in s1 that is not in LCSubseq
//  minDel = s1.length - c
// 3. insert all chars to c that is in s2 but not in c
//  minInsert = s2.length - c
// when finding c, we need to refer to DP[i-1][j-1], DP[i-1][j] and DP[i][j-1]
// the way to save space is by reusing 2 rows, one as the curRow, the other as the nextRow
// thisI = i % 2
// lastI = (i - 1) % 2
//
// Time: O(N * M)
// Space: O(M)

function findLCSubseq(s1: string, s2: string): number {
  const N1 = s1.length
  const N2 = s2.length
  if (N1 === 0 || N2 === 0) {
    return 0
  }
  const DP = [new Array(N2).fill(0), new Array(N2).fill(0)]
  let thisI = 1
  let lastI = 0
  let maxLen = 0
  for (let i = 1; i <= N1; i += 1) {
    for (let j = 1; j <= N2; j += 1) {
      thisI = i % 2
      lastI = (i - 1) % 2
      if (s1[i - 1] === s2[j - 1]) {
        DP[thisI][j] = DP[lastI][j - 1] + 1
      } else {
        DP[thisI][j] = Math.max(DP[lastI][j], DP[thisI][j - 1])
      }
      maxLen = Math.max(maxLen, DP[thisI][j])
    }
  }
  return maxLen
}

export function minDeletionsAndInsertions_r1(
  s1: string,
  s2: string
): [number, number] {
  const c = findLCSubseq(s1, s2)
  return [s1.length - c, s2.length - c]
}
