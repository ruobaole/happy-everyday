// https://www.educative.io/courses/grokking-the-coding-interview/xV7E64m4lnz
//
// Traverse the tree in breadth first way
// keep a queue to store nodes of the current level
// remember the size of the queue -- the level's length
// pop levelLen's nodes from the queue, push their values into the result's
//  current level's subarray; also push each nodes' left and right children
//  into the queue
// iterate until the queue is empty
//
// Time: O(N)
// Space: O(N) number of nodes in the tree

import { TreeNode } from './TreeNode'

export const levelOrderTraverse = (root: TreeNode | null): number[][] => {
  const result: number[][] = []
  if (root === null) {
    return result
  }
  const queue: TreeNode[] = []
  queue.push(root)
  while (queue.length !== 0) {
    const levelLen = queue.length
    const levelRes: number[] = []
    for (let i = 0; i < levelLen; i += 1) {
      const cur = queue.shift()
      if (cur) {
        levelRes.push(cur.value)
        if (cur.left) {
          queue.push(cur.left)
        }
        if (cur.right) {
          queue.push(cur.right)
        }
      }
    }
    result.push(levelRes)
  }

  return result
}
