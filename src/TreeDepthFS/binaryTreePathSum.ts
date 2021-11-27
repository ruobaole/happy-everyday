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
