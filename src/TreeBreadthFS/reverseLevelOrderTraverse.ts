// https://www.educative.io/courses/grokking-the-coding-interview/m2N6GwARL8r
//
// BFS to traverse the tree, but this time, append each level's result in the front of the array.
// to append at the front of the array, use unshift
// the javascript language does not mandate a time complexity for array unshift -- we assume it use
//   a c++ std::deque kind of linkedlist implementation -- that is O(1)
//
// Time: O(N)
// Space: the result takes O(N), and the max of the queue is N / 2

import { TreeNode } from './TreeNode'

export const reverseLevelOrderTraverse = (
  root: TreeNode | null
): number[][] => {
  const result: number[][] = []
  if (root === null) {
    return result
  }
  const queue: TreeNode[] = []
  queue.push(root)
  while (queue.length > 0) {
    const levelLen = queue.length
    const levelResult = []
    for (let i = 0; i < levelLen; i += 1) {
      const node = queue.shift()
      if (node) {
        levelResult.push(node.value)
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
    result.unshift(levelResult)
  }
  return result
}
