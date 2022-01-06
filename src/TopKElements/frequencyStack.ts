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
