// https://www.educative.io/courses/grokking-the-coding-interview/xVV1jA29YK9
//
// For any tree, the diameter is the longest path in its left subtree + root +
//  the longest path in its right subtree
// The diameter of the tree is the longest diameter of all its subtrees
// Thus, for every subtree, we have to return:
//  1) the longest path from root to leaf
//  2) the longest diameter passing through that root
// Base Case is leaf node:
//  return [[root.value], [root.value]]
// Recursive:
//  1) pathLeft.push(root.value); pathRight.push(root.value) -- max(pathLeft, pathRight)
//  2) diameter = pathLeft + pathRight - root; diameter = max(diameter, leftDiameter, rightDiameter)
//
// Space: how many arrays we need for path and diameters? -- number of leaf O(N/2)
//   the largest space needed for the diameter is O(2logN) -- O(NlogN)
// Time: each node is visited once -- worst case when we have to update longestDiameter at ever
//   subtree -- copy of the arrary takes at most O(2logN) -- O(NlogN)

import { TreeNode } from '@src/TreeBreadthFS/TreeNode'

const treeDiameterHelper = (root: TreeNode): [number[], number[]] => {
  if (root.left === null && root.right === null) {
    return [[root.value], [root.value]]
  }
  let leftPath: number[] = []
  let leftDia: number[] = []
  let rightPath: number[] = []
  let rightDia: number[] = []
  let longestDia: number[] = []
  if (root.left) {
    ;[leftPath, leftDia] = treeDiameterHelper(root.left)
  }
  if (root.right) {
    ;[rightPath, rightDia] = treeDiameterHelper(root.right)
  }
  const longestPath = leftPath.length > rightPath.length ? leftPath : rightPath
  const thisDiaLen = leftPath.length + rightPath.length + 1
  if (thisDiaLen > leftDia.length && thisDiaLen > rightDia.length) {
    // add rightPath in reverse order so that the diameter order is correct
    longestDia = [...leftPath, root.value, ...rightPath]
  } else {
    longestDia = leftDia.length > rightDia.length ? leftDia : rightDia
  }
  longestPath.push(root.value)
  return [longestPath, longestDia]
}

export const treeDiameter = (root: TreeNode | null): number[] => {
  if (root === null) {
    return []
  }
  const longestDiameter = treeDiameterHelper(root)[1]
  return longestDiameter
}

// review practices //

// We cannot know in advance which node the longest diameter is rooting at
// Hence, DFS to find the node with the longest diameter.
// For each subtree,
// - curDiameterLen = leftPathLen + 1 + rightPathLen
// - curPathLen = max(leftPathLen, rightPathLen) + 1
// - longestDiameterLen = max(longestDiameterLenLeft, curDiameterLen, LongestDiameterRight)
// return curPathLen, longestDiameterLen
// Base case is the leaf node:
// - curDiameterLen = 1
// - curPathLen = 1
//
// Time: O(N) - each node is visited once, and the operation for each node
//  takes O(1)
// Space: O(logN) - callstack

// [longestDiameterLen, pathLen]
const treeDiameter_r1Helper = (root: TreeNode): [number, number] => {
  if (root.left === null && root.right === null) {
    return [1, 1]
  }
  let longestDiaLeft = 0
  let longestPathLeft = 0
  let longestDiaRight = 0
  let longestPathRight = 0
  if (root.left) {
    ;[longestDiaLeft, longestPathLeft] = treeDiameter_r1Helper(root.left)
  }
  if (root.right) {
    ;[longestDiaRight, longestPathRight] = treeDiameter_r1Helper(root.right)
  }
  const longestPath = Math.max(longestPathLeft, longestPathRight) + 1
  const curDia = longestPathLeft + longestPathRight + 1
  const longestDia = Math.max(Math.max(curDia, longestDiaLeft), longestDiaRight)
  return [longestDia, longestPath]
}

export const treeDiameter_r1 = (root: TreeNode | null): number => {
  if (root === null) {
    return 0
  }
  const result = treeDiameter_r1Helper(root)
  return result[0]
}
