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