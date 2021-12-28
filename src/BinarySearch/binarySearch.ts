// https://www.educative.io/courses/grokking-the-coding-interview/R8LzZQlj8lO
//
// We don't know the order of the array being sorted. This can be solved by
//  isAscending = arr[0] <= arr[arr.length - 1]
// Then we just follow the standard binary search process by eliminating half
//  of the array in each time
// NOTE that when getting the middle index: mid = (start + end) / 2
//  if end === Number.MAX_VALUE, adding a number to it will cause overflow
//  -- the solution is to mid = start - (start - end) / 2
//
// Time: O(logN) because we reduce half of the total size of the problem in each
//   time.
// Space: O(1) -- iterative solution; we are reusing the array

export const binarySearch = (arr: number[], key: number): number => {
  if (arr.length === 0) {
    return -1
  }
  const isAscending = arr[0] <= arr[arr.length - 1]
  let keyIdx = -1
  let start = 0
  let end = arr.length - 1
  let mid = start
  while (start <= end) {
    mid = start - (start - end) / 2
    const midNum = arr[mid]
    if (midNum === key) {
      keyIdx = mid
      break
    }
    if (midNum < key) {
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
  return keyIdx
}

//--- r1 ---//

// First, get the sorting order of the array by comparing the first and
//  last element of array -- if isAscending = first <= last
// Then, binary search -- the searching direction is affeced by the sorting
//  order
//
// Time: O(logN)
// Space: O(1)

export const binarySearch_r1 = (arr: number[], key: number): number => {
  if (arr.length === 0) {
    return -1
  }
  const isAscending = arr[0] <= arr[arr.length - 1]
  let start = 0
  let end = arr.length - 1
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
