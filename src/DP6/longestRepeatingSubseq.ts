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
