// https://www.educative.io/courses/grokking-the-coding-interview/YQWkA2l67GW
//
// Traverse the array in BFS way
// in each level, calculate the average of the queue (levelLen sub-queue) push the average
//  into the result
//
// Time: O(N)
// Space: the result takes O(logN) -- the height of the tree
//   the max length of the queue should be N/2

import { TreeNode } from './TreeNode'

export const levelAverage = (root: TreeNode | null): number[] => {
  const result: number[] = []
  if (root === null) {
    return result
  }
  const queue: TreeNode[] = []
  queue.push(root)
  while (queue.length > 0) {
    const lvLen = queue.length
    let sum = 0
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift()
      if (node) {
        sum += node.value
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
    result.push(sum / lvLen)
  }
  return result
}
