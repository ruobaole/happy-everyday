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

// review practices //

// Two Heaps:
//  the smaller half (maxHeap) & the larger half (minHeap)
//  to store the number inserted;
// Everytime a new number is inserted --
// 1. compare it to the top of the maxHeap
//  if smaller, it should be in the smaller half;
//  maxHeap.add(newNum)
//  else, it should be in the larger half;
//  minHeap.add(newNum)
// 2. balance the two heap based on their size -- the maxHeap
//  to have at most 1 elements more than the minHeap
// When finding median, return the top of the maxHeap or the average
//  of the two heaps' top (based on the total size)
//
// Time:
//  - insert: O(logN); the inserting into the heap costs O(logN)
//    the balancing heaps calls for at most 1 pop out and 1 inserting
//    into the heap -- O(logN)
//  - find median: O(1)
// Space: O(N) - store all numbers inserted

export class MedianOfAStreamR1 {
  private maxHeap: Heap<number>
  private minHeap: Heap<number>
  constructor() {
    this.maxHeap = new Heap<number>((a, b) => a - b)
    this.minHeap = new Heap<number>((a, b) => b - a)
  }

  insert_num(num: number): void {
    // 1. add number
    const maxHeapTop = this.maxHeap.peek()
    if (
      maxHeapTop === undefined ||
      (maxHeapTop !== undefined && maxHeapTop >= num)
    ) {
      this.maxHeap.add(num)
    } else {
      this.minHeap.add(num)
    }
    // 2. balancing heaps
    if (this.maxHeap.size() - this.minHeap.size() > 1) {
      const maxHeapRoot = this.maxHeap.removeRoot()
      if (maxHeapRoot !== undefined) {
        this.minHeap.add(maxHeapRoot)
      }
    }
    if (this.minHeap.size() > this.maxHeap.size()) {
      const minHeapRoot = this.minHeap.removeRoot()
      if (minHeapRoot) {
        this.maxHeap.add(minHeapRoot)
      }
    }
  }

  find_median(): number {
    const N = this.minHeap.size() + this.maxHeap.size()
    if (N % 2 === 1) {
      // odd
      return this.maxHeap.peek() as number
    }
    const maxHeapTop = this.maxHeap.peek() as number
    const minHeapTop = this.minHeap.peek() as number
    return (maxHeapTop + minHeapTop) / 2
  }
}

//--- r2 ---//
//
// 2 Heaps -- minHeap to store the larger half, maxHeap
// to store the smaller half;
// Insersion:
// 1. compare the new number with the top of the maxHeap,
//  if smaller, it should be in the smaller half (the maxHeap);
//  else, it should be in the larger half (the minHeap);
//  add the new number to the heap it belongs;
// 2. balancing the 2 heaps
//  we decide that the maxHeap can have at least 1 element more than
//  the minHeap
//  thus, everytime when balancing, we compare the sizes of the 2 heaps;
//  if maxHeap.size() - minHeap.size() > 1, move the top of the maxHeap to minHeap;
//  if minHeap.size() - maxHeap.size() > 0, move the top of the minHeap to maxHeap;
// Find Median:
// if odd numbers -- return the top of the maxHeap
// if even -- return the average of the 2 heaps' top
//
// Time:
// - Insersion -- O(logN); the add into the heap costs O(logN); when balancing, we pop
//  out at most 1 element from one heap and insert into another -- costs O(logN)
// - Find Median -- O(1)
// Space: O(N)

export class MedianOfAStreamR2 {
  private maxHeap: Heap<number>
  private minHeap: Heap<number>

  constructor() {
    this.maxHeap = new Heap<number>((a, b) => a - b)
    this.minHeap = new Heap<number>((a, b) => b - a)
  }

  insert_num(num: number): void {
    // 1. adding into the right heap
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.add(num)
    } else {
      this.minHeap.add(num)
    }
    // 2. balancing
    if (this.maxHeap.size() - this.minHeap.size() > 1) {
      const top = this.maxHeap.removeRoot() as number
      this.minHeap.add(top)
    }
    if (this.minHeap.size() - this.maxHeap.size() > 0) {
      const top = this.minHeap.removeRoot() as number
      this.maxHeap.add(top)
    }
  }

  find_median(): number | undefined {
    const N = this.maxHeap.size() + this.minHeap.size()
    if (N === 0) {
      return undefined
    }
    if (N % 2 === 0) {
      const maxTop = this.maxHeap.peek() as number
      const minTop = this.minHeap.peek() as number
      return (maxTop + minTop) / 2
    }
    return this.maxHeap.peek() as number
  }
}
