// https://www.educative.io/courses/grokking-the-coding-interview/myAqDMyRXn3
//
// We need to merge the k lists, otherwise we cannot know which is the kth smallest.
// Start merging the lists using minHeap, keeping a count at the same time.
// Because we need to remove the root of the heap in each iteration while merging, when
//  the count === k, the popped root of this iteration is the k-th smallest
// In order to know which number should we push into the heap after the root is popped,
//  we need to store not only the value but also the row, col index of the value in the
//  heap
//
// Time: heap size is M -- number of lists; total number of k iterations
//  hence, O(KlogM)
// Space: O(M)

import { Heap } from 'typescript-collections'

export const findKthSmallestInArray = (
  lists: number[][],
  k: number
): number => {
  // [value, row, col]
  const minHeap = new Heap<[number, number, number]>((a, b) => b[0] - a[0])
  // init minHeap
  lists.forEach((list, row) => {
    if (list[0] !== undefined) {
      minHeap.add([list[0], row, 0])
    }
  })
  let kSmallest = 0
  let cnt = 0
  while (minHeap.size() > 0) {
    const top = minHeap.removeRoot() as [number, number, number]
    kSmallest = top[0]
    const row = top[1]
    const col = top[2]
    cnt += 1
    if (cnt === k) {
      break
    }
    if (col + 1 < lists[row].length) {
      minHeap.add([lists[row][col + 1], row, col + 1])
    }
  }
  return kSmallest
}

//--- r1 ---//

// The way to merge M sorted lists is to keep M pointers pointing at the
//  head of each list. Each time, popping out the min of the pointers and move
//  the pointer.
// Since the number of list is variable, we cannot construct pointers in advance.
// Instead, we use a minHeap of size M to store the heads.
// In order to know which list the pointer belongs to, we should also store the
//  row and col index of the pointer.
// Keep a minHeap of size M; Popping out roots and keep counting.
// When the cnt === k, the root is the kth smallest.
//
// Time: O(klogM) -- the size of the heap is atmost M
// Space: O(M)

export const findKthSmallestInArray_r1 = (
  lists: number[][],
  k: number
): number => {
  // [value, row, col]
  const minHeap = new Heap<[number, number, number]>((a, b) => b[0] - a[0])
  // 1. populate the heap
  lists.forEach((list, row) => {
    if (list.length > 0) {
      minHeap.add([list[0], row, 0])
    }
  })
  // 2. popping out while counting
  let cnt = 0
  let kSmallest = 0
  while (minHeap.size() > 0) {
    const top = minHeap.removeRoot() as [number, number, number]
    cnt += 1
    kSmallest = top[0]
    const row = top[1]
    const col = top[2]
    if (cnt === k) {
      break
    }
    if (col + 1 < lists[row].length) {
      minHeap.add([lists[row][col + 1], row, col + 1])
    }
  }
  return kSmallest
}
