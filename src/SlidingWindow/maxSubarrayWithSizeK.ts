// https://www.educative.io/courses/grokking-the-coding-interview/JPKr0kqLGNP
//
// Sliding window with fixed size k
// Maintaining the sum of the current window - sum and a global maxSum
// In each step, update sum:
// sum += arr[right + 1]
// sum -= arr[left]
// update right and left
// update the maxSum
//
// Time: O(N)
// Space: O(1)

export function maxSubarrayWithSizeK(k: number, arr: number[]): number {
  if (k <= 0 || arr.length < k) {
    return 0
  }
  let sum = 0
  let right = 0
  let left = 0
  let maxSum = sum
  for (right = 0; right < arr.length; right += 1) {
    sum += arr[right]
    if (right - left + 1 > k) {
      // we should move left rightwards to maintain
      // the window size
      sum -= arr[left]
      left += 1
    }
    if (right - left + 1 === k) {
      maxSum = Math.max(maxSum, sum)
    }
  }
  return maxSum
}
