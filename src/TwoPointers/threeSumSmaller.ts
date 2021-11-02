// https://www.educative.io/courses/grokking-the-coding-interview/mElknO5OKBO
//
// This is similar to threeSum. Instead of finding sum === target, we find sum < target.
// Thus, the searching strategy is a little bit difference.
//   if sum >= target, right -= 1 move leftwards to get smaller pairs
//   else, find a pair.
//   when we find a pair, we know that with the m fixed, all [left+1, right] should be valid right bounds
//   -> thus we can directly count += (right - left)
//   -> then we can search within larger pairs the valid ones -> left += 1
//
// Time: O(N^2)

export const tripletsWithSmallerSum = (
  arr: number[],
  target: number
): number => {
  arr.sort()
  let count = 0
  let s = 0
  let m = 0
  let l = 0
  for (s = 0; s < arr.length - 2; s += 1) {
    m = s + 1
    l = arr.length - 1
    while (m < l) {
      const sum = arr[s] + arr[m] + arr[l]
      if (sum >= target) {
        l -= 1
      } else {
        count += l - m
        m += 1
      }
    }
  }
  return count
}

// Follow up - Return all triplets instead of count
// When we find a pair, we cannot directly left += 1 to go on find pairs with left changed.
// Instead, we have to iterate right through [left + 1, right] to push all triplets.
// TRICKY: that makes the time complexity changed
//
// Time: worst case O(N^3), best case O(N^2)
//   worst case is when all pairs are valid, we have to actually permulate all pairs which is
//   N! - O(N^2) time
//   best case is when all pairs are invalid, then left + right moves N times in total.

const pushAllTriplets = (
  s0: number,
  m0: number,
  l0: number,
  result: number[][]
): void => {
  for (let l = l0; (l -= 1); l > m0) {
    result.push([s0, m0, l])
  }
}

export const tripletsWithSmallerSum2 = (
  arr: number[],
  target: number
): number[][] => {
  arr.sort()
  const result: number[][] = []
  let s = 0
  let m = 0
  let l = 0
  for (s = 0; s < arr.length - 2; s += 1) {
    m = s + 1
    l = arr.length - 1
    while (m < l) {
      const sum = arr[s] + arr[m] + arr[l]
      if (sum >= target) {
        l -= 1
      } else {
        pushAllTriplets(s, m, l, result)
        m += 1
      }
    }
  }
  return result
}
