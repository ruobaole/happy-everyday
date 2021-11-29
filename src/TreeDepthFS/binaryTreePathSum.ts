// https://www.educative.io/courses/grokking-the-coding-interview/RMlGwgpoKKY
//
// DFS to traverse the tree
// At every subtree: try to search for path with sum === targetSum - root.value in the left and
//  right subsubtrees
// Base Case: root === null return targetSum === 0
// Recursion: return hasPath(root.left, sum - root.value) || hasPath(root.right, sum - root.value)
//
// Time: worst case O(N) when no path exists. best case O(H) when the left most is the path
// Space: O(H) call stack

import { TreeNode } from '@src/TreeBreadthFS/TreeNode'

export const hasPath = (root: TreeNode | null, sum: number): boolean => {
  if (root === null) {
    return sum === 0
  }
  return (
    hasPath(root.left, sum - root.value) ||
    hasPath(root.right, sum - root.value)
  )
}

// review practices //

// DFS while passing in the remaining target sum we are looking for.
// If leaf node: see if the node's value equals to the remaining sum target
//  return the result
// If not leaf node:
//  update the remaining target sum remaining target sum - root.value
//  looking for the path with the remaining number in its left and right subtree
//  any of the subtrees returns true -- return true
//
// Time: worst case is when no such path exists so that we have to traverse all nodes
//  O(N)
// Space: O(logN) - callstack (assume the tree is balanced)

export const hasPath_r1 = (root: TreeNode | null, sum: number): boolean => {
  if (root === null) {
    return sum === 0
  }
  return (
    hasPath_r1(root.left, sum - root.value) ||
    hasPath_r1(root.right, sum - root.value)
  )
}
