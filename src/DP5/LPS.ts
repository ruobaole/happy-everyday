// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/RMk1D1DY1PL
//
// The palindrom subsequence is defined by wrapping around the palindrome core
//  layer after layer
// Thus, the way to permulating palindrom subsequence while checking if it is a
//  palindrom is by permulating the start and end boundaries of the subsequence.
// For each pair of the start and end indices of the subsequence, we have 2 options:
// opt1. if the chars at start and end are the same, the length of the PS is
//   2 + recur(start + 1, end - 1)
// opt2. else, the length should be either the recursive call of eliminating the start
//  or the end element --
//   max(recur(start + 1, end), recur(start, end - 1))
// the current answer should be the max of the 2 options.
// Base Case:
//   if start > end: return 0
//   if start === end: return 1
//
// Time: O(2^N) - for each subtree, we eighter make 2 recursive calls or 1; if 2 recursive
//  calls -> 1 element is eliminating each time -> N elements -> 2^N
// Space: O(N) call stack

export function findLPS_bruteForce(st: string): number {
  return findLPS_bruteForceHelper(st, 0, st.length - 1)
}

function findLPS_bruteForceHelper(st: string, start: number, end: number) {
  if (start === end) {
    return 1
  }
  if (start > end) {
    return 0
  }
  if (st[start] === st[end]) {
    return 2 + findLPS_bruteForceHelper(st, start + 1, end - 1)
  }
  const len1 = findLPS_bruteForceHelper(st, start + 1, end)
  const len2 = findLPS_bruteForceHelper(st, start, end - 1)
  return Math.max(len1, len2)
}

// Bottom-up DP
// As can be seen, the problem can be identified using 2 params --
//  start and end
// Hence, DP[][] matrix can be drew
// And we only care about the upper-right half of the matrix (because
//  start <= end)
// Base Case:
//  DP[i][i] = 1 -- the diagonal is all ones
// Deduction Rule:
//  if st[start] === st[end]: DP[start][end] = 2 + DP[start + 1][end - 1]
//  else:
//  max(DP[start+1][end], DP[start][end-1])
// As can be seen, when filling the matrix, each time, only the
//  left cell, bottom cell, and left-bottom cell are needed
// Hence, the filling order should be bottom-up and left-right
// Return DP[0][st.length-1] at last
//
// Time: O(N*N)
// Space: O(N*N)

export function findLPS_DP(st: string): number {
  const N = st.length
  if (N === 0) {
    return 0
  }
  if (N === 1) {
    return 1
  }
  // DP - N * N
  const DP = new Array(N).fill(0).map(() => new Array(N).fill(0))
  for (let i = 0; i < N; i += 1) {
    DP[i][i] = 1
  }
  for (let start = N - 1; start >= 0; start -= 1) {
    for (let end = start + 1; end < N; end += 1) {
      if (st[start] === st[end]) {
        DP[start][end] = 2 + DP[start + 1][end - 1]
      } else {
        DP[start][end] = Math.max(DP[start + 1][end], DP[start][end - 1])
      }
    }
  }
  return DP[0][N - 1]
}

//--- r1 ---//
//
// Observation: in order to find the longest subsequence, we need to permulate all
//  all subsequence;
//  The way to permulate subsequence is by permulating its start and end indices;
//  Meaning that each subseq is identified using 2 params -- start, end
// Define DP[start][end] as the length of the LPS within str[start][end]
// Deduction:
// 1) if str[start] === str[end]
//  DP[start+1][end-1] + 2
// 2) else
//  max(DP[start+1][end], DP[start][end-1])
// Base Case:
//  as can be seen, we need to only fill the top-right triangle half of the matrix;
//  since end should be larger than start
//  DP[i][i] = 1 for all i
// For each cell, we need its left-bottom neighbor, left neighbor and bottom neighbor;
// Thus, the filling order of the matrix should be -- bottom -> top, left -> right
//
// Time: O(N^2)
// Space: O(N^2)

export function findLPS_r1(st: string): number {
  const N = st.length
  if (N === 0) {
    return 0
  }

  const DP = new Array(N).fill(0).map(() => new Array(N).fill(0))
  for (let i = 0; i < N; i += 1) {
    DP[i][i] = 1
  }
  for (let start = N - 1; start >= 1; start -= 1) {
    for (let end = start + 1; end < N; end += 1) {
      if (st[start] === st[end]) {
        DP[start][end] = DP[start + 1][end - 1] + 2
      } else {
        DP[start][end] = Math.max(DP[start + 1][end], DP[start][end - 1])
      }
    }
  }
  return DP[0][N - 1]
}
