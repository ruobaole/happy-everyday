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

import { TreeNode } from './../TreeBreadthFS/TreeNode'

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

//--- r2 ---//
//
// For each subtree, the max path sum would be --
// max(leftSum, rightSum, curSum)
// How to get curSum?
// - define leftPath as the max sum of path ending at the left child
// - curSum = max(leftPath, 0) + max(rightPath, 0) + root.value
// Hence, we should return 2 things in the recursion of each subtree --
// - curPath -- the max sum for path ending at root
// - curSum -- the max sum for path within the subtree
// How to get curPath?
// - curPath = max(leftPath, rightPath, 0) + root.value
// Base Case:
// we can have base case in null node -- because paths are not necessarily
//  from leaf to leaf
// return [-Infinity, -Infinity] at null nodes -- we should not return 0, because
//  the nodes value can be negative
//
// Time: O(N) -- all nodes have to be examined
// Space: O(logN)

export function maxPathSum(root: TreeNode | null): number {
  const [path, sum] = maxPathSumHelper(root)
  return sum
}

function maxPathSumHelper(root: TreeNode | null): [number, number] {
  let path = -Infinity
  let sum = -Infinity
  if (root === null) {
    return [path, sum]
  }
  const [leftPath, leftSum] = maxPathSumHelper(root.left)
  const [rightPath, rightSum] = maxPathSumHelper(root.right)
  path = Math.max(Math.max(leftPath, rightPath), 0) + root.value
  const curSum = Math.max(leftPath, 0) + Math.max(rightPath, 0) + root.value
  sum = Math.max(Math.max(leftSum, rightSum), curSum)
  return [path, sum]
}
