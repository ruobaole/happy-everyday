// https://www.educative.io/courses/grokking-the-coding-interview/B89q6NpX0Vx
//
// NOTE that the path is defined as any path connecting any two nodes.
//  -- not necessarily leaf to leaf
// For every subtree, max sum is: max(maxPathLeft, 0) + root.value + max(maxPathRight, 0)
// The global max sum is the global max of sum in all subtree nodes
// In every recursion, we return 2 things: [maxPathSum, globalMaxSum]
// Base case is leaf node:
//  return [root.value, root.value]
// Recursion:
//  maxPathSum = max(max(maxPathLeft, 0), max(maxPathRight, 0)) + root.value
//  localMaxSum = max(maxPathLeft, 0) + root.value + max(maxPathRight, 0)
//  globalMaxSum = max(localMaxSum, globalMaxLeft, globalMaxRight)
//
// Time: O(N) - each node is visited once and the operations are O(1)
// Space: O(logN) - callstack

import { TreeNode } from '@src/TreeBreadthFS/TreeNode'

const findMaxPathSumHelper = (root: TreeNode): [number, number] => {
  // return [maxPathSum, globalMaxSum]
  if (root.left === null && root.right === null) {
    return [root.value, root.value]
  }
  let maxPathSumLeft = 0
  let maxPathSumRight = 0
  let maxSumLeft = -Infinity
  let maxSumRight = -Infinity
  if (root.left) {
    ;[maxPathSumLeft, maxSumLeft] = findMaxPathSumHelper(root.left)
  }
  if (root.right) {
    ;[maxPathSumRight, maxSumRight] = findMaxPathSumHelper(root.right)
  }
  const maxPathSum =
    Math.max(Math.max(maxPathSumLeft, 0), Math.max(maxPathSumRight, 0)) +
    root.value
  const localSum =
    Math.max(maxPathSumLeft, 0) + Math.max(maxPathSumRight, 0) + root.value
  const globalMaxSum = Math.max(localSum, maxSumLeft, maxSumRight)
  return [maxPathSum, globalMaxSum]
}

export const findMaxPathSum = (root: TreeNode | null): number => {
  if (root === null) {
    return 0
  }
  return findMaxPathSumHelper(root)[1]
}

// review practices //

// We cannot know in advance where the path with the max sum will be
// Hence, we DFS to iterate all subtrees and find the path within these
//  subtrees.
// For every subtree:
// - curSum = max(pathSumLeft, 0) + max(pathSumRight, 0) + root.value
// - maxSum = max(sumLeft, curSum, sumRight)
// - pathSum = max(pathSumLeft, pathSumRight, 0) + root.value (because
//  the sequence can be between every two nodes; only one node is ok)
// every subtree returns [maxSum, pathSum]
// Base Case:
//  null node (leaf node is also OK)
//  return [-Infinity, -Infinity] -- in cases when the root.value is negative
//   and it does not have a right child -- we don't want the maxSum to be 0
//
// Time: O(N) - each node is visited once; the operation is O(1)
// Space: O(logN) - callstack

// [maxSum, pathSum]
const findMaxPathSum_r1Helper = (root: TreeNode | null): [number, number] => {
  if (root === null) {
    return [-Infinity, -Infinity]
  }
  const [leftSum, leftPathSum] = findMaxPathSum_r1Helper(root.left)
  const [rightSum, rightPathSum] = findMaxPathSum_r1Helper(root.right)
  const curSum =
    Math.max(leftPathSum, 0) + Math.max(rightPathSum, 0) + root.value
  const maxSum = Math.max(Math.max(leftSum, curSum), rightSum)
  const pathSum =
    Math.max(Math.max(leftPathSum, 0), Math.max(rightPathSum, 0)) + root.value
  return [maxSum, pathSum]
}

export const findMaxPathSum_r1 = (root: TreeNode | null): number => {
  const result = findMaxPathSum_r1Helper(root)
  return result[0]
}
