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

import { Interval } from './../MergeIntervals/mergeIntervals'
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

// review practices //

// Two heaps or Sorting and One Heap
// An intuitive solution would be to sort the intervals on their starting time, so that
//  in each round, we only need to search rightwards from the interval for its 'next'
// This approach takes O(N^2) time.
// An optimization would be:
// - pop all intervals in a maxHeap ordered by their end time
// - also pop intervals in a maxHeap ordered by their starting time
// 1. each time, pop the root from the maxEndTimeHeap, because all other intervals
//  cannot have 'next' that has a starting time larger than this one's next;
//  we can safely pop all from the maxStartTimeHeap to find the one with the closest
//  starting time -- next found!
// 2. if not found, the next is -1
// 3. continue until the maxEndHeap is empty
//
// Time: the populating of the heaps take O(NlogN); the popping out from the heap takes a
//  maximum of O(NlogN) (all elements are popped) -- however in this case, all the other
//  round can no longer pop elements
//  thus, time is bounded by O(NlogN)
// Space: O(N)

export const findNextInterval_r1 = (intervals: Interval[]): number[] => {
  const next: number[] = new Array(intervals.length).fill(-1)
  // [interval, idx]
  const maxEndHeap: Heap<[Interval, number]> = new Heap(
    (a, b) => a[0].end - b[0].end
  )
  const maxStartHeap: Heap<[Interval, number]> = new Heap(
    (a, b) => a[0].start - b[0].start
  )
  intervals.forEach((itv, idx) => {
    maxEndHeap.add([itv, idx])
    maxStartHeap.add([itv, idx])
  })
  while (maxEndHeap.size() > 0) {
    const curInterval = (maxEndHeap.removeRoot() as [Interval, number])[0]
    const curIdx = (maxEndHeap.removeRoot() as [Interval, number])[1]
    if (curInterval) {
      let closestNext: Interval | undefined
      let nextIdx = -1
      while (
        maxStartHeap.peek() !== undefined &&
        (maxStartHeap.peek() as [Interval, number])[0].start >= curInterval.end
      ) {
        closestNext = (maxStartHeap.removeRoot() as [Interval, number])[0]
        nextIdx = (maxStartHeap.removeRoot() as [Interval, number])[1]
      }
      if (closestNext) {
        // don't forget to add back to the heap
        // because one interval can be the next of multiple intervals
        maxStartHeap.add([closestNext, nextIdx])
      }
      next[curIdx] = nextIdx
    }
  }
  return next
}

//--- r2 ---//
//
// Two Heaps OR One Heap + sorting
// - a minHeap ordered by the intervals' end time
// - a minHeap ordered by the intervals' start time
// In every iteration:
// - pop out the root of the minHeapEnd;
// - pop intervals from the minHeapStart, until the top of the
//  heap has start time >= curInterval's end time
//  because further intervals' end time must be larger than this interval's
//  end time, all the intervals that has been popped out from the minHeapStart
//  can be safely discarded;
// - break the iteration when minHeapStart is empty; all the rest intervals' next
//  should be -1
//
// Time: O(NlogN) -- N intervals in the heap; N rounds of remove root;
// Space: O(N)

export function nextInterval(intervals: Interval[]): number[] {
  if (intervals.length === 0) {
    return []
  }
  const result = new Array(intervals.length).fill(-1)
  // [endtime, intervalIdx]
  const minHeapEnd = new Heap<[number, number]>((a, b) => b[0] - a[0])
  // [startTime, intervalIdx]
  const minHeapStart = new Heap<[number, number]>((a, b) => b[0] - a[0])
  intervals.forEach((itv, idx) => {
    minHeapEnd.add([itv.end, idx])
    minHeapStart.add([itv.start, idx])
  })
  while (!minHeapEnd.isEmpty()) {
    const [curEnd, curIdx] = minHeapEnd.removeRoot() as [number, number]
    while (!minHeapStart.isEmpty() && minHeapStart.peek()[0] < curEnd) {
      minHeapStart.removeRoot()
    }
    if (minHeapStart.size() > 0) {
      const [nextStart, nextIdx] = minHeapStart.peek() as [number, number]
      result[curIdx] = nextIdx
    } else {
      break
    }
  }
  return result
}
