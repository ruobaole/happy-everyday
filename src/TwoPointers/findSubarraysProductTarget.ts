// https://www.educative.io/courses/grokking-the-coding-interview/RMV1GV1yPYz
//
// Sliding window + two pointers (similar to triplets with sum smaller than target follow up)
// 1. move right rightwards
//    update product by product *= arr[right]
//    if subarray valid -- product < target
//    all sub-subarrays within the subarray are valid subarrays
//    however, to avoid duplicate, each time we only push in sub-subarrays ending at right
//    if subarray is invalid -> we should shrink by move left
// 2. move left until the subarray is again valid
//    now, push in all sub-subarrays ending at right within the current subarray
//
// Time: worst case O(N^3) - the sliding window takes O(N) time.
//   the creating of all sub-subarrays can take O(N^2) time at worst case.
//   TRICKY: the copy of each sub-subarray takes O(N)
// Space:
//   the length of the output list is at largest N + N -1 + N - 2 + ... 1 -> O(N^2)
//   meaning at most O(N^2) subarrays
//   the length of these subarrays: N * 1 + 2(N-1) + 3(N-2) +... N*1
//   = N * (1 + 2 + 3 + ... N) - (2*1 + 3*2 + 4*3 + ... N*(N-1))

export const findSubarraysWithProductTarget = (
  arr: number[],
  target: number
): number[][] => {
  // arr contains only positive nums. target > 0
  const result: number[][] = []
  let product = 1
  let r = 0
  let l = 0
  for (r = 0; r < arr.length; r += 1) {
    product *= arr[r]
    while (product >= target && l <= r) {
      product /= arr[l]
      l += 1
    }
    // collect all sub-subarrays within [l, r]
    const tmp: number[] = []
    for (let i = r; i > l - 1; i -= 1) {
      tmp.push(arr[i])
      result.push([...tmp])
    }
  }
  return result
}

// review practices //

// This is a sliding window + two pointers problem!
// In sliding window problems, we always be asked to find THE SMALLEST / LONGEST continues subarray.
// while in this problem, all such subarrays should be found.
// Hence,
// 1. use sliding window to find the largest valid subarrays starting at each elements
// 2. then, all sub-subarrays containing in that subarray shoulds be valid
// 3. to avoid duplicates, each time we only push in sub-subarrays that ending at right
//   all the others ending at range [left, right-1] should have been already added in former iterations.
// NOTE that when sliding window, the window's left and right bounds are at most left === right
//  or the window is meaningless.
//
// Time: best case O(N) - when on such subarrays can be found, only sliding the window
//  worst case - O(N^3) when all of the subarrays are valid, each sliding window iteration takes
//  O(N) iterations to traverse sub-subarrays, and the copy of the sub-subarrays take O(N) time.
// Space: is the resulting subarrays, worst case is when all the subrrays are valid --
//  number of subarrays: n + n-1 + n-2 + ... 1 -> O(N^2)
//  each of the subarray, at most O(N)
//  thus, O(N^3)

export const findSubarraysWithProductTarget_r1 = (
  arr: number[],
  target: number
): number[][] => {
  const result: number[][] = []
  let l = 0
  let r = 0
  let product = 1
  for (r = 0; r < arr.length; r += 1) {
    product *= arr[r]
    while (product >= target && l <= r) {
      product /= arr[l]
      l += 1
    }
    // valid, push all results
    const tmp: number[] = []
    for (let i = r; i >= l; i -= 1) {
      tmp.push(arr[i])
      result.push([...tmp])
    }
  }
  return result
}
