// https://www.educative.io/courses/grokking-the-coding-interview/JExVVqRAN9D
//
// 1. We know that A and B have intersections if one of their start point is within the range of the
//  other interval
// 2. If A and B intersect, the intersection part should be
//  inter.start = max(a.start, b.start); inter.end = min(a.end, b.end)
// 3. We also know that since A contains disjoint intervals and so deos B -- their intersections
//  can not be intersected with each other (intersections are only part of A or B)
// Thus, we only need to use two pointers a and b to get intersects from A and B and continue
// The only problem is how we should move the pointers in each step
//   1. if the two are not intersected -- the one that ends earlier should progress by 1
//     since the one that ends late can have intersections with others
//   2. if the two intersects -- we should also move the one that ends ealier by 1
//     the reason is the same
//
// Time: O(N+M) we only need to visited all elements in the two list once
// Space: the extra space needed is the result intersects.

import { Interval } from './mergeIntervals'

export const findIntersections = (
  intervalsA: Interval[],
  intervalsB: Interval[]
): Interval[] => {
  const result: Interval[] = []
  let a = 0
  let b = 0
  while (a < intervalsA.length && b < intervalsB.length) {
    const itvA = intervalsA[a]
    const itvB = intervalsB[b]
    const aFailsInB = itvA.start >= itvB.start && itvA.start <= itvB.end
    const bFailsInA = itvB.start >= itvA.start && itvB.start <= itvA.end
    if (aFailsInB || bFailsInA) {
      result.push(
        new Interval(
          Math.max(itvA.start, itvB.start),
          Math.min(itvA.end, itvB.end)
        )
      )
    }
    if (itvA.end < itvB.end) {
      a += 1
    } else {
      b += 1
    }
  }
  return result
}

// review practice //

// Use two pointers to iterate both of the arrays at the same time, see if i1 and i2 overlapped.
// if the two overlapped:
//   the intersection has start = max(i1.start, i2.start), end = min(i1.end, i2.end)
//   and then, we should move the one that ends earlier to the next one and see if it overlaps with
//   the same one in the other list.
// if the two do not overlap:
//   we should also move the pointer that points to the one ends earlier, because the later ended one
//   could be overlap with others in the array.
//
// Time: O(N+M)
// Space: O(N+M)

export const findIntersections_r1 = (
  intervalsA: Interval[],
  intervalsB: Interval[]
): Interval[] => {
  const result: Interval[] = []
  let ia = 0
  let ib = 0
  while (ia < intervalsA.length && ib < intervalsB.length) {
    const a = intervalsA[ia]
    const b = intervalsB[ib]
    const isOverlapping =
      (a.start >= b.start && a.start <= b.end) ||
      (b.start >= a.start && b.start <= a.end)
    if (isOverlapping) {
      result.push(
        new Interval(Math.max(a.start, b.start), Math.min(a.end, b.end))
      )
    }
    if (a.end <= b.end) {
      ia += 1
    } else {
      ib += 1
    }
  }
  return result
}
