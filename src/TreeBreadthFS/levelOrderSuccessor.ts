// https://www.educative.io/courses/grokking-the-coding-interview/7nO4VmA74Lr
//
// BFS to find the node with the key, the next node in the queue should be its
//  successor
// NOTE that we should first push left and right children into the queue and then
//  check key -- otherwise, chances are that we think the successor is null while it
//  should be one of its children
//
// Time: O(N) -- worst case is when the key is the last node
// Space: O(N) bounded by the size of the queue

import { TreeNode } from './TreeNode'

export const levelOrderSuccessor = (
  root: TreeNode | null,
  key: number
): TreeNode | null => {
  if (root === null) {
    return null
  }
  const queue: TreeNode[] = []
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
        if (node.value === key) {
          return queue[0] === undefined ? null : queue[0]
        }
      }
    }
  }
  return null
}
