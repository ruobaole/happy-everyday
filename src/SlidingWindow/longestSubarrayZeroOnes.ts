// https://www.educative.io/courses/grokking-the-coding-interview/B6VypRxPolJ
//
// Keep track of the number of 0s within the subarray [l, r]
// The subarray is valid when numZero <= k
// 1. move right rightwards 1 step each time
//    numZero += 1 everytime we encounter a zero
//    check if the subarray is valid -- numZero <= k,
//    if not, start to shrink
// 2. move left rightwards
//    numZero -= 1 everytime we encounter a zero
//    until numZero <= k, i.e. the subarray is once again valid
// 3. update maxLen when the subarray is valid

export const longestSubarrayZeroOnes = (arr: number[], k: number): number => {
  // Assume the array contains only 0s and 1s
  let numZero = 0
  let l = 0
  let r = 0
  let maxLen = 0
  for (r = 0; r < arr.length; r += 1) {
    if (arr[r] === 0) {
      numZero += 1
    }
    while (numZero > k) {
      // invalid subarray, try to shrink
      if (arr[l] === 0) {
        numZero -= 1
      }
      l += 1
    }
    maxLen = Math.max(maxLen, r - l + 1)
  }
  return maxLen
}
