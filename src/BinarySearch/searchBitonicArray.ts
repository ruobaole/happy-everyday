// https://www.educative.io/courses/grokking-the-coding-interview/mEGORlpZYJE
//
// 2 steps --
// 1. find the index of the max value -- maxIdx
//  maxIdx seperate the array into two parts:
//  [start, maxIdx] -- ascending
//  [maxIdx + 1, end] -- descending
// 2. Try search the key in the two parts
//
// Time: step 1 takes O(logN); step 2 takes O(logN)
//  O(logN)
// Space: O(1)

const searchMaxIndex = (arr: number[]): number => {
  let start = 0
  let end = arr.length - 1
  let mid = start
  let maxIdx = -1
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid + 1] === undefined) {
      maxIdx = mid
      end = mid - 1
    } else if (arr[mid] < arr[mid + 1]) {
      // ascending part -- max is to the right of mid
      start = mid + 1
    } else {
      // descending part -- max is either mid or
      // to the left of mid
      maxIdx = mid
      end = mid - 1
    }
  }
  return maxIdx
}

const binarySearch = (
  arr: number[],
  low: number,
  high: number,
  key: number,
  isAscending: boolean
): number => {
  let start = low
  let end = high
  let mid = low
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === key) {
      return mid
    }
    if (arr[mid] < key) {
      if (isAscending) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    } else {
      if (isAscending) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    }
  }
  return -1
}

export const searchBitonicArray = (arr: number[], key: number): number => {
  const maxIdx = searchMaxIndex(arr)
  if (maxIdx === -1) {
    // array contains no element
    return -1
  }
  let keyIdx = binarySearch(arr, 0, maxIdx, key, true)
  if (keyIdx === -1) {
    keyIdx = binarySearch(arr, maxIdx + 1, arr.length - 1, key, false)
  }
  return keyIdx
}

//--- r1 ---//

// 1. First, find the index of the max element in the array
// 2. use binary search to search for the key in the ascending part
//  i.e. [0, maxIdx], if not found, search in the descending part
// Mind for cases when duplicate consecutive element exists --
//  e.g. [2, 2, 4, 2, 2, 1] -- if the start, end and mid numbers are the
//  same, we cannot tell which part the mid is at
//
// Time: O(logN) - however worst case O(N)
// Space: O(1)

const findMaxIndex = (arr: number[]): number => {
  let start = 0
  let end = arr.length - 1
  let mid = 0
  let maxIdx = -1
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === arr[start] && arr[mid] === arr[end] && start !== end) {
      // duplicate element
      start += 1
      end -= 1
    } else if (mid + 1 < arr.length && arr[mid] <= arr[mid + 1]) {
      // ascending part
      start = mid + 1
    } else {
      // descending part
      maxIdx = mid
      end = mid - 1
    }
  }
  return maxIdx
}

const binarySearchKey = (
  arr: number[],
  low: number,
  high: number,
  isAscending: boolean,
  key: number
): number => {
  let start = low
  let end = high
  let mid = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === key) {
      return mid
    }
    if (arr[mid] < key) {
      if (isAscending) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    } else {
      if (isAscending) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    }
  }
  return -1
}

export const searchBitonicArray_r1 = (arr: number[], key: number): number => {
  const maxIdx = findMaxIndex(arr)
  if (maxIdx === -1) {
    return -1
  }
  let keyIdx = binarySearchKey(arr, 0, maxIdx, true, key)
  if (keyIdx === -1) {
    keyIdx = binarySearchKey(arr, maxIdx + 1, arr.length - 1, true, key)
  }
  return keyIdx
}

//--- r2 --- //
//
// 1. first, find the index of the max element in the array -- maxIdx
// 2. try to find the key in the ascending part -- [0, maxIdx]
// 3. if not found, try finding the key in the descending part
// Notice that the 'monotonically increase or decrease' is defined that no
//  consecutive numbers should be the same -- hence, we do not need to care
//  for the case that we cannot tell which part the mid is in by comparing
//  arr[mid] and arr[mid + 1]
//
// Time: O(logN)

export function searchBitonicArray_r2(arr: number[], key: number): number {
  // Assume that no consecutive numbers are the same
  let idx = -1
  const maxIdx = findBitonicArrayMax(arr)
  if (maxIdx >= arr.length) {
    return idx
  }
  if (key >= arr[0] && key <= arr[maxIdx]) {
    idx = binarySearch_r2(arr, key, 0, maxIdx, true)
  }
  if (idx === -1) {
    idx = binarySearch_r2(arr, key, maxIdx + 1, arr.length - 1, false)
  }
  return idx
}

function findBitonicArrayMax(arr: number[]): number {
  let maxIdx = 0
  let low = 0
  let high = arr.length - 1
  let mid = low
  while (low <= high) {
    mid = Math.floor(low + (high - low) / 2)
    if (mid + 1 >= arr.length || arr[mid] > arr[mid + 1]) {
      // descending part
      maxIdx = mid
      high = mid - 1
    } else {
      // ascending
      low = mid + 1
    }
  }
  return maxIdx
}

function binarySearch_r2(
  arr: number[],
  key: number,
  start: number,
  end: number,
  isAscending: boolean
): number {
  let mid = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === key) {
      return mid
    }
    if (arr[mid] > key) {
      if (isAscending) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    } else {
      if (isAscending) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
  }
  return -1
}
