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

//--- r1 ---//

// At level0, we branch between having each number within range [1, n]
//  being the root of the BST
// At level1, based on each parent value r0, we know that all left subtrees
//  should be the answer of the same problem with smaller scope -- i.e
//  problem(1, r0-1)
// NOTE that in this problem, the count of trees is only influence by the
//  size of the range; the bound does not matter
// Hence, the problem becomes problem(rangeSize)
// Also, the problem can be overlapping; to avoiding calculating problem(2)
//  many times, we should use a memo to keep record of the the answers
//
// Time: the number of all BSTs should be loosely O(2^N) (as discussed in
//  the allUniqueBSTs problem)
//  we do not need to get the actual tree, but only counting the result --
//  hence O(2^N)
// Space: O(2^N)

const countTreeWithinRange = (
  rangeSize: number,
  memo: Record<number, number>
): number => {
  if (rangeSize <= 1) {
    return 1
  }
  if (memo[rangeSize] !== undefined) {
    return memo[rangeSize]
  }
  let cnt = 0
  for (let i = 1; i <= rangeSize; i += 1) {
    const leftCnt = countTreeWithinRange(i - 1, memo)
    const rightCnt = countTreeWithinRange(rangeSize - i, memo)
    cnt += leftCnt * rightCnt
  }
  memo[rangeSize] = cnt
  return cnt
}

export const countTrees_r1 = (n: number): number => {
  const memo: Record<number, number> = {}
  return countTreeWithinRange(n, memo)
}

//--- r2 ---//
//
// Define prob(start, end) - return the number of BSTs generated
//  from number within range [start, end]
// We branching between having each number within [start, end] as the
//  root of the subtree, for each root, its left subtree number and right subtree
//  number can get from 2 recursive calls:
// - leftCnt = prob(start, n-1)
// - rightCnt = prob(n+1, end)
// the total BST cnt should be leftCnt * rightCnt
// NOTICE that, the cnt is actually only related with the size of the range, not specific
//  start or end;
// Thus, the problem can be reduced to only 1 parameter -- prob(rangeSize)
// We can memorize the result of the subproblems using memo[]
//
// Time: O(2^N) -- the total nodes of BSTs is bounded by the leaf node's cnt; how
//  many BTS ? loosely 2^N -- the same as the parenthese question
// Space: O(2^N)

export function countTrees_r2(n: number): number {
  const memo: Record<number, number> = {}
  return countTrees_r2Helper(n, memo)
}

function countTrees_r2Helper(
  rangeSize: number,
  memo: Record<number, number>
): number {
  if (rangeSize === 1) {
    return 1
  }
  if (memo[rangeSize]) {
    return memo[rangeSize]
  }
  let cnt = 0
  for (let n = 1; n <= rangeSize; n += 1) {
    const leftCnt = countTrees_r2Helper(n - 1, memo)
    const rightCnt = countTrees_r2Helper(rangeSize - (n + 1) + 1, memo)
    cnt += leftCnt * rightCnt
  }
  memo[rangeSize] = cnt
  return cnt
}
