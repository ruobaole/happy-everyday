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
