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
