// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/7nAKN0Qz67r
//
// Bottom up DP
// For the bottom up DP, basic idea is that we have an array DP representing
//  the min jumps needed for reaching the index i, and we need to populate the
//  array from 0 to end;
// For every index i, we should consider it as the starting point that we jump.
// Iterating through all the possible jumps we are allowed at the starting point
//  jumps[i], we are able to get to different end places;
// For every end places, the min jumps we can now achieved is calculated as ----
//  DP[end] = min(DP[end], DP[start] + 1)
// Iterating through all the starting point from i to the end
// return DP[lastIndex]
//
// Time: O(N^2)
// Space: O(N)

export function minJumps(jumps: number[]): number {
  const DP = new Array(jumps.length).fill(Number.MAX_SAFE_INTEGER)
  DP[0] = 0
  for (let start = 0; start < jumps.length; start += 1) {
    for (
      let end = start + 1;
      end <= start + jumps[start] && end < jumps.length;
      end += 1
    ) {
      DP[end] = Math.min(DP[end], DP[start] + 1)
    }
  }
  return DP[jumps.length - 1]
}
