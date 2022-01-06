// https://www.educative.io/courses/grokking-the-coding-interview/N8MJQNYyJPL
//
// Since the array is sorted in ascending order, we first use binary search to
// search the closest number to X.
// Then, from the closest number, we user two pointers left and right to get the
//  k closest number to X.
// - everytime we compare the absolute distance from arr[left] to X and arr[right]
//  to X
// - get the one with smaller absolute distance, move the pointer
// In order to get the result array in ascending order, we can use a deque, everytime
//  a number is pulled from the left, we insert it from the front;
//  everytime a number is pulled from the right, we insert it on the back;
//
// Time: the binary search takes O(logN), the two pointer search takes k iteration, and
//  the insert of the queue takes O(1)
//  thus, O(logN + K)
// Space: O(K) the resulting arrays

const binarySearchClosest = (arr: number[], X: number): number => {
  // return the closest element's index
  let start = 0
  let end = arr.length - 1
  let mid = start
  let closestIdx = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (arr[mid] === X) {
      closestIdx = mid
      break
    }
    if (arr[mid] < X) {
      start = mid + 1
      closestIdx = mid
    } else {
      end = mid - 1
      closestIdx = mid
    }
  }
  return closestIdx
}

export const kClosestNumbers = (
  arr: number[],
  K: number,
  X: number
): number[] => {
  // Assume that K <= arr.length
  const result: number[] = []
  const closestIdx = binarySearchClosest(arr, X)
  result.push(arr[closestIdx])
  let left = closestIdx - 1
  let right = closestIdx + 1
  while (result.length < K) {
    if (left >= 0 && right < arr.length) {
      if (Math.abs(arr[left] - X) < Math.abs(arr[right] - X)) {
        // left is closer
        result.unshift(arr[left])
        left -= 1
      } else {
        // right is closer
        result.push(arr[right])
        right += 1
      }
    } else if (left >= 0) {
      // right has reached the boundary
      result.unshift(arr[left])
      left -= 1
    } else if (right < arr.length) {
      // left has reached the boundary
      result.push(arr[right])
      right += 1
    }
  }
  return result
}
