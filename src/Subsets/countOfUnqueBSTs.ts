// https://www.educative.io/courses/grokking-the-coding-interview/NE1V3EDAnWN
//
// The solution is the same as the problem -- allUniqueBSTs (of course)
// We need to recursively get counts of left subtree and counts of right subtrees
//  and increment leftCnt * rightCnt for each possible root
// And we need to iterate all possible roots in the range
// NOTE that problem([1, 4]) is actually equivalent to problem([2, 5]), ... this time.
//  the count will be the same as long as the numbers within the range are the same.
// Hence, this time, we define the recursive problem as problem(rangeSize)
// We also use the memo to avoid calculating overlapping problems.
//
// Time: total number of trees -- O(2^N), to generate each tree, O(N) is needed
//  hence, O(N * 2^N)
// Space: O(2^N)

const countTreesHelper = (
  rangeSize: number,
  memo: Record<number, number>
): number => {
  if (memo[rangeSize] !== undefined) {
    return memo[rangeSize]
  }
  if (rangeSize <= 1) {
    return 1
  }
  let count = 0
  for (let i = 1; i <= rangeSize; i += 1) {
    const leftCnt = countTreesHelper(i - 1, memo)
    const rightCnt = countTreesHelper(rangeSize - i, memo)
    count += leftCnt * rightCnt
  }
  memo[rangeSize] = count
  return count
}

export const countTrees = (n: number): number => {
  if (n <= 1) {
    return 1
  }
  const memo: Record<number, number> = {}
  return countTreesHelper(n, memo)
}
