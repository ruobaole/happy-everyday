// https://www.educative.io/courses/grokking-the-coding-interview/3jKlyNMJPEM
//
// Roughly thinking, first we have to find the right place for the newInterval to lay on.
//   And then, merge it with its prev one.
//   Imagine we have a newInterval that is extremely long -- overlap with all the intervals
//   after it -- we have to iteratively merge it with all the rest of intervals anyway. -- unavoidable
//   Hence, the only trick is how we can merge them with cleaner code.
// Method 1. insert it use the same strategy as sorting. i.e. skip all intervals which
//   itv.start <= newInterval.start
//   prevItv - a; newInterval - b;
//   c = merge(a, b), c = a, b = newInverval's next interval, ...
// Method 2. skip all intervals which itv.end < itv.start
//   nextItv - a (the first which ends after newInterval starts); newInterval - b;
//   c = merge(a, b), c = b, a = newInterval's next's next interval, ...
//
// Time: O(N) each intervals are inspect only once
// Space: O(N) -- the result takes O(N) space

import { Interval } from './mergeIntervals'

export const insertInterval = (
  intervals: Interval[],
  newInterval: Interval
): Interval[] => {
  const result: Interval[] = []
  let nextItvIdx = 0
  while (
    nextItvIdx < intervals.length &&
    intervals[nextItvIdx].end < newInterval.start
  ) {
    result.push(intervals[nextItvIdx])
    nextItvIdx += 1
  }
  // merge all that can be merged
  while (
    nextItvIdx < intervals.length &&
    intervals[nextItvIdx].start < newInterval.end
  ) {
    newInterval.start = Math.min(intervals[nextItvIdx].start, newInterval.start)
    newInterval.end = Math.max(intervals[nextItvIdx].end, newInterval.end)
    nextItvIdx += 1
  }
  result.push(newInterval)
  // push all that rest that can not be merged
  while (nextItvIdx < intervals.length) {
    result.push(intervals[nextItvIdx])
    nextItvIdx += 1
  }
  return result
}
