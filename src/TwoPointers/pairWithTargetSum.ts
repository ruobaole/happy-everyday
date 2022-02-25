// https://www.educative.io/courses/grokking-the-coding-interview/xog6q15W9GP
//
// 3 solutions:
//   - 1. iterate and binary search. iterate i and using binary search to look for target - arr[i]
//   - 2. typical twosum solution - use hashmap to record num - idx. Try to find target - num in hashmap
//     (only one whole loop iteration is needed)
//   - 3. since it is sorted. use two pointers starting from the start and end of the array.

// export const findPairWithTargetSum = (
//   arr: number[],
//   targetSum: number
// ): number[] => {
//   // Assume we only return one such pair
//   let l = 0
//   let r = arr.length - 1
//   const res = [-1, -1]
//   while (l < r) {
//     const sum = arr[l] + arr[r]
//     if (sum < targetSum) {
//       l += 1
//     } else if (sum > targetSum) {
//       r -= 1
//     } else {
//       res[0] = l
//       res[1] = r
//       break
//     }
//   }
//   return res
// }

// review practices //

// Since the array is already sorted, we search for the pair by using 2 pointers starting from
//   both ends fo the array.
// 1. if sum < targetSum: right -= 1
//   if sum > targetSum: left += 1
// 2. breaking condition: we need to find pairs -> thus, search in range so that
//   right > left

export const findPairWithTargetSum = (
  arr: number[],
  targetSum: number
): number[] => {
  const res = new Array(2).fill(-1)
  let high = arr.length - 1
  let low = 0
  while (low < high) {
    const sum = arr[low] + arr[high]
    if (sum === targetSum) {
      res[0] = low
      res[1] = high
      break
    }
    if (sum < targetSum) {
      low += 1
    } else if (sum > targetSum) {
      high -= 1
    }
  }
  return res
}

//--- r2 ---//

// Since the given array is sorted, we could use 2 pointers comming from the start
//  and end of the array to find the pair

export function findPairWithTargetSum_r2(
  arr: number[],
  targetSum: number
): number[] {
  const result = [-1, -1]
  let low = 0
  let high = arr.length - 1
  while (low < high) {
    const sum = arr[low] + arr[high]
    if (sum === targetSum) {
      result[0] = low
      result[1] = high
      break
    }
    if (sum < targetSum) {
      low += 1
    } else {
      high -= 1
    }
  }
  return result
}
