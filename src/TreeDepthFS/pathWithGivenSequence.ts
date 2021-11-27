// https://www.educative.io/courses/grokking-the-coding-interview/m280XNlPOkn
//
// Traverse the tree in DFS way
// For every subtree:
//  - if the root.value does not match with the corresponding value in seq
//   return false
//  - else -> current level matched
//   return pathExists(root.left, level+1, seq) || pathExists(root.right, level+1, seq)
// Base case - leaf node
//  check if the value match and the sequence's length matched
//
// Time: worst case O(N) if for every path, only the last does not match
// Space: O(logN) bounded by the callstack, if do not count the sequence

import { TreeNode } from '@src/TreeBreadthFS/TreeNode'

const pathOfSequenceHelper = (
  root: TreeNode | null,
  level: number,
  sequence: number[]
): boolean => {
  if (root === null) {
    return false
  }
  if (root && root.left === null && root.right === null) {
    return root.value === sequence[level] && sequence.length === level + 1
  }
  if (root.value !== sequence[level]) {
    return false
  }
  return (
    pathOfSequenceHelper(root.left, level + 1, sequence) ||
    pathOfSequenceHelper(root.right, level + 1, sequence)
  )
}

export const pathOfSequence = (
  root: TreeNode | null,
  sequence: number[]
): boolean => {
  if (root === null) {
    return sequence.length === 0
  }
  return pathOfSequenceHelper(root, 0, sequence)
}
