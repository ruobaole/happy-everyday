// https://www.educative.io/courses/grokking-the-coding-interview/B8qXVqVwDKY
//
// We should make use of the fact that all n numbers are within the range 1 to n;
// Thus, we just need to put every number in its correct place (i.e.
//  2 at index 1, k at index k-1)
// 1. from index0 of the array, swap nums[0] to its correct place,
//  now, index0 should have a new number
// 2. continue to swap the new number to its correct place until
//  index0 === 1
// 3. now increment index, until in all indices, the number is at
//  its correct place
//
// Time: O(N)
//  when a number has been put on its correct place, we only at most check it once
//  thus a number is examined twice

export const cyclicSort = (nums: number[]): number[] => {
  let idx = 0
  while (idx < nums.length) {
    const num = nums[idx]
    if (num === idx + 1) {
      idx += 1
      continue
    }
    ;[nums[idx], nums[num - 1]] = [nums[num - 1], nums[idx]]
  }
  return nums
}

// review practices //

// an array of n length containing numbers within range [1, n] --
// meaning that each element should have its correct place - nums[i] - 1
// we iterate the array, check the element's correct place --
// nums[i] - 1, if the correct place is placed with the correct content i.e nums[i]
// then we skip to the next nums[i + 1]
// else, swap nums[i] to its correct place, and continue to examine nums[i]
//
// Time: O(N) - each element is examined at most twice -- 1) to check if its in the correct place
//  2) swap it to its correct place

export const cyclicSort_r1 = (nums: number[]): number[] => {
  let i = 0
  while (i < nums.length) {
    const correctIdx = nums[i] - 1
    if (nums[correctIdx] !== nums[i]) {
      ;[nums[correctIdx], nums[i]] = [nums[i], nums[correctIdx]]
    } else {
      i += 1
    }
  }
  return nums
}

//--- r2 ---//
//
// n numbers within range [1, n]
// -- meaning that each number should have its correct place -- num - 1
//  and all numbers have its correct place;
// Iterate the array, for every number, examine its correct place, see if
//  it is placed with the correct element
// If not, swap the number with the number in its correct place, continue examine
//  the number in the current place;
// If yes, continue to the next number;
//
// Time: O(N) -- each element is examined at most twice -- one when we iterate to the
//  number; one when the number is in some other number's correct place and we have to
//  swap;
// Space: O(1)

export function cyclicSort_r2(nums: number[]): void {
  let i = 0
  while (i < nums.length) {
    const num = nums[i]
    const correctIdx = num - 1
    if (nums[correctIdx] === num) {
      i += 1
    } else {
      ;[nums[correctIdx], nums[i]] = [nums[i], nums[correctIdx]]
    }
  }
}
