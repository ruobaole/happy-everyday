// https://www.educative.io/courses/grokking-the-coding-interview/N8XZQ1q1O46
//
// Note that after rotating the array, the array can be described as consists
//  of two ascending parts.
// - the end of the array is connected to the start of the array
// - the next of the max is the min
// Thus, in each iteration, the mid index separates the array into an unsorted
//  part and a sorted part
// - we can see which part is the sorted part by comparing mid with start and end
//  if arr[mid] > arr[start] -> [0, mid] is the sorted part
//  else [mid, end] is the sorted part
// - after finding out the sorted part, we know which part key can be exist
//  comparing key with the boundary of the sorted part, if key is out of that
//  bound, --> it must be in the unsorted part
// - thus, we can elimate half of the array in each iteration
// NOTE that in the above process when finding out the sorted part, we assume
//  that no duplicates exist in the array. What if duplicates occurs?
//  e.g. [2, 2, 4, 2, 2, 2]
// Chances are that the start, mid and end numbers are the same.
// In that case, we cannot tell which part is the sorted part -- we can only eliminating
//  start, end by: start += 1, end -= 1
// We need to first check this case. Then we can find the sorted part by comparing
//  start with mid
//
//
// Time: O(logN) - however, worse case O(N) --> because when duplicate occurs,
//  we cannot eliminating half of the array
// Space: O(1)

export const searchRotatedArray = (arr: number[], key: number): number => {
  let start = 0
  let end = arr.length - 1
  let mid = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === key) {
      return mid
    }
    if (arr[start] === arr[mid] && arr[mid] === arr[end]) {
      // duplicate occurs and we cannot tell which part is sorted
      start += 1
      end -= 1
    } else if (arr[start] <= arr[mid]) {
      // [start, mid] is the sorted part
      if (key < arr[mid] && key >= arr[start]) {
        // key within the range
        // dump the unsorted part
        end = mid - 1
      } else {
        // key is not in the range
        // dump the sorted part
        start = mid + 1
      }
    } else {
      // [mid, end] is the sorted part
      if (key > arr[mid] && key <= arr[end]) {
        // key within the sorted part
        // dump the other part
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
  }
  return -1
}

//--- r1 ---//

// Observe the array first.
// arr[0] is either the smallest (rotation 0) or larger than arr[end]
// The next element of the largest is the smallest element.
// For each mid, it seperates the array into two parts:
// 1. a sorted part (startNum <= midNum || midNum <= endNum)
// 2. a non-sorted part
// We can first tell which part mid is in by comparing midNum with
//  starNum and endNum
// Then, we know the searching direction --
//  see if the key is in the range of the sorted part.
//  if true, search in this part
//  if not, search in the unsorted part
// NOTE that when judging which part is the sorted part, if the array
//  contains duplicate elements -- e.g. [2, 2, 2, 4, 5, 2, 2]
//  when startNum === midNum === endNum
//  we cannot tell which part is the sorted part
//  in that case, we can only eliminate start and end in the next searching
//  iteration.
//
// Time: O(logN) - however worst case O(N)
// Space: O(1)

export const searchRotatedArray_r1 = (arr: number[], key: number): number => {
  let start = 0
  let end = arr.length - 1
  let mid = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === key) {
      return mid
    }
    if (arr[start] === arr[mid] && arr[mid] === arr[end] && start !== end) {
      // duplicate element and we cannot tell the parts
      start += 1
      end -= 1
    } else if (arr[start] <= arr[mid]) {
      // [start, mid] is the sorted part
      if (key < arr[mid] && key >= arr[start]) {
        // key is in the sorted part
        end = mid - 1
      } else {
        // key is in the unsorted part
        start = mid + 1
      }
    } else {
      // [mid, end] is the sorted part
      if (key <= arr[end] && key > arr[mid]) {
        // key is in the sorted part
        start = mid + 1
      } else {
        // key is in the unsorted part
        end = mid - 1
      }
    }
  }
  return -1
}

//--- r2 ---//
//
// The mid breaks the array into 2 parts -- a sorted part, and
//  a non-sorted part;
// Each time --
// First, tell which part is the sorted part;
// Second, see if the key is within the range of the sorted part, if
//  true, search in the sorted part
//  else, search in the non-sorted part
// How do we tell which part is the sorted part?
// compare arr[start] with arr[mid], if arr[start] <= arr[mid]: sorted part
//  else, non-sorted part
// NOTE situation when duplicate elements occure. e.g. [8, 8, 8, 8, 8, 1, 3, 8]
//  or [8, 9, 12, 8, 8, 8, 8, 8]
// We should process this case first -- arr[start] === arr[mid] === arr[end] &&
//  start !== end
// In such case, we cannot tell which part is the sorted part by comparing arr[start]
//  and arr[mid]. thus, we can only eliminating start and end if they are not the keys;
//
// Time: O(logN), however worst case O(N) when all elements are the same

export function searchRotatedArray_r2(arr: number[], key: number): number {
  let start = 0
  let end = arr.length
  let mid = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === key) {
      return mid
    }
    if (start !== end && arr[start] === arr[mid] && arr[mid] === arr[end]) {
      start += 1
      end -= 1
      continue
    }
    if (arr[start] <= arr[mid]) {
      // [start, mid] is the sorted part
      if (key >= arr[start] && key < arr[mid]) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    } else {
      // [mid, end] is the sorted part
      if (key > arr[mid] && key <= arr[end]) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
  }
  return -1
}
