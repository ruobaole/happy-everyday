// https://www.educative.io/courses/grokking-the-coding-interview/RMBxV6jz6Q0
//
// A.K.A Rainbow Sort
// Use the same strategy as partition() in quick sort.
// Rainbow sort -> 3 parts -> 3 partition borders. low, high, i
// move all 0s to [start, low), all 2s to (high, end], all 1s to [low, i)
// all elements >= i && <= high are elements waiting to be partitioned (inspect)
// i is the inspector. we use i to detect elements, hence
// - if arr[i] is 0, swap it with arr[low]; because all elements < i are elements we have inspected -- must be 0s
//    thus, we do not need to inspect the newly swapped arr[i] now. increment low and i
// - if arr[i] is 2, swap it with arr[high], high -= 1. because we haven't ever inspect the newly swapped arr[high]
//    yet. so we only decrement high and continue to inspect arr[i]
// - if arr[i] is 1, continue to inspect arr[i+1]
//
// Time: O(N) - only one iteration of the array
// Space: O(1)
// TRICKY:
//   1. swap in js/ts -- use array spread assign!
//   2. while loop stop condition - remember to inspect arr[high]
//     (all elements within [i, high] are elements we haven't inspect yet)

export const dutchFlagSort = (arr: number[]): void => {
  // Assume that the input arr contains only 0, 1, and 2
  let low = 0
  let high = arr.length - 1
  // all elements within [i, high] are elements we haven't inspect yet
  let i = 0
  while (i <= high) {
    if (arr[i] === 0) {
      // swap elements
      ;[arr[i], arr[low]] = [arr[low], arr[i]]
      low += 1
      i += 1
    } else if (arr[i] === 2) {
      ;[arr[i], arr[high]] = [arr[high], arr[i]]
      high -= 1
    } else {
      i += 1
    }
  }
}
