// https://www.educative.io/courses/grokking-the-coding-interview/RM535yM9DW0
//
// Use a minHeap to keep track of the top k largest numbers we have seen --
// First, insert k numbers into the heap
// Then, while iterating the array, if the encountered number --
//  curNum > heapTop -- curNum should be in the top-k largest and the heapTop
//  should be kicked out -- pop out the heap top and add curNum
//
// Time: the inserting of the first k elements take O(klogk)
//  the inserting (replacing) of the further elements takes O((N-k)logk)
//  in worst case
//  thus, overall O(klogk + (n-k)logk), because k <= n -> this solution
//  is faster than the sorting solution (takes O(klogn))
// Space: O(k)

import { Heap } from 'typescript-collections'

export const topKlagrest = (nums: number[], k: number): number[] => {
  const topK: number[] = []
  const minHeap = new Heap<number>((a, b) => b - a)
  let i = 0
  for (i = 0; i < k && i < nums.length; i += 1) {
    minHeap.add(nums[k])
  }
  while (i < nums.length) {
    if (minHeap.peek() !== undefined && nums[i] > (minHeap.peek() as number)) {
      minHeap.removeRoot()
      minHeap.add(nums[i])
    }
    i += 1
  }
  minHeap.forEach((num) => {
    topK.push(num)
  })
  return topK
}
