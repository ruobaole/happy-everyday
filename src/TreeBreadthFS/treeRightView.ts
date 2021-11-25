// https://www.educative.io/courses/grokking-the-coding-interview/B8nj5RB1LJo
//
// BFS to traverse the tree
// in each level, before adding children, the queue's last element is the level's
// right view
//
// Time: O(N)
// Space: O(N)

import { TreeNode } from './TreeNode'

export const treeRightView = (root: TreeNode | null): number[] => {
  const res: number[] = []
  if (root === null) {
    return res
  }
  const queue: TreeNode[] = []
  queue.push(root)
  while (queue.length > 0) {
    const lvLen = queue.length
    res.push(queue[lvLen - 1].value)
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift()
      if (node && node.left) {
        queue.push(node.left)
      }
      if (node && node.right) {
        queue.push(node.right)
      }
    }
  }
  return res
}
