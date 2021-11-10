// TODO: using sumDifference memo to achieve cleaner code
// https://www.educative.io/courses/grokking-the-coding-interview/3YlQz7PE7OA
//
// Problem Setting:  If there are more than one such triplet, return the sum of the triplet
//  with the smallest sum.
// This is similar to three sum. However this time, we keep track of the current result triplet
// Everytime, compare the sum of the inspecting triplets with the sum of our current resulting triplet
//   - if the inspecting one is better than the current resulting one -> update the current resulting
//   one.
// The two points moving strategy is the same with 'findPairWithTargetSum'
//
// Time: O(N^2)

const findPairWithTargetSum = (
  arr: number[],
  s: number,
  target: number,
  result: number
): number => {
  let m = s + 1
  let l = arr.length - 1
  let newResult = result
  while (m < l) {
    const nowSum = arr[s] + arr[m] + arr[l]
    if (
      Math.abs(target - nowSum) < Math.abs(target - newResult) ||
      (Math.abs(target - nowSum) === Math.abs(target - newResult) &&
        nowSum < newResult)
    ) {
      newResult = nowSum
    }
    if (nowSum < target) {
      m += 1
    } else if (nowSum > target) {
      l -= 1
    } else {
      break
    }
  }
  return newResult
}

export const threeSumCloseTarget = (
  arr: number[],
  targetSum: number
): number => {
  // Assume that arr.length >= 3
  let result = arr[0] + arr[1] + arr[arr.length - 1]
  let s = 0
  for (s = 0; s < arr.length - 3 + 1; s += 1) {
    const newResult = findPairWithTargetSum(arr, s, targetSum, result)
    if (
      Math.abs(targetSum - newResult) < Math.abs(targetSum - result) ||
      (Math.abs(targetSum - newResult) === Math.abs(targetSum - result) &&
        newResult < result)
    ) {
      result = newResult
    }
  }
  return result
}

// review practices //

// Sort the array first, use the similar strategy as threeSum
// However this time in searching, we need to always keep record of the current best sum. And
//  each time, compare with the sum to see if we need to update it.
// if sum > targetSum || sum < targetSum:
//  calculate the differences. Update the current best sum if the difference is smaller OR
//  the difference are the same, but the sum is smaller.
// if sum === targetSum: return the sum directly
//
// Time: O(N^2) -- same as threeSum
// Space: O(N) -- remember that sorting takes O(N) space

export const threeSumCloseTarget_r1 = (
  arr: number[],
  targetSum: number
): number => {
  // Assume the arr contains at least 3 elements
  arr.sort()
  let bestSum = arr[0] + arr[1] + arr[2]
  let low = 0
  let mid = 0
  let high = 0
  for (low = 0; low < arr.length - 2; low += 1) {
    // skip duplicates - no need to examine duplicate triplets
    if (low - 1 > 0 && arr[low] === arr[low - 1]) {
      continue
    }
    mid = low + 1
    high = arr.length - 1
    while (mid < high) {
      while (mid - 1 > low && arr[mid] === arr[mid - 1]) {
        mid += 1
      }
      while (high + 1 < arr.length && arr[high] === arr[high + 1]) {
        high -= 1
      }
      if (mid < high) {
        const sum = arr[low] + arr[mid] + arr[high]
        if (sum === targetSum) {
          bestSum = sum
          break
        }
        if (sum < targetSum) {
          mid += 1
        } else {
          high -= 1
        }
        // update bestSum
        const diff = Math.abs(sum - targetSum)
        const bestDiff = Math.abs(bestSum - targetSum)
        if (diff < bestDiff || (diff === bestDiff && sum < bestSum)) {
          bestSum = sum
        }
      }
    }
    if (bestSum === targetSum) {
      break
    }
  }
  return bestSum
}
