// https://www.educative.io/courses/grokking-the-coding-interview/gxxPGn8vE8G
//
// We use a maxHeap to keep track of the k smallest numbers we have seen.
// Everytime we encounter a number that is smaller than the root of the maxHeap,
//  we know that the number should be in the k smallest numbers, and the top
//  should be kicked out.
// At last, the root of the heap is the k-th smallest number
//
// Time: O(klogk + (n - k)logk)
// Space: O(k)

import { Heap } from 'typescript-collections'

export const findKthSmallest = (nums: number[], k: number): number => {
  const maxHeap = new Heap<number>((a, b) => a - b)
  let idx = 0
  for (idx = 0; idx < k && idx < nums.length; idx += 1) {
    maxHeap.add(nums[idx])
  }
  for (idx = k; idx < nums.length; idx += 1) {
    const heaptop = maxHeap.peek()
    if (heaptop !== undefined && (heaptop as number) > nums[idx]) {
      maxHeap.removeRoot()
      maxHeap.add(nums[idx])
    }
  }
  return maxHeap.peek() === undefined ? NaN : (maxHeap.peek() as number)
}

//--- r1 ---//

// We keep a maxHeap of size k -- store the k smallest numbers
// While iterating, compare num with the top of the heap,
//  if num < heapTop, we knew that num should be in the heap while
// the top should be kicked out ('cause it is the largest)
// At last, the top of the heap is the kth smallest
//
// Time: O(NlogK) -- becasue the size of the heap is K
// Space: O(K)

export const findKthSmallest_r1 = (nums: number[], k: number): number => {
  // assume that nums is not empty and k > 0
  const maxHeap = new Heap<number>((a, b) => a - b)
  nums.forEach((num) => {
    if (maxHeap.size() < k) {
      maxHeap.add(num)
    } else {
      const top = maxHeap.peek() as number
      if (num < top) {
        maxHeap.removeRoot()
        maxHeap.add(num)
      }
    }
  })
  return maxHeap.peek() as number
}
