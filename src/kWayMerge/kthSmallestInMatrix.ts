// https://www.educative.io/courses/grokking-the-coding-interview/x1NJVYKNvqz
//
// Best First Search
// Use a priority queue (i.e. heap), minHeap
// Start by pushing the smallest -- top left corner into the heap
// Each time, remove the root of the heap, the next possible smallest
//  should be either the left of the root, or the bottom
// Add the two neighbors into the heap
// Repeat the process while counting, if the count === k, the root pulled
//  out at this iteration is the k-th smallest
//
// Time: heap size -- it is at most 2 elements in the heap; k numbers of push/pop
//  hence: O(klog2)
// Space: O(1)

import { Heap } from 'typescript-collections'

export const kthSmallestInMat = (matrix: number[][], k: number): number => {
  // [value, row, col]
  const minHeap = new Heap<[number, number, number]>((a, b) => b[0] - a[0])
  if (matrix.length > 0 && matrix[0].length > 0) {
    minHeap.add([matrix[0][0], 0, 0])
  }
  let cnt = 0
  let kSmallest = 0
  while (minHeap.size() > 0) {
    const top = minHeap.removeRoot() as [number, number, number]
    kSmallest = top[0]
    cnt += 1
    if (cnt === k) {
      break
    }
    const row = top[1]
    const col = top[2]
    // 1. try to add the right neighbor
    if (col + 1 < matrix[row].length) {
      minHeap.add([matrix[row][col + 1], row, col + 1])
    }
    // 2. try to add the bottom neighbor
    if (row + 1 < matrix.length) {
      minHeap.add([matrix[row + 1][col], row + 1, col])
    }
  }
  return kSmallest
}
