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

// review practices //

// It is possible that elements in the array are >= n, or <= 0
//  if 1 is not exists in the array, the smallest positive missing number
//  should be 1.
// Since we're to find the smallest positive missing number, when arrange elements
// in its correct place, we can ignore those that are <= 1 and out of bound.
// i.e. put elements in nums[i] - 1
// In that way, at last, elements that are within the range [1, n] should be in their
//  correct places, while other elements take the rest place.
// We iterate from index = 0, the first index that is miss placed should be the smallest
//  positive missing number
//
// Time: O(N)

export const findFirstMissingPositiveNumber_r1 = (nums: number[]): number => {
  let i = 0
  while (i < nums.length) {
    const correctIdx = nums[i] - 1
    if (nums[i] > 0 && nums[i] <= nums.length && nums[correctIdx] !== nums[i]) {
      ;[nums[correctIdx], nums[i]] = [nums[i], nums[correctIdx]]
    } else {
      i += 1
    }
  }
  for (let j = 0; j < nums.length; j += 1) {
    if (nums[j] !== j + 1) {
      return j + 1
    }
  }
  return nums.length + 1
}
