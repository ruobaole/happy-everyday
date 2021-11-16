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
