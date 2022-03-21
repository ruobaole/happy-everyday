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

// review practices //

// BFS to traverse the tree
// At every level, while popping out nodes from the queue, link the
// node with the next node in the queue.
// Note that in this way, we should add the node's children to the queue
//  first and then link it to the next node (the queue's current peek)
// link the last node's next to null
//
// Time: O(N)
// Space: size of queue, O(N)

export const connectAllSuccessors_r1 = (
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
        // add nodes' children before link the nodes
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
        const nextNode = queue[0]
        node.next = nextNode === undefined ? null : nextNode
      }
    }
  }
}

//--- r2 ---//
//
// BFS the tree with a queue
// At each level, after popping put a node, connect it with the
//  next peek of the queue;
// In this way, we can easily connect the level's last node with next
//  level's first node;
// NOTE that we need to push in the children first and then connect, or
//  we could end up no nodes to connect at the end of a level;
//
// Time :O(N)

export function connectAllSuccessors_r2(root: TreeNodeWithNext | null): void {
  if (root === null) {
    return
  }
  const queue: TreeNodeWithNext[] = []
  queue.push(root)
  while (queue.length > 0) {
    const lvLen = queue.length
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift()
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
      const next = queue[0]
      node.next = next || null
    }
  }
}
