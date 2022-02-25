// https://www.educative.io/courses/grokking-the-coding-interview/mEEA22L5mNA
//
// Since the array is sorted, all duplicates should be next to each other.
// Use 2 pointers - p1, p2
// p1 - the last element of the resulting array
// p2 - to examine the next element
// Iterate p2, in every iteration:
// check if arr[p2] === arr[p1] -> duplicate, skip all duplicates
//  if false, arr[p1 + 1] = arr[p2], write p2 in p1 + 1
//
// Time: O(N)
// Space: O(1)

export function removeDuplicates(arr: number[]): number {
  let p1 = 0
  let p2 = 1
  for (p2 = 1; p2 < arr.length; p2 += 1) {
    if (arr[p2] !== arr[p1]) {
      arr[p1 + 1] = arr[p2]
      p1 += 1
    }
  }
  return p1 + 1
}
