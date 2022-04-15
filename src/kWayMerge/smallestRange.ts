// https://www.educative.io/courses/grokking-the-coding-interview/JPGWDNRx3w2
//
// There is a greedy way in generating all ranges -- the same as merging k
//  lists. why? because when we form a range by selecting elements
//  from each list -- to get smaller range, we can only move the smallest
//  element rightwards to shrink its lower bound.
// The range is calculated by the smallest of the k elements and the largest.
// In fact, we don't really need to keep a maxHeap to get the largest, since the
//   arrays are sorted, the max in the k elements is also the global max so far.
// Thus, we keep a minHeap to try to 'merge' the k lists.
// At the same time, keep the max so far, calculate the range using the root of
//  the heap and the max.
// While merging, update the resulting range if we get a smaller range.
// We stop searching when the top of the minHeap is the last of its array. why?
//  because when this element cannot move (since it is the lower bound of the
//  range), there is no way the range can be any smaller.
//
// Time: the size of heap -- k; number of iterations -- at most N
//   thus, O(NlogK)
// Space: O(K)

import { Heap } from 'typescript-collections'

export const findSmallestRange = (lists: number[][]): [number, number] => {
  // [value, row, col]
  const minHeap = new Heap<[number, number, number]>((a, b) => b[0] - a[0])
  let curMax = Number.MIN_SAFE_INTEGER
  let low = 0
  let high = Number.MIN_SAFE_INTEGER
  lists.forEach((list, row) => {
    if (list[0] !== undefined) {
      minHeap.add([list[0], row, 0])
      curMax = Math.max(list[0], curMax)
    }
  })

  // stop loop when the heap's top has no more elements in its list
  while (minHeap.size() === lists.length) {
    const top = minHeap.removeRoot() as [number, number, number]
    const curRange = curMax - top[0]
    if (curRange < high - low) {
      low = top[0]
      high = curMax
    }
    const row = top[1]
    const col = top[2]
    if (col + 1 < lists[row].length) {
      minHeap.add([lists[row][col + 1], row, col + 1])
      curMax = Math.max(curMax, lists[row][col + 1])
    }
  }
  return [low, high]
}

//--- r1 ---//

// Search follow a strategy.
// We start by examining the heads of the M lists -- get the range by
//  finding the smallest among the M and the largest.
// In order to search for smaller range, we should try to 'lift' the lower
//  bound -- since the lists are sorting in ascending order and we cannot
//  'lower' the higher bound.
// Thus, we move the pointer points to the smallest element by 1 element.
// Now, the lower bound must be smaller, however the higher bound could be larger.
// We update the curMax if the moved pointer points to an element larger than the
//  current max.
// Now, we've got the 2nd range -- [curMin, curMax], if the range is smaller, update
//  the result range.
// In this process, we need a minHeap to get the min of the M elements in O(1) time
//  at every itereation. We also need to keep record of the curMax and updating it
//  at every iteration.
// We can stop the iteration if the root of the minHeap has no more element to the right of
//  it -- why?
// Because, when the element is the root of the heap -- meaning that we want to search
//  for smaller range by lifting the lower bound. However, the lower bound cannot be
//  furtherly lifted.
// Hence, it is impossible to find smaller range -- we can stop the searching process.
//
// Time: O(NlogM) -- M is the number of lists, while N is the length of the shortest list.
// Space: O(M)

export const findSmallestRange_r1 = (lists: number[][]): [number, number] => {
  // [value, row, col]
  const minHeap = new Heap<[number, number, number]>((a, b) => b[0] - a[0])
  let curMax = Number.MIN_SAFE_INTEGER
  const smallestRange = [0, Number.MAX_SAFE_INTEGER]
  lists.forEach((list, row) => {
    if (list.length > 0) {
      curMax = Math.max(curMax, list[0])
      minHeap.add([list[0], row, 0])
    }
  })
  while (minHeap.size() === lists.length) {
    const [low, row, col] = minHeap.removeRoot() as [number, number, number]
    // update the smallestRange
    const curRangeSize = curMax - low
    if (curRangeSize < smallestRange[1] - smallestRange[0]) {
      smallestRange[0] = low
      smallestRange[1] = curMax
    }
    // push in the next
    if (col + 1 < lists[row].length) {
      minHeap.add([lists[row][col + 1], row, col + 1])
      // update curMax
      curMax = Math.max(curMax, lists[row][col + 1])
    }
    // if we cannot push in the next, the minHeap's size will be
    // smaller than M -- break the loop
  }
  return smallestRange as [number, number]
}

//--- r2 ---//
//
// The problem calls us to find the smallest range. Thus, we need a way to iterate
//  all candidate ranges and find the smallest one;
// There's a greedy approach to generate these candidate ranges, since the lists are sorted
// 1. we start by getting the range from the heads -- [curMin, curMax]
// 2. in order to find smaller range, we have no choice but to 'lift' the lower bound; we cannot
//  'lower' the higher bound because the lists are sorted in ascending order;
// 3. move the pointer of curMin, we get a new number
//  update curMin and curMax -- a new range; update the smallest range so far
// 4. if the curMin at any time is the last of its list; we can stop searching. Because in this
//  way, we cannot shrink the bound any further;
// NOTE that in 3, when update curMin and curMax;
// - for curMax, we only need to compare the new number with curMax
// - for curMin, we have to find the min among the M numbers once again; in order to draw the min
//  in less time -- we use a minHeap of size M to save the heads of all time;
// We can break iterating when minHeap's size is less than M
//
// Time: O(NlogM) - N is the total element of all lists; M is the number of lists -- the size of heap
// Space: O(M)

export function findSmallestRange_r2(lists: number[][]): [number, number] {
  // [value, listIdx, colIdx]
  const minHeap = new Heap<[number, number, number]>((a, b) => b[0] - a[0])
  let curMax = Number.MIN_SAFE_INTEGER
  lists.forEach((list, listIdx) => {
    if (list.length > 0) {
      minHeap.add([list[0], listIdx, 0])
      curMax = Math.max(curMax, list[0])
    }
  })
  if (minHeap.size() === 0) {
    return [0, 0]
  }
  let minRangeSize = curMax - minHeap.peek()[0]
  const res: [number, number] = [minHeap.peek[0], curMax]
  while (minHeap.size() === lists.length) {
    const [curMin, listIdx, colIdx] = minHeap.removeRoot()
    if (curMax - curMin < minRangeSize) {
      res[0] = curMin
      res[1] = curMax
      minRangeSize = curMax - curMin
    }
    if (colIdx < lists[listIdx].length) {
      const nextNum = lists[listIdx][colIdx + 1]
      curMax = Math.max(curMax, nextNum)
      minHeap.add([nextNum, listIdx, colIdx + 1])
    }
  }
  return res
}
