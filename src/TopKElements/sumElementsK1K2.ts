// https://www.educative.io/courses/grokking-the-coding-interview/qVljv3Plr67
//
// Observe, their are k2 - k1 - 1 elements within the range.
// Use a maxHeap to store the top k2 smallest elements,
// Since it is a maxHeap, the numbers within the range should be the top
//  k2 - k1 - 1 elements
// Remove the top k2 - k1 - 1 elements and return their sum
//
// Time: the size of the maxHeap -- k2, hence the populating of the heap takes
//  O(NlogK2); the removing of the tops take O((k2 - k1 - 1)logK2)
//  thus, O(NlogK2 + k2logk2)
// Space: bounded by the heap size -- O(k2)

import { Heap } from 'typescript-collections'

export const sumElements = (nums: number[], k1: number, k2: number): number => {
  const maxHeap = new Heap<number>((a, b) => a - b)
  nums.forEach((num) => {
    if (maxHeap.size() < k2) {
      maxHeap.add(num)
    } else {
      const top = maxHeap.peek() as number
      if (num < top) {
        maxHeap.removeRoot()
        maxHeap.add(num)
      }
    }
  })
  let sum = 0
  for (let i = 0; i < k2 - k1 - 1; i += 1) {
    const top = maxHeap.removeRoot()
    if (top !== undefined) {
      sum += top
    }
  }
  return sum
}

//--- r1 ---//

// We can keep the smallest K2 -1 elements in a maxHeap of size (k2 - 1)
// Then, pop out the top k2 - 1 - k1 elements, they should be the elements
//  between the k1 smallest and k2 smallest (not including k1 and k2)
// Return their sum
//
// Time: O((k2 - k1 - 1)logK2)
// Space: O(k2)

export const sumElements_r1 = (
  nums: number[],
  k1: number,
  k2: number
): number => {
  const maxHeap = new Heap<number>((a, b) => a - b)
  nums.forEach((num) => {
    if (maxHeap.size() < k2 - 1) {
      maxHeap.add(num)
    } else {
      const top = maxHeap.peek() as number
      if (num < top) {
        maxHeap.add(num)
        maxHeap.removeRoot()
      }
    }
  })

  let sum = 0
  for (let i = 0; i < k2 - k1 - 1; i += 1) {
    if (maxHeap.size() > 0) {
      sum += maxHeap.removeRoot() as number
    }
  }
  return sum
}

//--- r2 ---//
//
// 1. keep the top k2-1 smallest numbers in a maxHeap
// 2. continuously pop out k2 - 1 - k1 elements from the maxHeap (the remaining
//  k1 would be the top k1 smallest, thus the popped out elements should be
//  between the k1 and k2 smallest); get their sum
//
// Time: O(Nlogk2) -- the size of the heap is k2; the populating of the heap and the
//  removing roots are bounded by N
// Space: O(K2)

export function sumElements_r2(nums: number[], k1: number, k2: number): number {
  const maxHeap = new Heap<number>((a, b) => a - b)
  nums.forEach((num) => {
    if (maxHeap.size() < k2 - 1) {
      maxHeap.add(num)
    } else if (maxHeap.peek() > num) {
      maxHeap.add(num)
    }
  })
  let sum = 0
  for (let i = 0; i < k2 - k1 - 1; i += 1) {
    if (maxHeap.size() > 0) {
      sum += maxHeap.removeRoot() as number
    }
  }
  return sum
}
