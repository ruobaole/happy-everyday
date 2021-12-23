// https://www.educative.io/courses/grokking-the-coding-interview/qA5wW7R8ox7
//
// Binary search strategy
// The only difference is that we're to find the smallest number >= the key
// Hence, we cannot eliminate the mid number if arr[mid] > key -- it is still
//  possible that arr[mid] is the ceiling
// This time, the search direction will be
// - midNum === key -> return mid (same)
// - midNum < key -> start = mid + 1 (same)
// - midNum > key -> end = mid
// Mind that this time, if the array size is reduced to 1, and the the number (midNum)
//  > key -- we cannot eliminate the only number -- the size of the searching area
//  cannot be furtherly reduced
// Thus, we break when start >= end
// At last, check if arr[start] >= key, if true, the number is the ceiling we are
//  looking for
//
// Time: O(logN)
// Space: O(1)

export const findCeilingOfNumber = (arr: number[], key: number): number => {
  let keyIdx = -1
  let start = 0
  let mid = start
  let end = arr.length - 1
  while (start < end) {
    mid = Math.floor(start - (start - end) / 2)
    const midNum = arr[mid]
    if (midNum === key) {
      keyIdx = mid
      break
    }
    if (midNum < key) {
      start = mid + 1
    } else {
      end = mid
    }
  }
  if (start === end && arr[start] >= key) {
    keyIdx = start
  }
  return keyIdx
}
