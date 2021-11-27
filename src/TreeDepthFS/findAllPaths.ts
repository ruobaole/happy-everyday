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

import { TreeNode } from '@src/TreeBreadthFS/TreeNode'

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
