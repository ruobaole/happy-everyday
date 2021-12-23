// https://www.educative.io/courses/grokking-the-coding-interview/R1v4P0R7VZw
//
// The problem is to find the min element's index -- i.e the rotation count
// For every mid, we should first check if the mid is the min -- 2 possible
//  cases
// 1. arr[min - 1] > arr[min]
// 2. arr[min - 1] < 0 && arr[min] < arr[min + 1]
// 3. min is the only element -- arr[min - 1] < 0 && arr[min + 1] out of bound
// If either of this is true, min is found
// If not, we know that mid seperates the array into two parts -- the sorted part
//  and the unsorted part
// we should abandon the sorted part. we can safely abandon mid with the sorted part
//  because we have already checked and know that mid is not the min
// Note that when duplicate elements exist --
// Chances are that start, mid and end are the same
// e.g. [2, 2, 8, 2, 2, 2]
// This is the only case that we cannot know which part is the sorted part --
//  we can only abandon start and end by
//  start += 1, end -= 1
// TRICKY: when searching, we should check if the left part is the sorted part and
//  abandon it first
//  - because when the rotation count is 0 -- both the parts are sorted part
//  in this case the min is the smaller part
//
// Time: O(logN) - worst case O(N)
// Space: O(1)

export const countRotations = (arr: number[]): number => {
  let start = 0
  let end = arr.length - 1
  let mid = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    // check if mid is the min
    if (arr[mid - 1] === undefined && arr[mid + 1] === undefined) {
      return mid
    }
    if (arr[mid - 1] === undefined && arr[mid] < arr[mid + 1]) {
      return mid
    }
    if (arr[mid - 1] > arr[mid]) {
      return mid
    }
    // continue searching
    // check annoying duplicate case first
    if (arr[start] === arr[mid] && arr[mid] === arr[end]) {
      start += 1
      end -= 1
    } else if (arr[mid] <= arr[end]) {
      // [mid, end] is the sorted part
      end = mid - 1
    } else {
      // [start, mid] is the sorted part
      start = mid + 1
    }
  }
  return -1
}
