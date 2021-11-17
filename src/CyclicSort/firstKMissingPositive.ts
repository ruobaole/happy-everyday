// https://www.educative.io/courses/grokking-the-coding-interview/q2LA7G0ANX0
//
// Missing numbers are made up of several parts:
//   1) say the minimum positive number in the array is min. the first part is
//   numbers within the range [1, min-1]
//   2) numbers within the range [min+1. min+len-1] --> by cyclic sorting and place
//   elements on nums[i] - min; collect (i + min)
//   3) since we do not know if len is larger than k or what... we don't know if the
//   above two parts have already added up to k missing numbers. we need to continue
//   if the missing numbers are not enough.
//   Now, collect numbers within the range [min+len+1, min + 2len -1] -- cyclic sort
//   to place numbers in nums[i] - (min+len); collect (i + min+len)
//  4) repeat the above until we've collect k missing numbers
//
// Time: O(NK) -- each cyclic sort takes O(N); the number of the sorts is bounded by k
// Space: no extra space needed
//
// Solution 2. -- Time O(N) with extra space O(N) is needed
// we need a hashset to remember all the numbers on the missing number indices, and see
//  if it exists when we are pushing further missing numbers.
// 1. cyclic sort to put each numbers in its correct place -- nums[i] - 1, ignore those
//  that is out of bound (i.e. nums[i] <= 0 || nums[i] > len)
// 2. iterate to find numbers that are not in its correct place; (i+1) is the missing number;
//  apart from pusing missing numbers in missingNumbers, we also record nums[i] in the set
// 3. now if missingNumbers.length < k, there're still missing numbers that is larger than len;
//  now we start counting from len+1, len+2, len+3, ...
//  if the number is not in the set, meaning it is a missing number, push it to the missingNumbers
//  until we've got k.

export const firstKMissingPositiveNumber = (
  nums: number[],
  k: number
): number[] => {
  const missingNumbers: number[] = []
  const n = nums.length
  let i = 0
  while (i < n) {
    const correctI = nums[i] - 1
    if (nums[i] > 0 && nums[i] <= n && nums[correctI] !== nums[i]) {
      ;[nums[correctI], nums[i]] = [nums[i], nums[correctI]]
    } else {
      i += 1
    }
  }

  const set = new Set<number>()
  for (let j = 0; j < n; j += 1) {
    if (nums[j] !== j + 1) {
      if (missingNumbers.length < k) {
        missingNumbers.push(j + 1)
        set.add(nums[j])
      }
    }
  }

  let idx = 1
  while (missingNumbers.length < k) {
    if (!set.has(n + idx)) {
      missingNumbers.push(n + idx)
    }
    idx += 1
  }
  return missingNumbers
}
