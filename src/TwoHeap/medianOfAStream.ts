// https://www.educative.io/courses/grokking-the-coding-interview/3Yj2BmpyEy4
//
// The median of a stream is only related to max of the smaller half and min of the
//   larger half
// We only need to divide the stream into two halves, we don't care the order within the
//   two halves -- two heaps should be the ideal data structures
// -- since the inserting of the heap takes only O(logN) time
// Two heaps: min heap stores the larger half; max heap stores the smaller half;
// Insert Operation:
//  - compare the num with the peek of the max heap, if smaller -> should be in
//   the smaller half -> insert to the max heap
//   else, insert to the min heap
//  - balance the number of the two heaps -- let's decide that if the total number
//   is odd, let the maxHeap to hold 1 elements more than the minHeap
// FindMedian Opereation:
//  - just take the peek of the two heaps
//
// Time:
//  - insertion: O(logN) -- one insertHeap operation + at most one popHeap operation O(logN)
// Space: O(N) - store all numbers

import { Heap } from 'typescript-collections'

export class MedianOfAStream {
  private minHeap: Heap<number>
  private maxHeap: Heap<number>

  constructor() {
    this.minHeap = new Heap<number>((a, b) => b - a)
    this.maxHeap = new Heap<number>()
  }

  insert_num(num: number) {
    // 1) insert number
    const maxHeapPeek: number =
      this.maxHeap.peek() === undefined
        ? Infinity
        : (this.maxHeap.peek() as number)
    if (maxHeapPeek >= num) {
      this.maxHeap.add(num)
    } else {
      this.minHeap.add(num)
    }
    // 2) balance heaps
    if (this.maxHeap.size() - this.minHeap.size() === 2) {
      const removedNum = this.maxHeap.removeRoot()
      if (removedNum !== undefined) {
        this.minHeap.add(removedNum)
      }
    }
  }

  find_median() {
    // Assume: no number added -- return 0
    const maxHeapPeek =
      this.maxHeap.peek() === undefined ? 0 : (this.maxHeap.peek() as number)
    const minHeapPeek =
      this.minHeap.peek() === undefined ? 0 : (this.minHeap.peek() as number)
    if ((this.minHeap.size() + this.maxHeap.size()) % 2 === 1) {
      // odd number
      return maxHeapPeek
    } else {
      return (maxHeapPeek + minHeapPeek) / 2
    }
  }
}
