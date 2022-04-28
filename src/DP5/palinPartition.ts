// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/gxxqrE2kKrY
//
// Brute Force
// Define problem: prob(start, end) -- min partition for substring within [start, end]
// To get prob(start, end):
// 1. check if substring(start, end) is a palindrome -- 0 cut needed
// 2. if not, we need to iterate through all possible 'last cut' --
//  that is, iterate i within [start, end], [start, i] is a palindrome
//  update the minCut for the current problem -- min(minCut, 1 + prob(i + 1, end))
// We use while loop to check if substring(i, j) is a palindrome
//
// Time: O(2^N)
// Space: O(N)

export function minPalinPartition_bruteForce(st: string): number {
  return minPalinPartition_bruteForceHelper(st, 0, st.length - 1)
}

function isPalin(st: string, start: number, end: number): boolean {
  while (start >= end) {
    if (st[start] !== st[end]) {
      return false
    }
    start += 1
    end -= 1
  }
  return true
}

function minPalinPartition_bruteForceHelper(
  st: string,
  start: number,
  end: number
): number {
  if (start >= end || isPalin(st, start, end)) {
    return 0
  }
  // max cut is the string length - 1
  let minCut = end - start
  for (let i = start; i <= end; i += 1) {
    if (isPalin(st, start, i)) {
      // the left part is palindrome -- valid last cut
      minCut = Math.min(
        minCut,
        1 + minPalinPartition_bruteForceHelper(st, i + 1, end)
      )
    }
  }
  return minCut
}

// Bottom Up
// We know that we can use a DP[start][end] to memorize if substring(start, end)
//  is a palindrome
// Then, the way to get the minCut is by performing another DP --
//  minCut[i] -- is the minCut needed for substring [i, string.length - 1]
// Traverse the matrix again from bottom-up, right-left while keep updating minCut[start]
// While traversing, we are in fact permulating all possible last cut -- [start, end]
// if substring[start, end] is palin -- valid last cur:
//   update minCut[start] = min(minCut[start], 1 + minCut[end+1])
// if not palin, we have to cut all the chars apart
//   minCut[start] = string.length - 1
// return minCut[0]
//
// Time: O(N^2)
// Space: O(N^2)

export function minPalinPartition_DP(st: string) {
  if (st.length === 0) {
    return 0
  }
  const N = st.length
  const isPalin = new Array(N).fill(false).map(() => new Array(N).fill(false))
  for (let i = 0; i < N; i += 1) {
    isPalin[i][i] = true
  }
  for (let start = N - 1; start >= 0; start -= 1) {
    for (let end = start + 1; end < N; end += 1) {
      if (st[start] === st[end]) {
        if (isPalin[start + 1][end - 1] || start - end === 1) {
          isPalin[start][end] = true
        }
      }
    }
  }

  const minCut = new Array(N).fill(N - 1)
  for (let start = N - 1; start >= 0; start -= 1) {
    let cuts = N - 1
    for (let end = N - 1; end >= start; end -= 1) {
      if (isPalin[start][end]) {
        if (end === N - 1) {
          cuts = 0
        } else {
          cuts = Math.min(cuts, 1 + minCut[end + 1])
        }
      }
    }
    minCut[start] = cuts
  }
  return minCut[0]
}

//--- r1 ---//
//
// We've already known that we can get matrix DP[start][end] -- true
//  if substring[start, end] is a palindrome;
// Then, we need another DP, to get minCut[start] -- the min number of cuts needed for
//  string within [start, string.length - 1]
// We just need to iterate the DP matrix once again, bottom->up, left->right, to permulate all possible
//  substring[start, end] and update minCut[start] at the same time.
// We see substring[start, end] as the potential last cut --
// We init minCut[start] as string.length-1 -- which is the largest possible number;
// If DP[start, end] is true -- is palindrome, then it can be the last cut
//  minCut[start] = min(minCut[start], minCut[end + 1] + 1)
//
// Time: O(N^2)
// Space: O(N^2)

export function minPalinPartition_r1(st: string): number {
  if (st.length === 0) {
    return 0
  }
  const N = st.length
  const isPalin = new Array(N).fill(false).map(() => new Array(N).fill(false))
  for (let i = 0; i < N; i += 1) {
    isPalin[i][i] = true
  }
  for (let start = N - 1; start >= 0; start -= 1) {
    for (let end = start + 1; end < N; end += 1) {
      if (
        st[start] === st[end] &&
        (end === start + 1 || isPalin[start + 1][end - 1])
      ) {
        isPalin[start][end] = true
      }
    }
  }

  const minCut = new Array(N).fill(N - 1)
  for (let start = N - 1; start >= 0; start -= 1) {
    for (let end = start + 1; end < N; end += 1) {
      if (isPalin[start][end]) {
        if (end === N - 1) {
          minCut[start] = 0
        } else {
          minCut[start] = Math.min(minCut[start], minCut[end + 1] + 1)
        }
      }
    }
  }

  return minCut[0]
}
