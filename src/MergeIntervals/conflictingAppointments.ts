// https://www.educative.io/courses/grokking-the-coding-interview/qVV79nGVgAG
//
// The same strategy as mergeIntervals.
// 1. sort the intervals on their starting time
// 2. iteratively compare i and i+1 to see if they overlap. An overlap, if exists
//   must occur between consecutive intervals
//
// Time: O(NlogN) -- the sorting takes nlogn time

import { Interval } from './mergeIntervals'

export const isConflicted = (intervals: Interval[]): boolean => {
  intervals.sort((a, b) => a.start - b.start)
  for (let i = 0; i < intervals.length - 1; i += 1) {
    const cur = intervals[i]
    const next = intervals[i + 1]
    if (next.start < cur.end) {
      return false
    }
  }
  return true
}
