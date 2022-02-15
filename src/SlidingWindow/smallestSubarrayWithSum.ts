// https://www.educative.io/courses/grokking-the-coding-interview/7XMlMEQPnnQ
//
// Sliding window with unfixed window size
// 1. move right one step each time
// if sum > s, try searching for possitive smaller valid windows ending at right
// by moving left
// 2. move left while sum >= s
// update sum and the minLen each time
// stop moving until sum < s
// continue moving right
//
// Time: O(N)
// Space: O(1)

export function smallestSubarrayWithSum(s: number, arr: number[]): number {
  // Assume that arr contains only positive number
  let sum = 0
  let minLen = Infinity
  let left = 0
  for (let right = 0; right < arr.length; right += 1) {
    sum += arr[right]
    while (sum >= s) {
      // try shrink the window
      minLen = Math.min(right - left + 1, minLen)
      sum -= arr[left]
      left += 1
    }
  }
  return minLen
}
