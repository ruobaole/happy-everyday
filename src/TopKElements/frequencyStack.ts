// https://www.educative.io/courses/grokking-the-coding-interview/Y5zDWlVRz2p
//
// Needless to say that we need a maxHeap so that we can always greedily pop
//  out from the stack follow the given rule
// The maxHeap should compare its elements in two ways:
//  1. compare their frequencies
//  2. if frequencies are the same, compate the sequenceNumber (the order the
//   element is pushed into the stack)
// Thus, every time we are pushed in a new element, we need to:
//  1. if it does not exist before, we need to init its sequenceNumber
//  2. if it exists, increment its frequency
// We push the element into the maxHeap
// Every time when pop() is called, remove the root of the maxHeap.
// Notice that if we repeatedly push in the same number e.g. 3, we should
//  store all these 3s in the maxHeap, so that we can pop out all these 3s.
// In order to get the number's frequency in O(1) time, we also need a hashmap
//  to store each number with its frequency so far.
// Notice that we don't need to update the frequency in the maxHeap when popped,
//  because when pushed in, the element.frequency is inited with its frequency at
//  that time, thus the frequency decreased by 1 each time it is popped automatically.
//
// Time:
//  - push: O(logN) (cost to push into the maxHeap)
//  - pop: O(logN) cost to remove the root of the maxHeap
// Space: O(N)

import { Heap } from 'typescript-collections'

class NumElement {
  public number: number
  public freq: number
  public seqNum: number

  constructor(num: number, freq: number, seqNum: number) {
    this.number = num
    this.freq = freq
    this.seqNum = seqNum
  }

  compare(other: NumElement) {
    if (this.freq !== other.freq) {
      // the one with larger frequency has higher priority
      return this.freq - other.freq
    } else {
      // the one that comes later has higher priority
      return this.seqNum - other.seqNum
    }
  }
}

export class FrequencyStack {
  private maxHeap: Heap<NumElement>
  private freqMap: Record<number, number>
  private sequenceNum: number

  constructor() {
    this.sequenceNum = 0
    this.maxHeap = new Heap<NumElement>((a, b) => a.compare(b))
    this.freqMap = {}
  }

  push(num: number): void {
    if (this.freqMap[num] === undefined) {
      this.freqMap[num] = 0
    }
    this.freqMap[num] += 1
    this.maxHeap.add(new NumElement(num, this.freqMap[num], this.sequenceNum))
    this.sequenceNum += 1
  }

  pop(): number | undefined {
    const result = this.maxHeap.removeRoot()
    if (result !== undefined) {
      this.freqMap[result.number] -= 1
      if (this.freqMap[result.number] === 0) {
        delete this.freqMap[result.number]
      }
    }
    return result === undefined ? undefined : (result.number as number)
  }
}

//--- r1 ---//

// The pop operation follows some rule -> a priority queue, i.e. heap is needed
// Define the element stored in the heap --
//  value: the number's value
//  freq: the number's frequency when it is pushed
//  sequenceNum: the number's sequence number, so that we could pop out elements ordered
//  by the order they entered
// Thus, everytime push(num) is called, we construct a new element of num and push it to the
//   heap;
// In order to get the number's current frequency in O(1), the class need to maintain a hashmap
//  storing each number's current frequency.
// pop() - remove the root of the maxHeap, decrease its frequency in the hashmap
// Because in the element, we store the element's frequency when it enters, thus, the element's
//  frequency (order in the heap) got automatically updated when it is popped.
//
// Time:
//  - push: O(logN)
//  - pop: O(logN)
// Space: O(N)

class Element {
  public value: number
  public freq: number
  public seqId: number

  constructor(v: number, freq: number, seqId: number) {
    this.value = v
    this.freq = freq
    this.seqId = seqId
  }

  compare(other: Element): number {
    if (this.freq !== other.freq) {
      return this.freq - other.freq
    } else {
      return this.seqId - other.seqId
    }
  }
}

export class FrequencyStackR1 {
  private seq: number
  private freqMap: Record<number, number>
  private heap: Heap<Element>

  constructor() {
    this.seq = 0
    this.freqMap = {}
    this.heap = new Heap<Element>((a, b) => a.compare(b))
  }

  push(num: number): void {
    // 1. update freqMap
    if (this.freqMap[num] === undefined) {
      this.freqMap[num] = 0
    }
    this.freqMap[num] += 1
    // 2. push into the heap
    this.heap.add(new Element(num, this.freqMap[num], this.seq))
    // 3. update sequence number
    this.seq += 1
  }

  pop(): number | undefined {
    const top = this.heap.removeRoot()
    if (top !== undefined) {
      const topEle = top as Element
      this.freqMap[topEle.value] -= 1
      // clear numbers that are fully popped out --
      // otherwise the map will ended up to be enormously big
      if (this.freqMap[topEle.value] === 0) {
        delete this.freqMap[topEle.value]
      }
    }
    return top === undefined ? undefined : top.value
  }
}
