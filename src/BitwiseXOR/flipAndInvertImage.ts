// https://www.educative.io/courses/grokking-the-coding-interview/xoExKDNWq8n
//
// We iterate the image row by row
// For each row, we iterate to flip the row by switching row[col] with row[rowLen - 1 - col]
// Not only swich, but also XOR the number with 1 before placing the switched element
//
// Time: O(N*M)
// Space: the resulting matrix -- O(N*M)

export const flipAndInvertImage = (matrix: number[][]): number[][] => {
  const matrix1: number[][] = []
  let rowLen = 0
  for (let row = 0; row < matrix.length; row += 1) {
    rowLen = matrix[row].length
    matrix1.push([...matrix[row]])
    for (let col = 0; col < Math.floor((rowLen + 1) / 2); col += 1) {
      const tmp = matrix1[row][col]
      // flip and invert
      matrix1[row][col] = matrix1[row][rowLen - 1 - col] ^ 1
      matrix1[row][rowLen - 1 - col] = tmp ^ 1
    }
  }
  return matrix1
}
