// https://www.educative.io/courses/grokking-the-coding-interview/3j9V2QL3Ky9
//
// BFS to generate all possibilities
// At each level, branching between having each number within the range as the root
//  node;
// Let me explain --
// Let us define a function - problem([nMin, nMax]) as finding all unique BSTs
//  in nodes in range [nMin, nMax]
// Base Case is when the input contains only one number -- only one possibility
//  -- TreeNode of the number
// (But actually, base case being min > max will be more convenient in coding)
// For each subtree, iterating through n1 to nn as the root node
//  in each iteration, get all results from the left and right subtree
// The result of the current subtree, is the combinations of the results
//  of all its subsubtrees
// NOTE that overlapping subproblems can occur -- use a memo
//  memo[[nMin, nMax]] = treeRootArray to memorize answers of the subtrees
//
// Time: number of results is bounded by O(2^N) -- because the problem is
//  equivalent as numbers of ways to seperate subarrays for an array [1, n]
//  -- similar to the parentheses problem
//  In getting each possibility, the time is O(N), because it calls for the
//   visiting of all its nodes to get the tree
//  thus, O(N * 2^N) -- loosely
// Space: O(N * 2^N) -- the result trees

export class TreeNode {
  public val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val: number, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

const allUniqueBSTsHelper = (
  min: number,
  max: number,
  memo: Map<[number, number], TreeNode[]>
): (TreeNode | null)[] => {
  const results: (TreeNode | null)[] = []
  if (min > max) {
    results.push(null)
    return results
  }
  if (memo.get([min, max]) !== undefined) {
    return memo.get([min, max]) as (TreeNode | null)[]
  }
  for (let r = min; r <= max; r += 1) {
    const leftResults = allUniqueBSTsHelper(min, r - 1, memo)
    const rightResults = allUniqueBSTsHelper(r + 1, max, memo)
    for (let l = 0; l < leftResults.length; l += 1) {
      const leftRoot = leftResults[l]
      for (let r = 0; r < rightResults.length; r += 1) {
        const rightRoot = rightResults[r]
        const curRoot = new TreeNode(r)
        curRoot.left = leftRoot
        curRoot.right = rightRoot
        results.push(curRoot)
      }
    }
  }
  return results
}

export const allUniqueBSTs = (n: number): TreeNode[] => {
  if (n <= 0) {
    return []
  }
  const memo: Map<[number, number], TreeNode[]> = new Map()
  return allUniqueBSTsHelper(1, n, memo) as TreeNode[]
}
