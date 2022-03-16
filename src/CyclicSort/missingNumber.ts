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

// review practices //

// an array of length n, with its elements in range [0, n] -- one number is missing
// 1. iterate the array to put elements in its correct place -- nums[i]
//  n will not be able to be placed -- ignore n -- skip nums[i] if nums[i] === n
// 2. at last, there will be two possible cases:
//  1) if n exists, the missing number is in range [0, n-1] -- n should be sitting
//  at the missing number's spot
//  2) if n doesn't exist -- all numbers should be on its correct place -- missing n
// 3. thus, iterate the array, return the index that is missplaced; or if all
//  numbers are correctly placed -- return n
//
// Time: O(N)

export const findMissingNumber_r1 = (nums: number[]): number => {
  let i = 0
  while (i < nums.length) {
    const correctIdx = nums[i]
    if (correctIdx < nums.length && nums[correctIdx] !== nums[i]) {
      ;[nums[correctIdx], nums[i]] = [nums[i], nums[correctIdx]]
    } else {
      i += 1
    }
  }
  for (let j = 0; j < nums.length; j += 1) {
    if (nums[j] !== j) {
      return j
    }
  }
  return nums.length
}

//--- r2 ---//
//
// an array of n length contaning numbers in range [0, n]
// -- meaning that numbers have their correct place -- num;
// there're 2 cases:
// 1) one element cannot be placed in its correct place, because
//  num === n
// 2) all elements can be placed in its correct place, the missing
//  number is n
// Thus, we iterate the array and place each nums[i] in its correct place
//  if (nums[i] !== n) -- i.e. skip n
// At last, iterate the array again and check if there exists element that
//  is not in its correct place.
// If true, the place is the missing number
// else, n is the missing number
//
// Time: O(N)
// Space: O(1)

export function findMissingNumber_r2(nums: number[]): number {
  const N = nums.length
  let i = 0
  while (i < nums.length) {
    const correctIdx = nums[i]
    if (correctIdx < N && nums[correctIdx] !== nums[i]) {
      ;[nums[correctIdx], nums[i]] = [nums[i], nums[correctIdx]]
    } else {
      i += 1
    }
  }
  for (let j = 0; j < nums.length; j += 1) {
    if (nums[j] !== j) {
      return j
    }
  }
  return N
}
