// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/RM5E56PGnVY
//
// We can have multiple rods of length 1 and multiple rods of lengths 2,... as long as the
//  total lengths of rods add up to n
// Hence, we can use DP[i][l] to mark the max profits we can get by cutting the rod with total
//  length l, and the lengths we can cut the rod are length[0], length[1], ... length[i]
// Deduction:
// 1) try including at least 1 rod with length indexed i
// prices[i] + DP[i][l - lengths[i]]
// 2) try not including any rod with length indexed i
// DP[i - 1][l]
// DP[i][l] = Math.max(profit1, profit2)
// Base Case:
// 1) DP[i][0] = 0
// 2) DP[0][l] = Math.floor(l/lengths[0]) * prices[0]
//
// Time: O(N * M) -- M is the number of lengths we can cut
// Space: O(N * M) alough can be reduced to O(2*M) if we reuse 2 rows

export function rodCutting(
  lengths: number[],
  prices: number[],
  n: number
): number {
  if (n <= 0 || lengths.length === 0 || lengths.length !== prices.length) {
    return 0
  }
  const DP = new Array(lengths.length)
    .fill(0)
    .map(() => new Array(n + 1).fill(0))
  // Base Case
  for (let l = 0; l <= n; l += 1) {
    DP[0][l] = Math.floor(l / lengths[0]) * prices[0]
  }

  for (let i = 1; i < lengths.length; i += 1) {
    for (let l = 0; l <= n; l += 1) {
      // 1) try including at least 1 sub-rod with length[i]
      let profit1 = 0
      if (lengths[i] <= l) {
        profit1 = prices[i] + DP[i][l - lengths[i]]
      }
      // 2) try not including any of the sub-rod
      const profit2 = DP[i - 1][l]
      DP[i][l] = Math.max(profit1, profit2)
    }
  }
  return DP[lengths.length - 1][n]
}

// Find the selected elements
// Examing the last DP matrix, we know that from the last (bottom-right)
//  corner, in each cell, the value can be got in one of the 2 ways
// 1. from the cell top to it
//  in that case, the curCelll's value should equal to its top cell's value
// 2. from the cell in the same row to somewhere to the left of the current
//  the col should be curCol - lengths[curRow]
//  and the values should be --
//  curCellValue - prices[curRow] === the value in the target col
// Thus, we can start from the last cell
// Each time, compare the cell's value with its top one, to get to the row
//  that has a value different than the current
// Now, we should push in the item represented by the cur row
// Jump to the left-col at the same row
// Continue going up until we got to either:
// 1) row 0; now if the cell's value is not 0, we should push in item[0]
//  the number of item[0] is calculated by cellValue / prices[0]
// 2) a row whose top cell has different value than the current row, loop the
//  above process

export function rodCutting2(
  lengths: number[],
  prices: number[],
  n: number
): number[] {
  // return the indices of the cutted subrods
  // e.g. [2, 2, 1]
  if (n <= 0 || lengths.length === 0 || lengths.length !== prices.length) {
    return []
  }
  const DP = new Array(lengths.length)
    .fill(0)
    .map(() => new Array(n + 1).fill(0))
  // Base Case
  for (let l = 0; l <= n; l += 1) {
    DP[0][l] = Math.floor(l / lengths[0]) * prices[0]
  }

  for (let i = 1; i < lengths.length; i += 1) {
    for (let l = 0; l <= n; l += 1) {
      // 1) try including at least 1 sub-rod with length[i]
      let profit1 = 0
      if (lengths[i] <= l) {
        profit1 = prices[i] + DP[i][l - lengths[i]]
      }
      // 2) try not including any of the sub-rod
      const profit2 = DP[i - 1][l]
      DP[i][l] = Math.max(profit1, profit2)
    }
  }

  const selected: number[] = []
  let row = prices.length - 1
  let col = n
  let curProfit = DP[row][col]
  while (row > 0) {
    while (row > 0 && curProfit === DP[row - 1][col]) {
      row -= 1
    }
    if (row > 0) {
      selected.push(row)
      col -= lengths[row]
      curProfit -= prices[row]
    }
  }
  if (curProfit > 0) {
    for (let i = 0; i < Math.floor(curProfit / prices[0]); i += 1) {
      selected.push(0)
    }
  }
  return selected
}

//--- r2 ---//
//
// Problem: find the selection with the max profit, and return the selected items
// The problem is very much similar to unbounded-knapsack, but not the same.
// The difference is that, in this problem, a rop with length l can be selected more than
//  once.
// Hence, in processing each rop with length lengths[i], when branching between if including in
//  the item or not, if including the item, we can have it in the selection more than once --
// DP[i][l - lengths[i]] instead of DP[i - 1][l - lengths[i]]
// How to find the selection?
// from the final matrix's bottom-right corner; each cell's value can be coming from either the
// two ways --
// 1) its top cell -- meaning that the item represented by the row is not selected
// 2) a cell in the same row to the left of it (col = curCol - lengths[i - 1]) -- meaning that the item
//  is selected
// - thus, starting from the bottom-right corner, we first going up until the top cell's value !== current cell's value;
// - going left, jump to the col - curCol - lengths[i - 1]
// - including the item represented by the current row in the selection
// - continue the process until we've reached the 1st row
//
// Time: O(M * N) -- M is the number of possible rod-length cut; N is the total rod's length;
// Space: O(M * N)

export function rodCutting_r1(
  lengths: number[],
  profits: number[],
  n: number
): number[] {
  const selection: number[] = []
  if (n <= 0 || lengths.length === 0 || lengths.length !== profits.length) {
    return selection
  }

  // DP[i][l] - the max profit to cut the rod with total length l with possible lengths
  //  of the first i items in the given array
  const DP = new Array(lengths.length + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= lengths.length; i += 1) {
    for (let l = 1; l <= n; l += 1) {
      // 1. try including in the i-1 th item
      let profit1 = 0
      if (lengths[i - 1] <= l) {
        profit1 = profits[i - 1] + DP[i][l - lengths[i - 1]]
      }
      // 2. try not including in the i-1 th item
      const profit2 = DP[i - 1][l]
      DP[i][l] = Math.max(profit1, profit2)
    }
  }

  // find the selection
  const curProfit = DP[lengths.length][n]
  let curRow = lengths.length
  let curCol = n
  while (curRow > 0) {
    // 1. going up until the top cell's value is different
    while (curRow > 0 && curProfit === DP[curRow - 1][curCol]) {
      curRow -= 1
    }
    // 2. skip to left
    if (curRow > 0) {
      curCol -= lengths[curRow - 1]
      selection.push(curRow)
    }
  }
  return selection
}
