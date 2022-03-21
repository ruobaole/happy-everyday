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

// review practices //

// BFS to traverse the tree, in each level, populate the queue's value
// into the level result
// when adding level results to the final result, we should append each one
// from the beginning -- hence, a deque is needed so that the appending takes O(1)
// JS - this can be achieved by array unshift()
//
// Time: O(N) - assuming the unshift() in js takes O(1) (the implementation of the array
//  is linkedlist-like)
// Space: O(N) - the result array

export const reverseLevelOrderTraverse_r1 = (
  root: TreeNode | null
): number[][] => {
  const result: number[][] = []
  if (root === null) {
    return result
  }
  const queue: TreeNode[] = []
  queue.push(root)
  while (queue.length > 0) {
    const lvLen = queue.length
    const lvRes: number[] = []
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift()
      if (node) {
        lvRes.push(node.value)
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
    result.unshift(lvRes)
  }
  return result
}

//--- r2 ---//
//
// BFS with a queue to collect results in every level;
// In each level, while popping the level's nodes from the
//  queue, pushing them into the levelResult array
// After processing the level, pushing the levelResult into the
//  final result array
// NOTE: we need the result array to be 'last level at first', thus
//  we need to append each level's result in to the front;
// we need a deque-like data structure for result[] so that the append
//  to front is O(1)
//
// Time: O(N) - in js, we use unshift() to append to front to an array --
//  assume the operation is O(1)
// Space: O(N)

export function reverseLevelOrderTraverse_r2(
  root: TreeNode | null
): number[][] {
  const result: number[][] = []
  if (root === null) {
    return result
  }
  const queue: TreeNode[] = []
  queue.push(root)
  while (queue.length > 0) {
    const lvLen = queue.length
    const lvRes: number[] = []
    for (let i = 0; i < lvLen; i += 1) {
      const node = queue.shift() as TreeNode
      lvRes.push(node.value)
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    result.unshift(lvRes)
  }
  return result
}
