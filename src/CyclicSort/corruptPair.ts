// https://www.educative.io/courses/grokking-the-coding-interview/mE2LVDE3wp0
//
// If we put each element in its correct place (nums[i] in index nums[i] - 1),
//  there will be one element that is misplaced at last.
// That number is the duplicate number, and it takes place of the missing number.
// Thus, use cyclic sort to place each element in its correct place.
// Then iterate the loop to find the one that is not in its correct place.

export const findCorruptPari = (nums: number[]): number[] => {
  const pair: number[] = []
  let i = 0
  while (i < nums.length) {
    const correctI = nums[i] - 1
    if (nums[correctI] !== nums[i]) {
      ;[nums[correctI], nums[i]] = [nums[i], nums[correctI]]
    } else {
      i += 1
    }
  }
  for (let j = 0; j < nums.length; j += 1) {
    if (nums[j] !== j + 1) {
      pair.push(nums[j])
      pair.push(j + 1)
      break
    }
  }
  return pair
}
