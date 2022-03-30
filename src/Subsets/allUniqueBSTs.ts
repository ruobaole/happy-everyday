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

//--- r1 ---//

// At level 0, we branching between having each number within the range [0, n]
//   being the root
// At level 1, based on the parent node n0, we know that all possible left
//  subtrees should be allUniqueBSTWithinRange(0, n0 - 1) and all ...
//  right subtrees should be allUniqueBSTWithinRange(n0 + 1, n)
// After getting the results from the left and right subtree, we should do
//  N*N iteratings to get all answers of the current subtree;
// Hence, we recursively finding all uniqueBSTsWithinRange(low, high)
// Base Case is when low > high, the only answer is null
// Note that there will be overlapping subproblems -- why?
//  problem(1, 5), problem(1, 4), problem(1, 3) all calls for problem(1, 2)
// Thus, we use a memo map to keep record of the answers we've got
//
// Time: how many number of answers -- O(2^N) loosely (the same as the parentheses
//  problem because we're to break the consecutive array from 0 to n into subarrays)
//  the generating of each BST calls for O(N)
//  thus, total time O(N * 2^N)
// Space: O(N * 2^N)

const allUniqueBSTsWithinRange = (
  low: number,
  high: number,
  memo: Map<[number, number], TreeNode[]>
): (TreeNode | null)[] => {
  const results: (TreeNode | null)[] = []
  if (low > high) {
    results.push(null)
    return results
  }
  if (memo.get([low, high]) !== undefined) {
    return memo.get([low, high]) as (TreeNode | null)[]
  }
  for (let r = low; r <= high; r += 1) {
    const leftBSTs = allUniqueBSTsWithinRange(low, r - 1, memo)
    const rightBSTs = allUniqueBSTsWithinRange(r + 1, high, memo)
    leftBSTs.forEach((lRoot) => {
      rightBSTs.forEach((rRoot) => {
        const root = new TreeNode(r)
        root.left = lRoot
        root.right = rRoot
        results.push(root)
      })
    })
  }
  memo.set([low, high], results as TreeNode[])
  return results
}

export const allUniqueBSTs_r1 = (n: number): TreeNode[] => {
  const memo: Map<[number, number], TreeNode[]> = new Map()
  if (n <= 0) {
    return []
  }
  return allUniqueBSTsWithinRange(1, n, memo).filter(
    (root) => root !== null
  ) as TreeNode[]
}

//--- r2 ---//
//
// At every level, we branching between having the numbers within the input array
//  each being the root;
// For each of the subtree in the level, say, n is the root its left subtree should be
//  rooted on the results of of prob(low, n - 1); and its right subtree should be rooted
//  on the results of prob(n + 1, high);
// For the leftResult and rightResult, we should do N*N iterating to generating all the
//  results for the current level;
// Hence, we can define prob(low, high) to return all BSTs with its number in range [low, high]
// Base case should be when low === high, only one node is returned --
//  [low];
// NOTICE that there will be many duplicate subproblems, thus we use memo[`${low}-{high}`] to memorizing
//  results
//
// Time: number of all unique BSTs -- roughly O(2^N), similar as evaluate expressions, because we're
//  seperating array of numbers within a range;
//  for each BST, O(N) is needed to build the tree -- O(N * 2^N)
// Space: O(N * 2^N)

export function allUniqueBSTs_r2(n: number): TreeNode[] {
  const memo: Record<string, TreeNode[]> = {}
  return allUniqueBSTs_r2Helper(1, n, memo)
}

function allUniqueBSTs_r2Helper(
  low: number,
  high: number,
  memo: Record<string, TreeNode[]>
): TreeNode[] {
  const result: TreeNode[] = []
  if (low === high) {
    result.push(new TreeNode(low))
    return result
  }
  if (memo[`${low}-${high}`] !== undefined) {
    return memo[`${low}-${high}`]
  }
  for (let n = low; n <= high; n += 1) {
    let leftRes: TreeNode[] = []
    let rightRes: TreeNode[] = []
    if (n > low) {
      leftRes = allUniqueBSTs_r2Helper(low, n - 1, memo)
    }
    if (n < high) {
      rightRes = allUniqueBSTs_r2Helper(n + 1, high, memo)
    }
    leftRes.forEach((l) => {
      rightRes.forEach((r) => {
        const curRoot = new TreeNode(n)
        curRoot.left = l
        curRoot.right = r
        result.push(curRoot)
      })
    })
  }
  memo[`${low}-${high}`] = result
  return result
}
