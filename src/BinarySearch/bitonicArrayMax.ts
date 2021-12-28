// https://www.educative.io/courses/grokking-the-coding-interview/RMyRR6wZoYK
//
// Binary search, each time, compare arr[mid] with arr[mid + 1]
//  - if arr[mid] === undefined, return arr[mid + 1]
//  - if arr[mid + 1] === undefined, return arr[mid]
// since their are no consecutive duplicate elements
//  - if arr[mid] < arr[mid + 1], we know that we are at the increasing part
//  of the array -> the max should be to the right of mid
//  hence, start = mid + 1
//  - if arr[mid] > arr[mid + 1], we know that we are at the decreasing part
//  of the array, the max could be mid, or to the left of mid,
//  we can mark arr[mid] as the temp max and continue searching in end = mid - 1
// break when start > mid, return the recorded max
//
// Time: O(logN)
// Space: O(1)

export const bitonicArrayMax = (arr: number[]): number => {
  // Assume that arr contains at least one element
  let start = 0
  let end = arr.length - 1
  let mid = start
  let max = arr[0]
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === undefined) {
      return arr[mid + 1]
    }
    if (arr[mid + 1] === undefined) {
      return arr[mid]
    }
    if (arr[mid] < arr[mid + 1]) {
      // increasing part
      start = mid + 1
    } else {
      // arr[mid] > arr[mid + 1]
      // decreasing part
      max = arr[mid]
      end = mid - 1
    }
  }
  return max
}

//--- r1 ---//

// In every iteration, for the mid, we can tell if the mid
//  is in the ascending part of the bitonic array or the descending part
//  by --
// - if arr[mid + 1] is within the bound && arr[mid] <= arr[mid + 1]
//   -> ascending part
// - else, descending part
// We can decide the searching direction based on whether the mid is in the
//  ascending part or the descending part
// - if ascending part, we know that the max should be to the right of mid,
//  hence, start = mid + 1
// - if descending part, we know that the max should be either mid or to the
//  left of mid; thus, we can mark maxIdx = mid temperarily and continue with
//  end = mid - 1
// Note that their are chances that arr[start] === arr[mid] === arr[end] &&
//  start !== end
//  (e.g. [2, 2, 4, 5, 2, 2, 2, 2]) -- if that is the case, we cannot tell
//  which part we're in by comparing arr[mid] with arr[mid + 1] --
// hence, we should process this case first
// in that case, we can only eliminating start and end by
//   start += 1, end -= 1 --> cannot eliminating half of the array
//
// Time: O(logN) - however worst case O(N), if all elements are the same
// Space: O(1)

export const bitonicArrayMax_r1 = (arr: number[]): number => {
  let start = 0
  let end = arr.length - 1
  let mid = start
  let maxIdx = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    // check the tricky duplicate element case first
    if (arr[start] === arr[mid] && arr[mid] === arr[end] && start !== end) {
      start += 1
      end -= 1
    } else if (arr[mid + 1] !== undefined && arr[mid] <= arr[mid + 1]) {
      // ascending part
      start = mid + 1
    } else {
      // descending part
      maxIdx = mid
      end = mid - 1
    }
  }
  return arr[maxIdx]
}
