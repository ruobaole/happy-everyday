// https://www.educative.io/courses/grokking-the-coding-interview/3jwVx84OMkO
//
// Since we don't know where the branch with the min depth will be, we have to traverse
//  the tree
// Traverse the tree in BFS while keeping counting the height
// when any of the node from the queue has no children, we know that this the leaf of the
// smallest branch -- return the height
//
// Time: O(N) - worst case is when the tree is complete, we have to traverse all the nodes
// Space: O(N) - bounded by the max length of the queue -- N/2

import { TreeNode } from './TreeNode'

export const minDepthOfTree = (root: TreeNode | null): number => {
  let minH = 0
  if (root === null) {
    return minH
  }
  const queue: TreeNode[] = []
  queue.push(root)
  while (queue.length > 0) {
    minH += 1
    const lvLen = queue.length
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift()
      if (node) {
        if (node.left === null && node.right === null) {
          // leaf of a branch
          return minH
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
  return minH
}

// review practices //

// BFS to traverse the tree while keeping counting the levels
// If in a level, a node from the queue has no children, we know that
// the branch has reached its leaf node and the level of that node
// is the tree's min height
//
// Time: worst case O(N) - when we have to traverse down to the deepest
//  level
// Space: bounded by the queue size -- the max number of nodes in a level
//  (N + 1) / 2 -- O(N)

export const minDepthOfTree_r1 = (root: TreeNode | null): number => {
  let level = 0
  if (root === null) {
    return level
  }
  const queue: TreeNode[] = []
  queue.push(root)
  while (queue.length > 0) {
    const lvLen = queue.length
    for (let i = 0; i < lvLen; i += 1) {
      level += 1
      const node = queue.shift()
      if (node) {
        if (node.left === null && node.right === null) {
          return level
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
  return level
}

//--- r2 ---//
//
// BFS to traverse the tree while counting the level;
// Break the traversing when we encounter a node without children;
//
// Time: O(N)
// Space: O(1)

export function minDepthOfTree_r2(root: TreeNode | null): number {
  if (root === null) {
    return 0
  }
  const queue: TreeNode[] = []
  queue.push(root)
  let level = 0
  while (queue.length > 0) {
    level += 1
    const lvLen = queue.length
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift()
      if (!node.left && !node.right) {
        return level
      }
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
  }
  return level
}
