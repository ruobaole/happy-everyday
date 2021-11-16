// https://www.educative.io/courses/grokking-the-coding-interview/3jEXWgB5ZmM
//
// The array of n length could have numbers of any abitrary ranges. e.g. [0, n], [1, n]
//  [1, n-1], [k, n+k], ...
// Since the problem wants us to find the smallest positive number missing, each number's
//  correct place should be n - k, (k is the smallest positive number in the array)
// Ex. [1001, 1002, 1003, 1005] -- the smallest missing number should be 1004
// (here I have differnt understanding with the solution, the solution outputs 1 for this
//  example)
// 1. find the smallest positive number in the array -- k
// 2. use cyclic sort to place all numbers >= k in its correct place -- (n - k)
// 3. after that, iterate the array and find the first number that is out of place.
//   its index should be the result number
//
// Time: O(N)

export const findFirstMissingPositiveNumber = (nums: number[]): number => {
  let k = Infinity
  nums.forEach((n) => {
    if (n > 0) {
      k = Math.min(k, n)
    }
  })
  if (k === Infinity) {
    // no numbers in the array is positive
    return 1
  }
  let i = 0
  while (i < nums.length) {
    const correctIdx = nums[i] - k
    if (correctIdx >= 0 && nums[correctIdx] !== nums[i]) {
      ;[nums[correctIdx], nums[i]] = [nums[i], nums[correctIdx]]
    } else {
      i += 1
    }
  }
  for (let j = 0; j < nums.length; j += 1) {
    if (nums[j] !== j + k) {
      return j + k
    }
  }
  return -1
}
