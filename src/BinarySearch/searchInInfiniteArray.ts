// https://www.educative.io/courses/grokking-the-coding-interview/B1ZW38kXJB2
//
// The process can be divided into two parts
// 1. find the bound of the subarray so that endNum === MAX_SAFE_INTEGER or
//   endNum > key (can be reduced to endNum > key) && startNum < key
// 2. use binary search to search the key within the range
// In the first step, the efficient way to find the bound is to double its
//   size in each iteration -- why? assume the array has N elements, by doubling
//   the bound size, the steps takes to reach N is O(logN) -- efficient
// - start by start = 0, end = 0, each time check if endNum < key, if true
//   enlarge the bound size by end = ((end - start) + 1) * 2, start = end0 + 1
// - Once the bound is found, start binary search
//
// Time: O(logN) - the 1st step to find the bound takes O(logN), the binary search
//  part takes O(logN)
// Space: O(1)

class ArrayReader {
  private arr: number[]
  constructor(arr: number[]) {
    this.arr = arr
  }

  get(index: number) {
    if (index >= this.arr.length) return Number.MAX_SAFE_INTEGER
    return this.arr[index]
  }
}

export const searchInInfiniteArray = (
  reader: ArrayReader,
  key: number
): number => {
  // 1. find the bound
  let start = 0
  let end = 0
  while (reader.get(end) < key) {
    const size = end - start + 1
    start = end + 1
    end = start + size - 1
  }
  // NOW: endNum does not exist OR endNum > key
  // 2. binary search
  let mid = start
  let keyIdx = -1
  while (start <= end) {
    mid = Math.floor(start - (start - end) / 2)
    if (reader.get(mid) > key) {
      end = mid - 1
    } else if (reader.get(mid) < key) {
      start = mid + 1
    } else {
      keyIdx = mid
      break
    }
  }
  return keyIdx
}

//--- r1 ---//

// 1. find the bound of the key
// 2. binary search for the key within the bound
// In finding the bound of the key, we should double the boundSize
//   by twice in each iteration -- the searching time could be within O(logN)
// - start by start = 0, end = 0 (size is 1)
// - if the key is out of the bound, update
//  start = end + 1, end = start + size0 * 2 - 1
// - if end is out of the bound of the array, reader.get(end) returns the MAX_SAFE_INTEGER
//  hence, we can safely compares the start and end number to see if key is within the range
//
// Time: the searching for bound part also takes O(logN) N being the potential size of the array
//  -- because it takes a maximum of logN iterations to grow to the size of N
//  hence, overall O(logN)
// Space: O(1)

export const searchInInfiniteArray_r1 = (
  reader: ArrayReader,
  key: number
): number => {
  let start = 0
  let end = 0
  // 1. find the bound
  while (key > reader.get(end)) {
    const size0 = end - start + 1
    start = end + 1
    end = start + size0 * 2 - 1
  }
  // 2. search within [start, end] bound
  let mid = start
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (reader.get(mid) === key) {
      return mid
    }
    if (reader.get(mid) < key) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return -1
}
