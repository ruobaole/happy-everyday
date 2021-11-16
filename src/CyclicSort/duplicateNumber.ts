// https://www.educative.io/courses/grokking-the-coding-interview/3wEkKy6Pr9A
//
// Note that the n+1 numbers are taken from range 1 to n. But no guarantee that all 1 to n
//  number occurs.
// Similar strategy as cyclic sort. But this time, to avoid iterating the loop again after sorting
//  we can directly out put the duplicates while sorting.
// 1. iterate each element, see if it is in its correct place.
// 2. if not, we should try to swap it to its correct place. If its place already have a number
//   that is equal to the current number -- it is a duplicate.
// 3. if what's in that place does not equal to the current number, swap it to its correct place
//   and continue the cyclic sort.
//
// Time: O(N) - each element is examined at most twice

export const findDuplicates = (nums: number[]): number => {
  let i = 0
  while (i < nums.length) {
    if (nums[i] !== i + 1) {
      // nums[i] is not in its correct place
      const correctI = nums[i] - 1
      if (nums[correctI] === nums[i]) {
        return nums[i]
      } else {
        ;[nums[correctI], nums[i]] = [nums[i], nums[correctI]]
      }
    } else {
      i += 1
    }
  }
  return -1
}

// Follow up: Solve the problem without modifying the input array
// Since the array length is n+1, and the max of the elements in the array is n,
//  we can follow the elements in the array to go to nums[nums[i]].
// If no duplicates occur -- all elements are different -- we will always get to
//  different places hence no loop exists in the array
// Otherwise, more than one elements will take us to the same number (duplicate),
//  and from those numbers, we should go to the same number -- a loop must
//  exisits -- and the duplicate number is the starting point of the loop.
// The problem becomes to find the starting point of the cycle in the array, when
//  walking follow the content of the array as next indices.
// -- Slow/fast pointer.
// say: intersect0 = array start, intersect1 = slow/fast meeting place
// the distance from intersect0 to cycleStart === distance from cycleStart to intersect1
//
// Time: O(N)
export const findDuplicates_followUp = (nums: number[]): number => {
  let slow = 0
  let fast = 0
  let intersect1 = -1
  while (intersect1 === -1) {
    slow = nums[slow]
    fast = nums[nums[fast]]
    if (slow === fast) {
      intersect1 = slow
    }
  }
  let p1 = 0
  let p2 = intersect1
  while (p1 !== p2) {
    p1 = nums[p1]
    p2 = nums[p2]
  }
  return nums[p1]
}
