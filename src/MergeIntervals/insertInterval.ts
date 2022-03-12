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

// review pratices //

// 1. First, push all intervals that must not overlap with the new one into result lists.
//  i.e. intervals that ends before newInterval starts
//  we iterate throught the list and push all such intervals until we got to the first one that has
//  last.end >= new.start
// 2. last and new could overlap and could not. Cases are:
//  - if last.start > new.end: no overlap; push in new and push in all intervals including and after last
//  - else: overlapped; the merged one has
//   start = min(last.start, new.start), end = max(last.end, new.end)
//   now new = mergedOne; last = nextInterval;
//   we need to continue trying to merge all in the array that can be merged into mergedOne (like a very
//   big snow ball)
// 3. after merge all that can be merged into one, we push in that one into the result, and push in all
//  the rest of the intervals left
//
// Time: O(N) - each interval is only visited once
// Space: O(N) - no more than the original size

export const insertInterval_r1 = (
  intervals: Interval[],
  newInterval: Interval
): Interval[] => {
  const result: Interval[] = []
  let lastIdx = 0
  // 1. push in all the intervals that cannot be overlapped with the new one
  while (
    lastIdx < intervals.length &&
    intervals[lastIdx].end < newInterval.start
  ) {
    result.push(intervals[lastIdx])
    lastIdx += 1
  }
  let newOne = newInterval
  // 2. rolling the snowball, merge all that can be merged into newOne
  while (lastIdx < intervals.length && intervals[lastIdx].start > newOne.end) {
    const lastOne = intervals[lastIdx]
    const mergedOne = new Interval(
      Math.min(lastOne.start, newOne.start),
      Math.max(lastOne.end, newOne.end)
    )
    newOne = mergedOne
    lastIdx += 1
  }
  result.push(newOne)
  // 3. push in all the others left
  while (lastIdx < intervals.length) {
    // merge all the rest that cannot be merged
    result.push(intervals[lastIdx])
    lastIdx += 1
  }
  return result
}

//--- r2 ---//
//
// 1. iterate the array and push all those that cannot be overlapped with
//  the given one into the result[]
// 2. rolling the snowball
//  having newInterval as the merged snowball, merge all intervals that can
//  be merged into the snowball
//  break until the one from the interval does not overlap with the snowball
//  push the snowball to result[]
// 3. iterate and insert all the rest in the array to result[]
//
// Time: O(N)
// Space: O(N)

export function insertInterval_r2(
  intervals: Interval[],
  newInterval: Interval
): Interval[] {
  const result: Interval[] = []
  // 1. push all that cannot be merged into result
  let i = 0
  while (i < intervals.length && intervals[i].end < newInterval.start) {
    result.push(intervals[i])
    i += 1
  }
  // 2. rolling the snowball
  let snowball = newInterval
  while (i < intervals.length && snowball.end >= intervals[i].start) {
    const merged = new Interval(
      Math.min(snowball.start, intervals[i].start),
      Math.max(snowball.end, intervals[i].end)
    )
    snowball = merged
    i += 1
  }
  result.push(snowball)
  // 3. push in all the rest
  while (i < intervals.length) {
    result.push(intervals[i])
    i += 1
  }
  return result
}
