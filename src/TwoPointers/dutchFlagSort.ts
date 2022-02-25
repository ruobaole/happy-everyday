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

// review practices //

// 3 parts, hence 3 partitioners (pointers) are needed
// [0, zero] are all 0s;
// [two, arr.length - 1] are all 2s;
// i is used to traverse the area between zero and two to see where should we put arr[i];
// 1. init: zero = -1, i = 0, two = arr.length
// 2. iterate:
//   if arr[i] === 0, swap arr[i] with arr[zero + 1], i += 1, zero += 1
//     (because all elements to the left of i have already been examined)
//   if arr[i] === 2, swap arr[i] with arr[two - 1], two -= 1
//     (we need to continue examine the newly swapped arr[i])
//   if arr[i] === 1, i += 1, continue looking for other 0 and 2
// 3. while (i < two)
//
// Time: O(N)

export const dutchFlagSort_r1 = (arr: number[]): void => {
  let zero = -1
  let i = 0
  let two = arr.length
  while (i < two) {
    if (arr[i] === 1) {
      i += 1
    } else if (arr[i] === 0) {
      ;[arr[i], arr[zero + 1]] = [arr[zero + 1], arr[i]]
      i += 1
      zero += 1
    } else {
      ;[arr[i], arr[two - 1]] = [arr[two - 1], arr[i]]
      two -= 1
    }
  }
}

//--- r2 ---//

// 3 parts -- 3 pointers as borders -- p0, p1, p2
// [0, p0] -- all 0s
// [p0+1, p1] -- all 1s
// [p2+1, end] -- all 2s
// [p1 + 1, p2] all elements need to be inspected
// move p1 to inspect elements
// if p1 points to 0, switch it to p0, move p0 and p1
// if p1 points to 1, move p1
// if p1 points to 2, switch it to p2, move p2

export function dutchFlagSort_r2(arr: number[]) {
  // assume that the arr contains only 0, 1, and 2s
  let p0 = 0
  let p1 = 0
  let p2 = arr.length - 1
  while (p1 <= p2) {
    if (arr[p1] === 0) {
      ;[arr[p0], arr[p1]] = [arr[p1], arr[p0]]
      p0 += 1
      p1 += 1
    } else if (arr[p1] === 1) {
      p1 += 1
    } else {
      ;[arr[p1], arr[p2]] = [arr[p2], arr[p1]]
      p2 -= 1
    }
  }
}
