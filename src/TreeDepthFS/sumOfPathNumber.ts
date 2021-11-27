// https://www.educative.io/courses/grokking-the-coding-interview/YQ5o5vEXP69
//
// DFS to traverse the tree
// For every subtree, the sum equals the sum of its left subsubtree +
//  sum of its right subsubtree
// Passing in the number of the path while traversing
// At leaf node: return the sum (the path number)
//
// Time: O(N) -- each node is visited once
// Space: O(logN) -- callstack

import { TreeNode } from '@src/TreeBreadthFS/TreeNode'

const sumOfPathNumHelper = (root: TreeNode | null, pathNum: number): number => {
  if (root && root.left === null && root.right === null) {
    return pathNum * 10 + root.value
  }
  let sumLeft = 0
  let sumRight = 0
  if (root && root.left) {
    sumLeft = sumOfPathNumHelper(root.left, pathNum * 10 + root.value)
  }
  if (root && root.right) {
    sumRight = sumOfPathNumHelper(root.right, pathNum * 10 + root.value)
  }
  return sumLeft + sumRight
}

export const sumOfPathNum = (root: TreeNode | null): number => {
  if (root === null) {
    return 0
  }
  return sumOfPathNumHelper(root, 0)
}
