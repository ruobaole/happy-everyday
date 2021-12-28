// https://www.educative.io/courses/grokking-the-coding-interview/mymvP915LY9
//
// Note that in binary search, if we failed to find the key within the array at
//  last, the boundary start and end will be shrinked to places that are nearest
//  to key.
// Hence, we only need to compare numbers at start and end, return the one with
//  the smaller difference.
// Note that it is possible that start or end is out of bound at last (e.g. only one
//  element, or shrinked to the first / last element)
//
// Time: O(logN)
// Space: O(1)

export const findElementsWithMinDiff = (arr: number[], key: number): number => {
  // Assume arr has at least one element
  let start = 0
  let end = arr.length - 1
  let mid = start
  while (start <= end) {
    mid = Math.floor(start - (start - end) / 2)
    if (arr[mid] === key) {
      return arr[mid]
    }
    if (arr[mid] < key) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  const startNum = arr[start]
  const endNum = arr[end]
  if (startNum === undefined) {
    return endNum
  }
  if (endNum === undefined) {
    return startNum
  }
  return Math.abs(startNum - key) < Math.abs(endNum - key) ? startNum : endNum
}

//--- r1 ---//

// Note that in binary search, when we failed to find the target and
//  break at start > end; start and end at last has been shrinked to the bounds
//  that is the closest to the target. analysis --
// Case 1. one of end or start is beyond the bound of the array, the other one
//  is either the first or the last element -- the one with the smallest difference
//  should be this one
// Case 2. start = end + 1, the two points to the two elements that is the closest to
//  the target
//
// Time: O(logN)
// Space: O(1)

export const findElementsWithMinDiff_r1 = (
  arr: number[],
  key: number
): number => {
  let start = 0
  let end = arr.length - 1
  let mid = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === key) {
      return arr[mid]
    }
    if (arr[mid] < key) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  if (arr[start] === undefined) {
    return arr[end]
  }
  if (arr[end] === undefined) {
    return arr[start]
  }
  return Math.abs(arr[start] - key) < Math.abs(arr[end] - key)
    ? arr[start]
    : arr[end]
}
