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
