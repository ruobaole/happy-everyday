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
