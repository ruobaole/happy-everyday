// https://www.educative.io/courses/grokking-the-coding-interview/m2YYxXDOJ03
//
// BFS to traverse the tree
// in each level, while popping head from the queue, keep record of prev and cur
// link prev.next = cur until we reach the length of the current level -- link to null
//
// Time: O(N)
// Space: O(N)

import { TreeNodeWithNext } from './TreeNode'

export const connectLevelOrderSibling = (
  root: TreeNodeWithNext | null
): void => {
  if (root === null) {
    return
  }
  const queue: TreeNodeWithNext[] = []
  queue.push(root)
  while (queue.length > 0) {
    const lvLen = queue.length
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift()
      if (node) {
        if (i < lvLen - 1) {
          node.next = queue[0]
        } else {
          node.next = null
        }
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
  }
}
