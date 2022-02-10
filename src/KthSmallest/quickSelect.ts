// https://www.educative.io/courses/grokking-the-coding-interview/myJK6Wvj00R
//
// Quick Select Solution
// 1. pick one element in the current array as pivot
// 2. partitioning the array to put the pivot in its correct place
// 3. if the place === k - 1 -> the pivot is the k-th smallest
//   else, if the place is to the right of k-1, we should furtherly search
//   the left part by having the array as [low, pivotIdx - 1]
//   if the place is to the left of k-1, continue search the right part
// The partitioning algorithm is as follows
// low, i, high -- we use i to detect elements, at any time
// [low0, low-1] -- elements < pivot
// [low, i-1] -- elements >= pivot
// [i, high] -- elements to be detected
// thus, just iterate i from low to high - 1
// NOTE
// worst case occurs when we partition the array into 2 parts with length
// N-1 and 1 each time
// this only happens when the array is sorted or all elements are the same
// hence, to pick a random pivot is crucial to avoid such bad scenario
// while partitioning, we can pick a random idx from [low, high] as the pivot
//  and switch it to the position of high and continue the above paritioning
//  process
//
// Time: partitioning -- worst case O(N^2)
//  best case -- because we're eliminating parts of the array each time, the
//  best case is O(N)
// Space: worst case is O(N) for the call stack

export const findKthSmallest1 = (nums: number[], k: number): number => {
  return findKthSmallestRec(nums, k, 0, nums.length - 1)
}

const findKthSmallestRec = (
  nums: number[],
  k: number,
  start: number,
  end: number
): number => {
  // pick random pivot from the array
  // and switch it to end
  const randomIdx = Math.floor(Math.random() * (end - start + 1)) + start
  const pivot = nums[randomIdx]
  ;[nums[randomIdx], nums[end]] = [nums[end], nums[randomIdx]]

  const pos = partitionPivot(nums, start, end)
  if (pos === k - 1) {
    return pivot
  }
  if (pos < k - 1) {
    return findKthSmallestRec(nums, k, pos + 1, end)
  }
  return findKthSmallestRec(nums, k, start, pos - 1)
}

const partitionPivot = (nums: number[], start: number, end: number): number => {
  // end is the pivot
  const pivot = nums[end]
  let low = start
  for (let i = start; i < end; i += 1) {
    if (nums[i] < pivot) {
      ;[nums[i], nums[low]] = [nums[low], nums[i]]
      low += 1
    }
  }
  ;[nums[low], nums[end]] = [nums[end], nums[low]]
  return low
}
