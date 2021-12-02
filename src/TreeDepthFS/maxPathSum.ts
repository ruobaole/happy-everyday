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
