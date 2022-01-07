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

//--- r1 ---//

// Although the matrix contains only 1 and 0, it is stored in the array --
// we have to traverse the matrix NxM anyway.
// We iterate the matrix row by row, for each row, we flip the row and invert
//  the flipped number
// How to invert the flipped number? -- just XOR it with 1;
// TRICY: if the row has odd length, don't forget to invert the middle one
// Hence, while iterating, if even: e.g. (4 + 1) / 2 = 2; iterate 0, 1
//  if odd: e.g. (3 + 1) / 2 = 2; iterate 0, 1 should be correct
//
// Time: O(N*M)
// Space: O(N*M)

export const flipAndInvertImage_r1 = (matrix: number[][]): number[][] => {
  const resMat: number[][] = []
  for (let r = 0; r < matrix.length; r += 1) {
    resMat.push(new Array(matrix[r].length).fill(0))
    for (let c = 0; c < Math.floor((matrix[r].length + 1) / 2); c += 1) {
      const cFlip = matrix[r].length - 1 - c
      resMat[r][c] = matrix[r][cFlip] ^ 1
      resMat[r][cFlip] = matrix[r][c] ^ 1
    }
  }
  return resMat
}
