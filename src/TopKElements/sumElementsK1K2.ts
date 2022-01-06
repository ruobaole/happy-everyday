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
