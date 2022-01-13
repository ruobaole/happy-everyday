// https://www.educative.io/courses/grokking-the-coding-interview/JPGWDNRx3w2
//
// There is a greedy way in generating all ranges -- the same as merging k
//  lists. why? because when we form a range by selecting elements
//  from each list -- to get smaller range, we can only move the smallest
//  element rightwards to shrink its lower bound.
// The range is calculated by the smallest of the k elements and the largest.
// In fact, we don't really need to keep a maxHeap to get the largest, since the
//   arrays are sorted, the max in the k elements is also the global max so far.
// Thus, we keep a minHeap to try to 'merge' the k lists.
// At the same time, keep the max so far, calculate the range using the root of
//  the heap and the max.
// While merging, update the resulting range if we get a smaller range.
// We stop searching when the top of the minHeap is the last of its array. why?
//  because when this element cannot move (since it is the lower bound of the
//  range), there is no way the range can be any smaller.
//
// Time: the size of heap -- k; number of iterations -- at most N
//   thus, O(NlogK)
// Space: O(K)

import { Heap } from 'typescript-collections'

export const findSmallestRange = (lists: number[][]): [number, number] => {
  // [value, row, col]
  const minHeap = new Heap<[number, number, number]>((a, b) => b[0] - a[0])
  let curMax = Number.MIN_SAFE_INTEGER
  let low = 0
  let high = Number.MIN_SAFE_INTEGER
  lists.forEach((list, row) => {
    if (list[0] !== undefined) {
      minHeap.add([list[0], row, 0])
      curMax = Math.max(list[0], curMax)
    }
  })

  // stop loop when the heap's top has no more elements in its list
  while (minHeap.size() === lists.length) {
    const top = minHeap.removeRoot() as [number, number, number]
    const curRange = curMax - top[0]
    if (curRange < high - low) {
      low = top[0]
      high = curMax
    }
    const row = top[1]
    const col = top[2]
    if (col + 1 < lists[row].length) {
      minHeap.add([lists[row][col + 1], row, col + 1])
      curMax = Math.max(curMax, lists[row][col + 1])
    }
  }
  return [low, high]
}
