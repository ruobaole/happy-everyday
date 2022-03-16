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

// review practices //

// an array of length n+1, with its elements in range [1, n]
// all numbers can sit on its correct place - nums[i]
// There're 2 possible cases:
// 1) all elements in its correct place -- the duplicate number takes all the
//  rest places -- nums[0] must be the duplicate number
//  in that case, if we start from index = 0 and go to nums[index] each time, we
//  should endup by looping at the index that is the duplicate number
// 2) elements are not in its correct place -- duplicates take some of the their
//  place
//  in that case, from the duplicates, we will go to the numbers that should be in
//  those places; from their, we'll reach to the duplicates again -- loop
//  and no matter where we start, the starting point of the loop is the duplicate
// To summarize, if duplicates occurs, we must be entering a loop whenever we reached
//  a duplicate number
// Hence, we can solve the problem without cyclic sort but using strategy as slow/fast
//  to find the starting point of the loop.
//
// Time: O(N)

export const findDuplicates_r1 = (nums: number[]): number => {
  let slow = 0
  let fast = 0
  let intersect1 = -1
  while (intersect1 === -1) {
    slow = nums[nums[slow]]
    fast = nums[nums[nums[fast]]]
    if (slow === fast) {
      intersect1 = slow
    }
  }
  // the distance from 0 to the starting point ===
  // the distance from intersect1 to the starting point
  let p1 = 0
  let p2 = intersect1
  while (p1 !== p2) {
    p1 = nums[nums[p1]]
    p2 = nums[nums[p2]]
  }
  return nums[p1]
}

//--- r2 ---//
//
// In short, the solution with no modification to the array is --
// From the 0 index of the array, go to place nums[0], and furtherly go
//  to the index nums[i]; we should end up in a loop, the starting point
//  of the loop should be sitted with the duplicate number;
// Thus, we can use slow/fast pointers inited at 0 to find the staring point
//  of the loop;
// How to prove this?
// Imagine we're trapped within a loop that is NOT started with the duplciate number
// There're 2 possible scenarios --
// 1) from somewhere, we arrived at a number that is correctly placed, then we ended up
//  in this place;
//  however in that case, the number must be the duplicate one
// 2) all the numbers are missplaced, we ended up in a loop where the numbers takes each other's
//  place;
//  but if the loops closed within itself, how can we get to this loop?
//  only through a duplicate number -- we enter the loop from the duplicate number
// Thus, the starting point of the loop must be the duplicate number
//
// Time: O(N)

export function findDuplicates_r2(nums: number[]): number {
  let slow = 0
  let fast = 0
  let intersect0 = -1
  while (intersect0 === -1) {
    slow = nums[nums[slow]]
    fast = nums[nums[nums[fast]]]
    if (slow === fast) {
      intersect0 = slow
    }
  }
  // the distance from 0 to starting point ===
  // the distance from intersect0 to starting point
  let p1 = 0
  let p2 = intersect0
  while (p1 !== p2) {
    p1 = nums[nums[p1]]
    p2 = nums[nums[p2]]
  }
  return nums[p1]
}
