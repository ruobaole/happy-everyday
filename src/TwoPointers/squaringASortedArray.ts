// https://www.educative.io/courses/grokking-the-coding-interview/R1ppNG3nV9R
//
// Because the array is sorted, thus the one with the larger square starting from both ends.
// Two Pointers - 2 solutions:
//   - Search from both ends [THIS FUNCTION]
//   - Search from the first non-negative one. One pointer to search within the negatives while the
//     other is used to traverse the non-negative ones.
//
// left and right start from the two ends of the array and move in opposite direction towards each other
// stop moving until they left > right (because we still need the element when left === right)
// In each iteration, compare the square of two numbers, write down the larger one and move
//   the pointer of the larger one
// NOTE that we don't have to reverse the result array. Because we know the length of the result
//   array, we only have to make an all-zero array at the beginning and start to fill them with squares
//   from the behind.

export const squaringArray = (arr: number[]): number[] => {
  const result = Array(arr.length).fill(0)
  let l = 0
  let r = arr.length - 1
  let i = arr.length - 1
  while (l < r) {
    const leftSquare = arr[l] ** 2
    const rightSquare = arr[r] ** 2
    if (leftSquare <= rightSquare) {
      result[i] = rightSquare
      r -= 1
    } else {
      result[i] = leftSquare
      l += 1
    }
    i -= 1
  }
  return result
}

//--- r2 ---//

// 1. Iterate to find the first non-negative element
// 2. use two pointers p1, p2; p1 is inited at the last negative element;
//  p2 is inited at the first non-negative element
// 3. at each step, compare the 2 pointers and move the one with the smaller
//  squares in priority
//
// Time: O(N)

export function squaringArray_r2(arr: number[]): number[] {
  const result: number[] = []
  // p2 - the first non-negative
  let p2 = 0
  while (arr[p2] < 0 && p2 < arr.length) {
    p2 += 1
  }
  // p1 - the last negative
  let p1 = p2 - 1
  while (p2 < arr.length && p1 >= 0) {
    const n1 = arr[p1]
    const n2 = arr[p2]
    if (n1 ** 2 <= n2 ** 2) {
      result.push(n1 ** 2)
      p1 -= 1
    } else {
      result.push(n2 ** 2)
      p2 += 1
    }
  }
  while (p2 < arr.length) {
    result.push(arr[p2] ** 2)
    p2 += 1
  }
  while (p1 >= 0) {
    result.push(arr[p1] ** 2)
    p1 -= 1
  }
  return result
}
