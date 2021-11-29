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

// review practices //

// We can't make ordered search (cannot decide the searching direction),
// thus we have to iterate each path in order until we find the path.
// DFS while passing in the target sequence, and the level number
// At each subtree:
// 1) check if the root.value match with the sequence[level], return false
//   if does not match
// 2) check further the left subsubtree and the right subsubtree, return true
//   if any of the result is true
// Base case is the null node, if the level number points to the sequence.length
//   element in the sequence -- return true
//
// Time: worst case O(N) - when we have to visit all nodes
// Space: O(logN)

const pathOfSequence_r1Helper = (
  root: TreeNode | null,
  sequence: number[],
  level: number
): boolean => {
  if (root === null) {
    return sequence.length === level
  }
  if (root.value !== sequence[level]) {
    return false
  }
  return (
    pathOfSequence_r1Helper(root.left, sequence, level + 1) ||
    pathOfSequence_r1Helper(root.right, sequence, level + 1)
  )
}

export const pathOfSequence_r1 = (
  root: TreeNode | null,
  sequence: number[]
): boolean => {
  return pathOfSequence_r1Helper(root, sequence, 0)
}
