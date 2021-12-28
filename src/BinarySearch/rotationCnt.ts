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

//--- r1 ---//

// The rotation count is the index of the smallest element.
// Hence, we are to find the index of the min.
// For every mid we have, first check if it is the min. Several cases--
//  1. mid - 1 < 0 && arr[mid] <= arr[mid+1]
//  2. arr[mid] < arr[mid-1]
//  (arr[mid] === arr[mid-1] -> all elements are the same, min should be the
//   1st element)
// If not, we know that mid should seperates the array into two parts--
// - the sorted part (startNum <= midNum || midNum <= endNum)
// - the unsorted part (the other part)
// the min should be in the unsorted part
// NOTE that in cases when rotation count is 0, e.g. [1, 2, 3, 4, 5, 5, 8]
//  both parts are sorted parts -- we should search in the smaller part
//  hence, we should make priority to check if [mid, end] is sorted part
// Also noted when duplicate element occurs -- e.g. [2, 2, 3, 2, 2, 2]
//  we cannot tell which part is sorted by comparing startNum, endNum and midNum
//  -- in that case we can only know that the start and end are not the smallest
//  element we're looking for
//
// Time: O(logN) - however worst case O(N)
// Space: O(1)

export const countRotations_r1 = (arr: number[]): number => {
  let start = 0
  let end = arr.length - 1
  let mid = start
  let minIdx = start
  if (arr.length === 0) {
    return minIdx
  }
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (mid - 1 < 0 && arr[mid] <= arr[mid + 1]) {
      minIdx = mid
      break
    }
    if (arr[mid - 1] > arr[mid]) {
      minIdx = mid
      break
    }
    if (arr[start] === arr[mid] && arr[mid] === arr[end] && start !== end) {
      start += 1
      end -= 1
    }
    // check if the larger part is the sorted part first
    else if (arr[mid] <= arr[end]) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  return minIdx
}
