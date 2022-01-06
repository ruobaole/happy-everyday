// https://www.educative.io/courses/grokking-the-coding-interview/B819G5DZBxX
//
// For the constructor, we store the initial array in a minHeap (with size K)
// For the add(), there're 2 cases --
//  1) the size of the minHeap is smaller than k, add the num and return the peek()
//  2) the size of the minHeap is k, add the new number, remove one root, and return
//   the peek()
//
// Time: the constructor takes O(klogK) to add all k numbers into the minHeap
//   the add() takes at most O(logK) to a add a new number and pop out the root
// Space: O(k) to store the minHeap

import { Heap } from 'typescript-collections'

export class KthLargestNumberInStream {
  public k: number
  private minHeap: Heap<number>

  constructor(nums: number[], k: number) {
    this.k = k
    this.minHeap = new Heap<number>((a, b) => b - a)
    for (let i = 0; i < nums.length && i < k; i += 1) {
      this.minHeap.add(nums[i])
    }
    for (let i = k; i < nums.length; i += 1) {
      const top = this.minHeap.peek()
      if (top !== undefined && top < nums[i]) {
        this.minHeap.removeRoot()
        this.minHeap.add(nums[i])
      }
    }
  }

  add(num: number): number {
    this.minHeap.add(num)
    if (this.minHeap.size() > this.k) {
      // the size must be k + 1
      this.minHeap.removeRoot()
    }
    return this.minHeap.peek() as number
  }
}
