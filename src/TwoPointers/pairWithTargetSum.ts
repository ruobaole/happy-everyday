// https://www.educative.io/courses/grokking-the-coding-interview/xog6q15W9GP
//
// 3 solutions:
//   - 1. iterate and binary search. iterate i and using binary search to look for target - arr[i]
//   - 2. typical twosum solution - use hashmap to record num - idx. Try to find target - num in hashmap
//     (only one whole loop iteration is needed)
//   - 3. since it is sorted. use two pointers starting from the start and end of the array.

export const findPairWithTargetSum = (
  arr: number[],
  targetSum: number
): number[] => {
  // Assume we only return one such pair
  let l = 0
  let r = arr.length - 1
  const res = [-1, -1]
  while (l < r) {
    const sum = arr[l] + arr[r]
    if (sum < targetSum) {
      l += 1
    } else if (sum > targetSum) {
      r -= 1
    } else {
      res[0] = l
      res[1] = r
      break
    }
  }
  return res
}
