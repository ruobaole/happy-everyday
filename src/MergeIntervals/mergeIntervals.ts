// https://www.educative.io/courses/grokking-the-coding-interview/3jyVPKRA8yx
//
// 1. Sort the intervals by their starting point in ascending order.
//   after sorting, we only need to iterate the array once because
//   if intervals[i] is not overlapped with intervals[i-1]; then intervals[i] must not overlap with
//   any of the intervals previous to i-1;
//   thus, we only need to merge consecutive intervals aggregately from the beginning till the end
// 2. to merge intervals a and b (a.start <= b.start)
//   there are 4 scenarios:
//   1) the two do not overlap
//   2) some part of b overlaps with a
//   3) a fully contains b
//   4) b fully contains a and the two share the same start
//   thus, if b.start <= a.end (overlaps): merged.start = a.start, merged.end = max(a.end, b.end)
//       else: not overlap
// 3. iterate from the array
//   init the result array with intervals[0]
//   compares result[result.length - 1] with the new interval
//   if the two do not overlaps: push the new interval in
//   if overlaps: pop out from the result and push in the merged new interval
//
// Time: O(NlogN) -- we only need to iterate the array once -> O(N), the sorting takes O(NlogN)
// Space: O(N) -- the result takes O(N) space, and so does the sorting process

export class Interval {
  public start: number
  public end: number
  constructor(start: number, end: number) {
    this.start = start
    this.end = end
  }

  get_interval() {
    return '[' + this.start + ', ' + this.end + ']'
  }
}

export const mergeIntervals = (intervals: Interval[]): Interval[] => {
  const result: Interval[] = []
  if (intervals.length === 0) {
    return result
  }
  intervals.sort((a, b) => a.start - b.start)
  result.push(intervals[0])
  for (let i = 1; i < intervals.length; i += 1) {
    const curItv = intervals[i]
    const prevItv = result[result.length - 1]
    if (curItv.start > prevItv.end) {
      // do not overlap
      result.push(curItv)
    } else {
      // the two overlaps
      const mergedItv = new Interval(
        prevItv.start,
        Math.max(prevItv.end, curItv.end)
      )
      result.pop()
      result.push(mergedItv)
    }
  }
  return result
}

// Similar Problem
// Given a set of intervals, find out if any two intervals overlap.
//
// Example:
// Intervals: [[1,4], [2,5], [7,9]]
// Output: true
// Explanation: Intervals [1,4] and [2,5] overlap
//
// 1. the same strategy. Sort the array by starting point first
// 2. use i, i+1 pointers to compare all the consecutive pairs.
//   If overlapped intervals occured, they must (and only can) be consecutive ones after sorting.

// review practices //

// 1. sort the invervals on starting point. After sorting, if two consecutive intervals do not
//  overlap, the later one should not overlap with any that previous to the earlier one.
//  Thus, we only need to merge consecutive intervals repeatedly, and push the result.
// 2. starting from the first, try to merge i and i+1. There're two base cases
//  2.1) they can be merged into invervalC -- push intervalC into result list;
//  try intervalC (the last of result) with i+2 in the next iteration
//  2.2) they cannot be merged -- push the two into the result list.
//  try i+1 (the last of result) with i+2 in the next iteration
//
// Time: O(N) -- merging two intervals takes O(1), looping takes O(N)
// Space: O(N) at most the same size as the input

export const mergeIntervals_r1 = (intervals: Interval[]): Interval[] => {
  const result: Interval[] = []
  if (intervals.length === 0) {
    return result
  }
  intervals.sort((a, b) => a.start - b.start)
  let last = intervals[0]
  for (let i = 1; i < intervals.length; i += 1) {
    // try to merge last with the current interval
    if (intervals[i].start > last.end) {
      // no overlap
      result.push(last)
      last = intervals[i]
    } else {
      // overlapped
      last = new Interval(last.start, Math.max(last.end, intervals[i].end))
    }
  }
  result.push(last)
  return result
}

//--- r2 ---//
//
// Answer the following questions:
// 1. How to determine if 2 intervals overlap with each other?
//  1) sort them by their starting time
//  2) if itv2.start <= itv1.end
// 2. what is the merged interval?
//  start = itv1.start
//  end = max(itv1.end, itv2.end)
// 3. is the merged interval follow the same rule in 1
//  yes - mergedItv.start < itv3.start
// 4. what if the 2 do not overlap?
//  curItv = itv2
//  does not break rule 1 and 2
// Now, we have the solution
// use result[] to store the merged intervals
// init result with [itv1]
// in each iteration, compare result[result.length - 1] with the next itv
//   in the array;
// - if the 2 overlaps, pop the top from result, merge with the head in intervals[],
//  push the merged into result
// - if do not overlap, push the head of intervals[] to result
//
// Time: O(NlogN) - N iterations to compare and merge; however the sorting takes O(NlogN)
// Space: O(N) - the result space as well as the space taken by sorting

export function mergeIntervals_r2(intervals: Interval[]): Interval[] {
  const result: Interval[] = []
  if (intervals.length === 0) {
    return result
  }
  intervals.sort((a, b) => a.start - b.start)
  result.push(intervals[0])
  let cur = intervals[0]
  let next = cur
  for (let i = 1; i < intervals.length; i += 1) {
    cur = result[result.length - 1]
    next = intervals[i]
    if (next.start <= cur.end) {
      // if the 2 overlap
      result.pop()
      result.push(new Interval(cur.start, Math.max(cur.end, next.end)))
    } else {
      // if the 2 do not overlap
      result.push(next)
    }
  }
  return result
}

// Similar Problem - find if any 2 intervals overlaps
// The same strategy, break when any cur overlaps with next
