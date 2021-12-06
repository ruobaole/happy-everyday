// https://www.educative.io/courses/grokking-the-coding-interview/gkkmqXO6zrY
//
// Two Heaps:
//  - minHeapEnding; minHeap based on the ending time of the intervals
//  - minHeapStarting; minHeap based on the starting time of the intervals
// In each round:
//  1) get the root from the minHeapEnding; because any interval that has starting
//   time earlier than this interval must cannot be the next interval of any other
//   intervals in the minHeapEnding
//  2) pop all from the minHeapStarting that cannot be the 'next' of the current
//   interval
//   if still intervals in the minHeapStarting -- mark it as the next
//   (do not pop it, as it can also be the next of other intervals)
//   if not -- the next is -1
// Repeat the process untill the minHeapEnding is empty
//
// Time: O(NlogN) -- the populating of the two heaps takes O(NlogN); and the removingRoot
//   takes as much as O(NlogN)
// Space: O(N)

import { Interval } from '@src/MergeIntervals/mergeIntervals'
import { Heap } from 'typescript-collections'

export const findNextInterval = (intervals: Interval[]): number[] => {
  // [interval, index]
  const minHeapEnding = new Heap<[Interval, number]>(
    (a, b) => b[0].end - a[0].end
  )
  const minHeapStarting = new Heap<[Interval, number]>(
    (a, b) => b[0].start - a[0].start
  )
  intervals.forEach((itv, idx) => {
    minHeapEnding.add([itv, idx])
    minHeapStarting.add([itv, idx])
  })
  const result = new Array(intervals.length).fill(-1)
  while (minHeapEnding.size() > 0) {
    const cur = minHeapEnding.removeRoot() as [Interval, number]
    const curIdx = cur[1]
    while (
      minHeapStarting.size() > 0 &&
      (minHeapStarting.peek() as [Interval, number])[0].start < cur[0].end
    ) {
      minHeapStarting.removeRoot()
    }
    if (minHeapStarting.size() > 0) {
      // find next
      const curNext = minHeapStarting.peek() as [Interval, number]
      result[curIdx] = curNext[1]
    }
  }
  return result
}
