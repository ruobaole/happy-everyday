// https://www.educative.io/courses/grokking-the-coding-interview/3Y9jm7XRrXO
//
// Two Heaps: maxHeap holds the smaller half of numbers in the window;
//  minHeap holds the larger half of numbers in the window;
// Sliding window, when num enters the window:
//  1) insert into the heaps
//  2) balance the heap
//   when num leaves the window
//  1) remove from the heaps
//  2) balance the heap
//  calculate the median and push into the result[]
//
// Time: O(NK) -- each elements are examined once -- the deletion takes O(K) (searching
//  for the node takes O(K), remove it and then heapify the subtree -- takes O(logK))
// Space: bounded by N and K (the heaps and the result array)

import { Heap } from 'typescript-collections'

export const slidingWindowMedian = (nums: number[], k: number): number[] => {
  const maxHeap = new Heap<number>((a, b) => a - b)
  const minHeap = new Heap<number>((a, b) => b - a)
  const result: number[] = []
  let l = 0
  let r = 0
  for (r = 0; r < nums.length; r += 1) {
    const numR = nums[r]
    // insert into the heaps
    const maxHeapPeek =
      maxHeap.peek() === undefined ? Infinity : (maxHeap.peek() as number)
    if (numR <= maxHeapPeek) {
      maxHeap.add(numR)
    } else {
      minHeap.add(numR)
    }
    // balance the heaps
    if (maxHeap.size() - minHeap.size() > 2) {
      const removed = maxHeap.removeRoot()
      if (removed !== undefined) {
        minHeap.add(removed)
      }
    }
    if (r - l + 1 > k) {
      // move l to maintain window size k
      const numL = nums[l]
      if (maxHeap.peek() !== undefined && numL <= (maxHeap.peek() as number)) {
        // TODO: delete numL from maxHeap
      } else {
        // TODO: delete numL from minHeap
      }
      l += 1
    }
    // balance the heaps
    if (maxHeap.size() - minHeap.size() > 2) {
      const removed = maxHeap.removeRoot()
      if (removed !== undefined) {
        minHeap.add(removed)
      }
    }
    // get result
    const maxHeapPeek1 =
      maxHeap.peek() === undefined ? 0 : (maxHeap.peek() as number)
    const minHeapPeek1 =
      minHeap.peek() === undefined ? 0 : (minHeap.peek() as number)
    if (k % 2 === 1) {
      // odd number
      result.push(maxHeapPeek1)
    } else {
      result.push((maxHeapPeek1 + minHeapPeek1) / 2)
    }
  }
  return result
}
