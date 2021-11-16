// https://www.educative.io/courses/grokking-the-coding-interview/JPnp17NYXE9
//
// This is similar to cyclic sort. But with one major difference:
// the elements within the array are within the range 0 to n instead of 1 to n
//  hence：every number in correct place is nums[i] === nums[nums[i]] instead of nums[nums[i]] - 1
//  n can exist in the array, since our array's length is n, we cannot put it on index n
//  we can just ignore n if we encounter it --
// At last, two cases are possible:
//  1) numbers are 0 to n-1, n is missing -- all numbers are at its correct place -- return n
//  2) a number within 0 to n-1 is missing -- one place hold a number n which is not its
//   correct place, return that index
//
// Time: O(N) - each number is examined at most twice -- one to put it in its correct place,
//  another to check if it is on the correct place

export const findMissingNumber = (nums: number[]): number => {
  let idx = 0
  while (idx < nums.length) {
    const num = nums[idx]
    if (num !== nums.length && nums[idx] !== nums[num]) {
      ;[nums[idx], nums[num]] = [nums[num], nums[idx]]
    } else {
      idx += 1
    }
  }
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== i) {
      return i
    }
  }
  return nums.length
}
