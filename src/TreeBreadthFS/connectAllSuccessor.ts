// https://www.educative.io/courses/grokking-the-coding-interview/NE5109Jl02v
//
// BFS to traverse the tree
// when iterating the level, add children to the queue first, and then link the current
//  popped node to the top of the queue -- so that if the node's successor happens to
//  be one of its children, we can find the successor correctly
//
// Time: O(N)
// Space: O(N)

import { TreeNodeWithNext } from './TreeNode'

export const connectAllSuccessors = (root: TreeNodeWithNext | null): void => {
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
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
        node.next = queue[0] === undefined ? null : queue[0]
      }
    }
  }
}
