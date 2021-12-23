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
