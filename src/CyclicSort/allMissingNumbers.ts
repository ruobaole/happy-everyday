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

// review practices //

// array length n, with all its elements in range [1, n]
// hence we can put elements in its correct index nums[i] - 1
// if the number's correct place has already been occupied by the correct element
//  -- ignore nums[i]
// in that way, at last, all numbers should be sitting on its correct site while
// duplicates occupied all the rest places
// iterate the array again and collect all indices that are not sitted with correct
// elements
//
// Time: O(N)

export const findAllMissingNumbers_r1 = (nums: number[]): number[] => {
  const missing: number[] = []
  let i = 0
  while (i < nums.length) {
    const correctIdx = nums[i] - 1
    if (nums[correctIdx] !== nums[i]) {
      ;[nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]]
    } else {
      i += 1
    }
  }
  nums.forEach((num, idx) => {
    if (num - 1 !== idx) {
      missing.push(idx + 1)
    }
  })
  return missing
}
