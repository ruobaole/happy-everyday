// https://www.educative.io/courses/grokking-the-coding-interview/3jY0GKpPDxr
//
// The array could contain multiple loops. Since we don't know which elements are within the valid
//   loop. We should try each element as the starting point and use slow/fast pointers to see if the
//   loop is valid.
// 1. iterate each element as a starting point
// 2. for each starting point. Use slow/fast to find loop.
//   2.1 Save the first element's direction, if the direction changes -- invalid
//   2.2 if in the loop, next element is the exact same as the current elemetn -- invalid
// NOTE: if we have visited an element and failed to produce a valid loop -- next time when we encounter
// that element, we know directly that a valid loop will not be found.
// We can memorize all elements we have visited so far (using an array. mark with the starting idx of the
//   current iteration). and break loop when we meet them again.
// Thus the time complexity can be reduced to O(N) because each element is inspeced only once.
// However it takes an O(N) extra space.

export const circularArrayLoop = (arr: number[]): boolean => {
  // Assume - arr contains only non-zero integers
  // mark with the starting point of the current iteration
  const visited = new Array(arr.length).fill(-1)
  const getNextIdx = (idx: number): number => {
    const wrappedIdx = (arr[idx] + idx) % arr.length
    return wrappedIdx >= 0 ? wrappedIdx : arr.length + wrappedIdx
  }
  const findValidLoop = (start: number): boolean => {
    let slow = start
    let fast = start
    const direction = arr[start]
    let intersected = false
    while (!intersected) {
      if (visited[slow] >= 0 && visited[slow] !== start) {
        // visited in previous iteration
        return false
      }
      const slowNext = getNextIdx(slow)
      if (arr[slowNext] * direction < 0) {
        // direction changed
        return false
      }
      if (slowNext === slow) {
        // the loop contains only one element
        return false
      }
      slow = slowNext
      fast = getNextIdx(getNextIdx(fast))
      if (slow === fast) {
        intersected = true
        break
      }
      visited[slow] = start
    }
    return intersected
  }
  for (let i = 0; i < arr.length; i += 1) {
    if (findValidLoop(i)) {
      return true
    }
  }
  return false
}

// review practices //

// For all the elements in the array, there can be elements within a valid loop; elements
//  within an invalid loop; and elements that are not in a loop (but should lead to a loop)
// Thus, we cannot be sure to start from index 0 and say we must get to a valid loop (we could
//  get to invalid loop).
// We can start from each element of the array, slow/fast to see if it leads us to a valid loop.
// This takes unnecessary time because, once we've proved that an element leads to an invalid loop,
//  next time we encounter this element, there is no need to traverse again.
// Thus, we use an array (inited to -1) to mark the starting point of the 'journey' we've already
//  been to that could take us to that index.
// Stop iterating if we reached a visited journey, or find a valid loop.
//
// Time: O(N) - each element is visited only once; Space: O(N)

export const circularArrayLoop_r1 = (arr: number[]): boolean => {
  let res = false
  const memo = new Array(arr.length).fill(-1)

  const getNext = (cur: number): number => {
    const wrappedStep = (cur + arr[cur]) % arr.length
    return wrappedStep >= 0 ? wrappedStep : arr.length + wrappedStep
  }

  const checkLoop = (start: number): boolean => {
    let valid = false
    let slow = start
    let fast = start
    let met = false
    while (!met) {
      if (memo[slow] !== -1 && memo[slow] !== start) {
        valid = false
        break
      }
      memo[slow] = start
      if (slow === getNext(slow)) {
        // cycle length is 1
        valid = false
        break
      }
      slow = getNext(slow)
      fast = getNext(getNext(fast))
      if (slow === fast) {
        met = true
      }
    }
    if (met) {
      // check direction
      const direction = arr[slow]
      let i = slow
      let metAgain = false
      while (!metAgain) {
        if (arr[i] * direction < 0) {
          valid = false
          break
        }
        i = getNext(i)
        if (i === slow) {
          metAgain = true
          valid = true
        }
      }
    }
    return valid
  }

  for (let i = 0; i < arr.length; i += 1) {
    if (checkLoop(i)) {
      res = true
      break
    }
  }
  return res
}

//--- r2 ---//
//
// Elements in the array can be divided into 3 groups --
//  1) elements in a valid loop; 2) elements in a invalid loop;
//  3) elements not in a loop but will lead us to a loop
// Thus, we can not be sure to start from index 0 and see if that
//  leads us to a valid loop; Instead, we have to check every indices
//  as the beginning;
// Note that, when checking, if we arrived at a place where we've checked
//  before and knew it belongs to an invalid loop -- we do not need to continue
//  checking;
// Thus, we use a memoized array inited with -1 to mark the starting index
//  of the loop that led us to the index; If while checking and we find that
//  memo[slow] !== -1 && memo[slow] !== start -- we should break looping
// How to check if the loop is valid?
//  we need to check 3 things:
//  1) slow and fast met -- this must happen
//  2) the direction does not change in the loop -- by checking the signs of the
//  elements
//  3) the length of the loop > 1 -- getNext(slow) !== slow
//
// Time: each element is visited no more than twice -- O(N)
// Space: O(N)

export function circularArrayLoop_r2(arr: number[]): boolean {
  // Assume that the array contains no zeros
  let res = false
  const memo = new Array(arr.length).fill(-1)

  function getNext(idx: number): number {
    const wrappedNext = (idx + arr[idx]) % arr.length
    return wrappedNext >= 0 ? wrappedNext : arr.length + wrappedNext
  }

  function isValidLoop(start: number): boolean {
    let slow = start
    let fast = start
    let met = false
    let isValid = true
    while (!met) {
      if (memo[slow] !== -1 && memo[slow] !== start) {
        isValid = false
        break
      }
      memo[slow] = start
      if (slow === getNext(slow)) {
        // the length of the loop is 1
        isValid = false
        break
      }
      slow = getNext(slow)
      fast = getNext(getNext(fast))
      if (slow === fast) {
        met = true
      }
      if (met) {
        // check the direction of the loop
        let i = slow
        const direction = arr[slow]
        let metAgain = false
        while (!metAgain) {
          i = getNext(i)
          if (arr[i] * direction < 0) {
            isValid = false
            break
          }
          if (i === slow) {
            metAgain = true
          }
        }
      }
    }
    return isValid
  }

  for (let i = 0; i < arr.length; i += 1) {
    if (isValidLoop(i)) {
      res = true
      break
    }
  }
  return res
}
