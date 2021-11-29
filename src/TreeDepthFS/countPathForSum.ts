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

// review practice //

// We have to examine all paths to count -- thus, DFS the tree.
// What should we return when DFS?
// - NOTE that return is when backtracking. When backtracking, the subtree's
//  result should be the sum of 3 parts:
//  1) the count of paths that ends at root
//  2) the result from the left subtree
//  3) the result from the right subtree
// How to calculate 1)?
// - we pass in the array representing the current path while DFS
//  iterate the array backwards to count 1)
// Base case is the null node: return 0 -- the 1) number in this case has been added
//  in its parent node
//
// Time: O(NlogN) - all nodes are visited; at each node, we itereate the current path
//  current path can be at most logN length
// Space: bounded by the callstack and the array of current path -- O(logN)

const countSum_r1Helper = (
  root: TreeNode | null,
  sum: number,
  curPath: number[]
): number => {
  if (root === null) {
    return 0
  }
  curPath.push(root.value)
  let s = 0
  let cnt = 0
  for (let i = curPath.length - 1; i >= 0; i -= 1) {
    s += curPath[i]
    if (s === sum) {
      cnt += 1
    }
  }
  cnt +=
    countSum_r1Helper(root.left, sum, curPath) +
    countSum_r1Helper(root.right, sum, curPath)
  // because we're reusing the array - curPath, recover it to its current state
  // while backtracking
  curPath.pop()
  return cnt
}

export const countSum_r1 = (root: TreeNode | null, sum: number): number => {
  return countSum_r1Helper(root, sum, [])
}
