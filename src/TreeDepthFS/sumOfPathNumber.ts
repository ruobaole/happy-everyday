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

import { TreeNode } from './../TreeBreadthFS/TreeNode'

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

// review practices //

// DFS the tree while passing in the number of the current path
// For each subtree, the result is the sum of path numbers in its left subtree
//  and the sum of path numbers in its right subtree
// Base case is the leaf node, here we should return the path number
// we don't return them at null nodes because in that case, the path numbers are added
//  with duplicates
//
// Time: O(N) every node is visited
// Space: O(logN) callstack

const sumOfPathNum_r1Helper = (root: TreeNode, pathNum: number): number => {
  pathNum = pathNum * 10 + root.value
  if (root.left === null && root.right === null) {
    // leaf node
    return pathNum
  }
  let res = 0
  if (root.left) {
    res += sumOfPathNum_r1Helper(root.left, pathNum)
  }
  if (root.right) {
    res += sumOfPathNum_r1Helper(root.right, pathNum)
  }
  // do not need to recover pathNum here, because it is not a reference --
  // it is not modified in the above calls
  return res
}

export const sumOfPathNum_r1 = (root: TreeNode | null): number => {
  if (root === null) {
    return 0
  }
  return sumOfPathNum_r1Helper(root, 0)
}

//--- r2 ---//
//
// DFS the tree while passing in the number of the current path
// We should return the path number at leaf nodes
// For each subtree, we should return the sum of all path numbers in
//  the current subtree. that is --
// The sum of the returning result in its left subtree, and its returning result
//  in its right subtree
// Because the passed in path number is not a reference, we do not need to recorver
//  its state before return. It naturally hold the state of the level.
//
// Time: O(N)

export function sumOfPathNum_r2(root: TreeNode | null): number {
  if (root === null) {
    return 0
  }
  return sumOfPathNum_r2Helper(root, 0)
}

function sumOfPathNum_r2Helper(root: TreeNode, pathNum: number): number {
  pathNum = 10 * pathNum + root.value
  if (root.left === null && root.right === null) {
    return pathNum
  }
  let sum = 0
  if (root.left) {
    sum += sumOfPathNum_r2Helper(root.left, pathNum)
  }
  if (root.right) {
    sum += sumOfPathNum_r2Helper(root.right, pathNum)
  }
  return sum
}
