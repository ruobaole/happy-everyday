// https://www.educative.io/courses/grokking-the-coding-interview/xV2J7jvN1or
//
// For every tree, the total count is
//  count of left subtree + count of right subtree + count of paths that
//  ends at root
// Thus, DFS to traverse the tree while passing in the count of the value sequence
//  that representing the current path
// At every node:
//  traverse the pathList to find counts ending at the current node
//  don't forget to recover the pathList before when backtracking
// Base Case: root === null, the sum is 0
//
// Time: worst case O(N^2) (the tree is not balanced), we visit each node once,
//  but at every node, when iterating the path, the worst case is O(N) when the
//  tree is not balanced
// Space: O(H) the height of the tree (worst case O(N) when the tree is not balanced)

import { TreeNode } from '@src/TreeBreadthFS/TreeNode'

const countSumHelper = (
  root: TreeNode | null,
  sum: number,
  path: number[]
): number => {
  if (root === null) {
    return 0
  }
  path.push(root.value)
  let pathSum = 0
  let cnt = 0
  for (let i = path.length - 1; i >= 0; i -= 1) {
    pathSum += path[i]
    if (pathSum === sum) {
      cnt += 1
    }
  }
  const totalCnt =
    cnt +
    countSumHelper(root.left, sum, path) +
    countSumHelper(root.right, sum, path)
  path.pop()
  return totalCnt
}

export const countSum = (root: TreeNode | null, sum: number): number => {
  return countSumHelper(root, sum, [])
}
