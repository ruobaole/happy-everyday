// https://leetcode.com/problems/two-sum/
//
// - Assumes that there's exactly ONE solution and you cannot use one element
// twice.
// - Try to solve this in less than O(N^2)'s time.
// - Use extra space -- hashmap to memorize (target - elem) and its idx
// - In the next iteration, find target in the hashmap
// Time: O(N)
// Space: O(N)

export function twoSum(nums: number[], target: number): number[] {
  const otherHalfDict: Record<number, number> = {}
  const result: [number, number] = [-1, -1]
  nums.forEach((num, idx) => {
    const otherHalf = target - num
    if (otherHalfDict[otherHalf] === undefined) {
      otherHalfDict[otherHalf] = idx
    } else if (otherHalfDict[otherHalf] === num) {
      result[0] = otherHalfDict[otherHalf]
      result[1] = idx
    }
  })
  if (result[0] >= 0 && result[1] >= 0) {
    return result
  }
  nums.forEach((num, idx) => {
    if (otherHalfDict[num] !== undefined) {
      result[0] = Math.min(idx, otherHalfDict[num])
      result[1] = Math.max(idx, otherHalfDict[num])
    }
  })
  return result
}
