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
