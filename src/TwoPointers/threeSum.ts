// https://www.educative.io/courses/grokking-the-coding-interview/gxk639mrr5r
//
// Remember the problem: find paris with target sum?
// Sort the array first. And then iterate thought the smallest number of the resulting triplet
//  trying to find the other two numbers in the remaining subarray that adds up to targetSum ===
//  0 - arr[i]
// We need to return only those unqiue triplets. Thus, when searching the smallest, middle and largest
//  numbers, we skip all duplicated elements. (this would be easy because the array is sorted)
//
// Time: (N^2)
//   - sorting takes O(NlogN) time, however, for each 'largest element' the findPairWithTargetSum
//   takes O(M) time (M is the remaining length)

export const threeSum = (arr: number[]): number[][] => {
  arr.sort()
  const result: number[][] = []
  let s = 0
  let m = 0
  let l = 0
  for (s = 0; s < arr.length - 3 + 1; s += 1) {
    if (s - 1 >= 0 && arr[s - 1] === arr[s]) {
      // skip duplicates
      continue
    }
    // find pairs with target sum
    m = s + 1
    l = arr.length - 1
    while (m < l) {
      while (m < l && m - 1 > s && arr[m - 1] === arr[m]) {
        m += 1
      }
      while (m < l && l + 1 < arr.length && arr[l + 1] === arr[l]) {
        l -= 1
      }
      if (m < l) {
        if (arr[m] + arr[l] < 0 - arr[s]) {
          m += 1
        } else if (arr[m] + arr[l] > 0 - arr[s]) {
          l -= 1
        } else {
          result.push([arr[s], arr[m], arr[l]])
          m += 1
          l -= 1
        }
      }
    }
  }
  return result
}
