// https://www.educative.io/courses/grokking-the-coding-interview/B815A0y2Ajn
//
// DFS to traverse the tree while passing in the current path and the result path
// In each subtree:
// if leaf node, check if the targetSum === 0 -> find a path -> add current path
//  to the result path
//  if no path found -> do nothing
// if not leaf node, add root.value to the current path array,
//  continue to search with targetSum = targetSum - root.value in root.left
//  recover the state of current path (for backtrack)
//  continue to search with targetSum = targetSum - root.value in root.right
//
// Time: each node is examined once, however when we find a path, the copy of the path
//  takes O(logN) (H = logN). -- worst case, every path is viable -- O(NlogN)
// Space: call stack - O(logN), the space of the result list is the largest when every path
// is viable -- number of leaf: O((N+1)/2), length of path: O(N) -- O(NlogN)

import { TreeNode } from './../TreeBreadthFS/TreeNode'

const findAllPathsHelper = (
  root: TreeNode | null,
  sum: number,
  currentPath: number[],
  result: number[][]
): void => {
  if (root === null) {
    return
  }
  currentPath.push(root.value)
  if (root && root.left === null && root.right === null) {
    if (sum === root.value) {
      // NOTE that we should push in the copy of the array, not
      // the reference
      result.push([...currentPath])
    }
  }
  findAllPathsHelper(root.left, sum - root.value, currentPath, result)
  findAllPathsHelper(root.right, sum - root.value, currentPath, result)
  // recover currentPath when going up the recursive call stack
  currentPath.pop()
}

export const findAllPaths = (
  root: TreeNode | null,
  sum: number
): number[][] => {
  const result: number[][] = []
  const currentPath: number[] = []
  findAllPathsHelper(root, sum, currentPath, result)
  return result
}

// Similar Problems
// P1. find path with max sum
// DFS while passing in the currentPath, maxSumPath, currentSum and maxSum
// At each subtree:
//  - if leaf node: see if currentSum > maxSum -- update maxSumPath with currentPath
//  - if not leaf node:
//  add node to currentPath
//  find in left subtree
//  find in right subtree
//  pop out the current node added before return -- recover when backtrack
//
// Time: worst case O(NlogN) -- when we have to copy currentPath at every leaf node
// Space: O(logN) -- the path's length i.e. the tree's height

const findPathWithMaxPathHelper = (
  root: TreeNode | null,
  curPath: TreeNode[],
  resPath: TreeNode[],
  curSum: number,
  maxSum: number
) => {
  if (root === null) {
    return
  }
  curSum += root.value
  curPath.push(root)
  if (root && root.left === null && root.right === null) {
    if (curSum > maxSum) {
      // make a copy because we need to reuse curPath array
      resPath = [...curPath]
      maxSum = curSum
    }
  } else {
    findPathWithMaxPathHelper(root.left, curPath, resPath, curSum, maxSum)
    findPathWithMaxPathHelper(root.right, curPath, resPath, curSum, maxSum)
  }
  // recover when backtrack the tree
  curPath.pop()
}

export const findPathWithMaxPath = (root: TreeNode | null): TreeNode[] => {
  const maxSum = -Infinity
  const curSum = -Infinity
  const curPath: TreeNode[] = []
  const resPath: TreeNode[] = []
  findPathWithMaxPathHelper(root, curPath, resPath, curSum, maxSum)
  return resPath
}

// review practices //

// DFS while passing in the array representing the current path
//  and the array representing the result paths
// Base case is the leaf node (we collect results at leaf nodes, or
//  the result can be duplicated)
// If leaf node:
//  check if root.value === sum
//  if true -- find a path, push the path into the result
// If not leaf node:
//  update sum = sum - root.value
//  add root.value to the current path
//  collect paths at the left subtree
//  collect paths at the right subtree
//  don't forget to recover the state of the curPath before return (backtracking)
//
// Time: worst case O(NlogN), best case O(N). Because at leaf nodes, if the path exists
//  we have to copy the path, that is O(logN), the number of leaf node is O(N)
// Space: bounded by the result array and the callstack
//  worst case is when every path is the valid -- O(NlogN)

const findAllPaths_r1Helper = (
  root: TreeNode,
  sum: number,
  curPath: number[],
  result: number[][]
): void => {
  curPath.push(root.value)
  if (root.left === null && root.right === null) {
    // leaf node
    if (root.value === sum) {
      // path found!
      // NOTE that we should copy the path
      result.push([...curPath])
    }
  } else {
    if (root.left) {
      findAllPaths_r1Helper(root.left, sum - root.value, curPath, result)
    }
    if (root.right) {
      findAllPaths_r1Helper(root.right, sum - root.value, curPath, result)
    }
  }
  // recover to the state of current level (because we have push the value
  //  at the beginning)
  curPath.pop()
}

export const findAllPaths_r1 = (
  root: TreeNode | null,
  sum: number
): number[][] => {
  const result: number[][] = []
  if (root === null) {
    return result
  }
  findAllPaths_r1Helper(root, sum, [], result)
  return result
}

//--- r2 ---//
//
// DFS the tree while passing in
// - the current target sum
// - the array representing the current path
// - the result array representing all the paths found
// Base case is the null node:
// - now if targetSum === 0, we should push the current path into
//  the result paths array
// - CAUTION: if we regard null nodes as base case, we should only process
//  one of the children if both the subtrees are null -- or we would endup
//  having duplicate paths in the result
// For every subtree, we should:
// - update targetSum
// - push the current root.value to the current path
// recursively processing both left and right subtrees
// Don't forget to recorver the state of cur path before returning
//
// Time: O(N)
// Space: O(logN)

export function findAllPathsWithSum(
  root: TreeNode | null,
  sum: number
): number[][] {
  const curPath: number[] = []
  const result: number[][] = []
  findAllPathsWithSumHelper(root, sum, curPath, result)
  return result
}

function findAllPathsWithSumHelper(
  root: TreeNode | null,
  sum: number,
  curPath: number[],
  result: number[][]
): void {
  if (root === null) {
    if (sum === 0) {
      result.push([...curPath])
    }
    return
  }
  curPath.push(root.value)

  findAllPathsWithSumHelper(root.left, sum - root.value, curPath, result)
  // IMPROTANT: if both the children are null - we should only process one of
  //  the children -- or we would end up 2 identical paths
  if (!(root.left === null && root.right === null)) {
    findAllPathsWithSumHelper(root.right, sum - root.value, curPath, result)
  }

  curPath.pop()
}
