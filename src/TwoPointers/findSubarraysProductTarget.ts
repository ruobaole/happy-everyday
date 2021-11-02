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
    while (product >= target && l < r) {
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
