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
