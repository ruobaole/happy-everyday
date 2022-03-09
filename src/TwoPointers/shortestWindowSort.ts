// https://www.educative.io/courses/grokking-the-coding-interview/N8rOAP6Lmw6
//
// If we are traversing an sorted array (ascending order) from left to right, then the
// max of the traversed part should always be the element we are currently pointing at.
// Thus, if arr[right] < curMax, we knew that the subarray ending at i is not sorted.
// How to find the starting point of this subarray? we need to slide the left bound from the first peak leftwards
//  until we encounter the first arr[left] <= arr[right], meaning that if sorted, arr[right] should be positioned after
//  arr[left].
// Now we've got a subarray, the resulting subarray could only be larger not smaller. Thus, we continue
//  sliding the right rightwards. Follow the same rule.
// Don't forget to update curMax if arr[right] > curMax.
//
// left - left+1 being the starting point of the resulting window;
// right - to detect rest of the array
// len - the length of the resulting window
// firstPeakFound - if first peak encountered
// 1. curMax init with -Infinity. Move right from 0 rightwards, 1 step each time
//   if arr[right] >= curMax, update curMax; update left to right if !firstPeakFound
//   if arr[right] < curMax, move left leftwards until arr[left] <= arr[right] or left === -1
//      len = right - (left + 1) + 1 = right - left
//      if (!firstPeakFound) firstPeakFound = true
// NOTE case: [3, 3, 3, 3] -> 0
//
// Time: O(N) - each element is at most visited twice

export const shortestWindowSort = (arr: number[]): number => {
  let curMax = -Infinity
  let len = 0
  let right = 0
  let left = -1
  let firstPeakFound = false
  for (right = 0; right < arr.length; right += 1) {
    if (arr[right] >= curMax) {
      // Note Case: [3, 3, 3, 3] -> 0
      curMax = arr[right]
      if (!firstPeakFound) {
        left = right
      }
    } else if (arr[right] < curMax) {
      if (!firstPeakFound) {
        firstPeakFound = true
      }
      while (left >= 0 && arr[left] > arr[right]) {
        left -= 1
      }
      len = right - (left + 1) + 1
    }
  }
  return len
}

// Solution 2. find two bounds and expand - also O(N) time
// 1. from the beginning and end of the array, find leftmost and rightmost element that is out of sort
//    -- candidate bound [low, high]
// 2. find the min and max of the candidate subarray
// 3. any elements that is left to low and > min should be re-arranged, thus include them into the window
// 4. similarly, any elements that is right to high and < max should also be re-arranged, thus include them into
//    the window.
export const shortestWindowSort2 = (arr: number[]): number => {
  // subarray within [low, high] is the resulting window
  let low = 0
  let high = arr.length - 1
  // 1. find the leftmost peak of the array
  while (low + 1 < arr.length && arr[low] <= arr[low + 1]) {
    low += 1
  }
  if (low === arr.length - 1) {
    // till the end of arr
    return 0
  }
  // 2. find the rightmost valley
  while (high - 1 >= 0 && arr[high - 1] <= arr[high]) {
    high -= 1
  }
  // 3. find the min and max of the array
  let min = Infinity
  let max = -Infinity
  arr.forEach((ele, i) => {
    if (i >= low && i <= high) {
      min = Math.min(ele, min)
      max = Math.max(ele, max)
    }
  })
  // 4. expand low leftwards, include all elements that are larger than min
  while (low - 1 >= 0 && arr[low - 1] > min) {
    low -= 1
  }
  // 5. expand high rightwards, include all elements that are smaller than max
  while (high + 1 < arr.length && arr[high + 1] < max) {
    high += 1
  }
  return high - low + 1
}

// review pracitces //

// The problem asked us to find the shortest window that once sorted, the whole array will be sorted.
// Say this window is -- resWindow. It divides the array into 3 parts. left(ascending), resWin(non-ascending),
//   right(ascending)
// The 3 parts should follow such constraints ----
//  minLeft < maxLeft (naturally), maxLeft < minRes, minRes < maxRes (naturally), maxRes < minRight,
//  minRight < maxRight (naturally)
// Thus, 3 steps are needed:
// 1. find the boundary maxLeft, and minRight.
//  from the left and end sides of the array, find the first elements that is out of sort.
//  NOTE: if the array is sorted (e.g. [1, 2, 3]), now resLeft will be at index 2 while resRight = 0
//    we need to give special care to this situation
// 2. correct maxLeft according to minRes
//  traverse from minRes leftwards, includes all elements that is > minRes
//  (now, maxRes could be updated, but since maxRes_new >= maxRes, it does not influence the next step)
// 3. correct minRight according to maxRes
//  traverse from maxRes rightwards, includes all elements that is < maxRes (<= maxRes_new)
//
// Time: O(N)

export const shortestWindowSort2_r1 = (arr: number[]): number => {
  // 1. get initial boundary of the result window
  let left = 0
  let right = arr.length - 1
  while (left < arr.length - 1 && arr[left] <= arr[left + 1]) {
    left += 1
  }
  if (left === arr.length - 1) {
    // the array is sorted
    return 0
  }
  while (right > 0 && arr[right] >= arr[right - 1]) {
    right -= 1
  }
  // 2. get the min and max of the window
  let minRes = arr[left]
  let maxRes = arr[left]
  for (let i = left; i <= right; i += 1) {
    minRes = Math.min(minRes, arr[i])
    maxRes = Math.max(maxRes, arr[i])
  }
  // 3. expand the window -- correct maxLeft and minRight
  while (left - 1 >= 0 && arr[left - 1] > minRes) {
    left -= 1
  }
  while (right + 1 < arr.length && arr[right + 1] < maxRes) {
    right += 1
  }
  return right - left + 1
}

//--- r2 ---//
//
// Observe that the array can be divided into 3 parts:
//  left(ascending) - mid(unsorted) - right(ascending)
// We need to find the left and right boundary of the mid part
// Basic steps are:
// 1. find the 2 intial boundary
// 2. expand the 2 boundaries by comparing with the min and max of the mid part
// In detail
// 1. Find left0 boundary
// traverse from left to right, the first unsorted element, the element before it is
//   left0
// Notice case when left0 === arr.length - 1 -> then the array is sorted return 0
// Find right0 boundary
// traverse from right to left, the first unsorted element, its right neighbor is right0
// Also notice case when right0 === arr.length - 1 -> the array is sorted in descending order
//  return the length of the array
// 2. Expand the boundary
// Expand left0
//   - find the min of all elements to the right of left0
//   - from left0, travel leftwards, includes all elements that are > min
// Expand right0
//   - find the max of all elements to the right of right0
//   - move right0 rightwards, includes all elements that are < max
// return right - left + 1
//
// Time: O(N)

export function shortestWindowSort2_r2(arr: number[]): number {
  let left = 0
  let right = arr.length - 1
  while (left < arr.length - 1 && arr[left] <= arr[left + 1]) {
    left += 1
  }
  if (left === arr.length - 1) {
    // the array is sorted
    return 0
  }
  while (right > 0 && arr[right - 1] < arr[right]) {
    right -= 1
  }
  if (right === arr.length - 1) {
    // array is sorted in reverse order
    return arr.length
  }
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  for (let i = left + 1; i < right; i += 1) {
    min = Math.min(min, arr[i])
    max = Math.max(max, arr[i])
  }
  while (left > 0 && arr[left - 1] > min) {
    left -= 1
  }
  while (right < arr.length - 1 && arr[right + 1] < max) {
    right += 1
  }
  return right - left + 1
}
