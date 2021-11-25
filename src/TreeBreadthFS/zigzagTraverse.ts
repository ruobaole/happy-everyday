// https://www.educative.io/courses/grokking-the-coding-interview/qVA27MMYYn0
//
// Traverse the tree in BFS while switching leftToRight (init true)
// if leftToRight: while adding this level's result, add to the beginning of the queue
//   -- unshift
// if !leftToRight: while adding the level's result, push to end -- push
// NOTE that we only switch the way we add result -- we should not switch the way that
//  we operate the queue, otherwise the BFS travesing order will be different
//
// Time: O(N)

import { TreeNode } from './TreeNode'

export const zigzagTraverse = (root: TreeNode | null): number[][] => {
  const result: number[][] = []
  if (root === null) {
    return result
  }
  const queue: TreeNode[] = []
  queue.push(root)
  let leftToRight = true
  while (queue.length > 0) {
    const lvLen = queue.length
    const lvRes: number[] = []
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift()
      if (node) {
        if (leftToRight) {
          // add to result at end
          lvRes.push(node.value)
        } else {
          // add to result at the beginning
          lvRes.unshift(node.value)
        }
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
    result.push(lvRes)
    leftToRight = !leftToRight
  }
  return result
}
