// https://www.educative.io/courses/grokking-the-coding-interview/Y52qNM0ljWK
//
// We can use the same strategy as cyclic sort to put each number in its correct place.
// Duplicates can exsit, but we can just ignore the duplicates.
// At last, all elements that all not equal to i + 1 is the missing numbers we
// are looking for.
//
// Time: O(N) - each elements are examined at most twice

export const findAllMissingNumbers = (nums: number[]): number[] => {
  const missingNums: number[] = []
  let idx = 0
  while (idx < nums.length) {
    const correctIdx = nums[idx] - 1
    if (nums[idx] !== nums[correctIdx]) {
      // nums[idx] is not in its correct place - if duplicates exists, nums[idx] should at
      //  its correct place
      ;[nums[idx], nums[correctIdx]] = [nums[correctIdx], nums[idx]]
    } else {
      idx += 1
    }
  }
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== i + 1) {
      missingNums.push(i + 1)
    }
  }
  return missingNums
}
