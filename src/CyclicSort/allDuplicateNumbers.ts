// https://www.educative.io/courses/grokking-the-coding-interview/RLw1Pjk1GQ0
//
// 1. Use cyclic sort to place each element in its correct place.
//  for nums[i], its correct place should be in index nums[i] - 1
//  if the correct place has a number that not equals to nums[i], we should
//  swap the two
//  else, we ignore nums[i] and continue to the next index
// 2. at last, all non-duplicate numbers should be at its correct place.
//  We just need to iterate the array again and collect all those that
//  are not at their correct places. -- duplicates

export const findAllDuplicates = (nums: number[]): number[] => {
  const duplicates: number[] = []
  let i = 0
  while (i < nums.length) {
    const correctI = nums[i] - 1
    if (nums[correctI] !== nums[i]) {
      ;[nums[correctI], nums[i]] = [nums[i], nums[correctI]]
    } else {
      i += 1
    }
  }
  nums.forEach((num, idx) => {
    if (num !== idx + 1) {
      duplicates.push(num)
    }
  })
  return duplicates
}
