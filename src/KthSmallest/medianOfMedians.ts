// For quickSort, the crucial part is to find the ideal pivot in every partition
//  process -- if the pivot is good, then the worst case can be eliminated and the
//  time can be gauranteed to best case O(N)
// The idea pivot would be the median of the array.
// Thus, before every partition, we need to find the median of the array as the pivot.
// To find the median of the array, we use the Median of Medians algorithm. It is described as:
// 1. partitioning the array into chunks of 5 elements. Ignore chuncks with less than 5 elements
// 2. sort each chunk and find the medians of each chunk (i.e. part[2]); since each chunk
//  has fixed size -- 5, the sorting takes linear time O(1), and the sorting of all chunks
//  would be O(N)
// 3. the medians of all these chunks form a new array, recurs the process using the same
//  method until we got less than 5 elements -- return the 1st element as the asymptotic
//  median
//
// Time: gauranteed O(N) -- theoretically the best (https://en.wikipedia.org/wiki/Median_of_medians)
// Space: O(N) the call stack

export const findKthSmallest2 = (nums: number[], k: number): number => {
  return findKthSmallest2Rec(nums, k, 0, nums.length - 1)
}

function findKthSmallest2Rec(
  nums: number[],
  k: number,
  start: number,
  end: number
): number {
  const pos = partition(nums, start, end)
  if (pos === k - 1) {
    return nums[pos]
  }
  if (pos < k - 1) {
    return findKthSmallest2Rec(nums, k, pos + 1, end)
  }
  return findKthSmallest2Rec(nums, k, start, pos - 1)
}

function partition(nums: number[], start: number, end: number): number {
  const pivot = medianOfMedians(nums)
  // switch the pivot to the position of end
  for (let i = start; i < end; i += 1) {
    if (nums[i] === pivot) {
      ;[nums[i], nums[end]] = [nums[end], nums[i]]
      break
    }
  }

  let low = start
  for (let i = start; i < end; i += 1) {
    if (nums[i] < pivot) {
      // use i to detect elements
      // put elements < pivot before low
      ;[nums[i], nums[low]] = [nums[low], nums[i]]
      low += 1
    }
  }
  // low is the position of pivot, switch it to low
  ;[nums[low], nums[end]] = [nums[end], nums[low]]
  return low
}

function medianOfMedians(nums: number[]): number {
  // return the approximate median of the input array
  if (nums.length < 5) {
    return nums[0]
  }

  const parts: number[][] = []
  for (let i = 0; i < nums.length; i += 5) {
    if (i + 5 <= nums.length) {
      parts.push(nums.slice(0, i + 5))
    }
  }

  parts.forEach((part) => {
    part.sort((a, b) => a - b)
  })

  const medians: number[] = []
  parts.forEach((part) => {
    medians.push(part[2])
  })
  return medianOfMedians(medians)
}
