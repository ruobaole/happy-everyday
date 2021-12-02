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
