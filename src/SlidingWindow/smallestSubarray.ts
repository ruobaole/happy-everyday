// Smallest Subarray with a given sum (easy)
// https://www.educative.io/courses/grokking-the-coding-interview/7XMlMEQPnnQ
//
// Given an array of positive numbers and a positive number ‘S,’ find the length
// of the smallest contiguous subarray whose sum is greater than or equal to ‘S’.
// Return 0 if no such subarray exists.
//
// Ex.1
// Input: [2, 1, 4, 2, 3, 2], S = 7
// Ouput: 2
// Explanation: The smallest subarray with a sum greater than or equal to '7' is [5, 2].
//
// Ex.2
// Input: [2, 1, 5, 2, 8], S=7
// Output: 1
// Explanation: The smallest subarray with a sum greater than or equal to '7' is [8].

// 1. From the beginning of the array, sum window [0, i] till that the sum is no smaller
//   than s -- the window starting from 0 could be no smaller than this. However, windows
//   ending at i could be smaller.
// 2. try to shrink the window by moving the left bound, until sum[l, i] is smaller than s
//   -- i - l + 1 is a candidate
// 3. continue moving the window rightwards step by step. in each step, do 1) first and then 2).
//
// Time: O(N) - each element is inspected only twice, one by pointer l, one by point r

export const smallestSubarrayWithGivenSum = (
  arr: number[],
  s: number
): number => {
  let l = 0
  let r = 0
  let sum = 0
  let minLen = Infinity
  while (r < arr.length) {
    while (r < arr.length && sum < s) {
      sum += arr[r]
      r += 1
    }
    while (sum >= s) {
      sum -= arr[l]
      l += 1
    }
    minLen = Math.min(minLen, r - l + 1)
  }
  return minLen === Infinity ? 0 : minLen
}
