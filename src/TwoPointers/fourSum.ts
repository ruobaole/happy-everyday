// https://www.educative.io/courses/grokking-the-coding-interview/gxDOJJ7xAJl
//
// Use the same strategy as threeSum.
// 1. Sort the array first
// 2. Iterate the smallest and second smallest elements in the quadruple using i, j iteration
//   don't forget to skip duplicates cause we don't want duplicate quadruple at last.
// 3. In each iteration, find twoSum pairs with sum equals target - smallest - secondSmallest in the rest
//   array. (also, skip duplicates)
//
// Time: O(N^3), since the iteration of the first two elements take O(N^2) and each twosum takes O(N)
// Space: number of quadruples -- O(N^2)

export const fourSum = (arr: number[], target: number): number[][] => {
  const result: number[][] = []
  arr.sort((a, b) => a - b)
  let ele1 = 0
  let ele2 = 0
  let ele3 = 0
  let ele4 = 0
  for (ele1 = 0; ele1 < arr.length - 4 + 1; ele1 += 1) {
    if (ele1 - 1 > 0 && arr[ele1 - 1] === arr[ele1]) {
      continue
    }
    for (ele2 = ele1 + 1; ele2 < arr.length - 3 + 1; ele2 += 1) {
      if (ele2 - 2 > ele1 && arr[ele2 - 1] === arr[ele2]) {
        continue
      }
      // find pair
      ele3 = ele2 + 1
      ele4 = arr.length - 1
      while (ele3 < ele4) {
        if (ele3 - 1 > ele2 && arr[ele3 - 1] === arr[ele3]) {
          ele3 += 1
          continue
        }
        if (ele4 + 1 < arr.length && arr[ele4 + 1] === arr[ele4]) {
          ele4 -= 1
          continue
        }
        const sum = arr[ele1] + arr[ele2] + arr[ele3] + arr[ele4]
        if (sum < target) {
          ele3 += 1
        }
        if (sum > target) {
          ele4 -= 1
        }
        if (sum === target) {
          result.push([arr[ele1], arr[ele2], arr[ele3], arr[ele4]])
          ele3 += 1
          ele4 -= 1
        }
      }
    }
  }
  return result
}

//--- r2 ---//
// Similar solution as threeSum
// Sort the array first
// Iterate the smallest and the 2nd smallest element of the quadruple using i, j
// In each iteration, search for pairs with sum equals target - smallest - secondSmallest
// Don't forget to skip all dupliates for each pointer
//
// Time: O(N^3) -- the iteration of i, j takes O(N^2), the last iteration takes O(N)
// Space: bounded by the result array -- O(N^2)

export function fourSum_r2(arr: number[], target: number): number[][] {
  const result: number[][] = []
  if (arr.length < 4) {
    return result
  }
  arr.sort((a, b) => a - b)
  let low = 0
  let high = 0
  for (let i = 0; i < arr.length - 3; i += 1) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue
    }
    for (let j = i + 1; j < arr.length - 2; j += 1) {
      if (j > i + 1 && arr[j] === arr[j - 1]) {
        continue
      }
      low = j + 1
      high = arr.length - 1
      while (low < high) {
        if (low > j + 1 && arr[low] === arr[low - 1]) {
          low += 1
          continue
        }
        if (high < arr.length - 1 && arr[high] === arr[high + 1]) {
          high -= 1
          continue
        }
        const curSum = arr[i] + arr[j] + arr[low] + arr[high]
        if (curSum === target) {
          result.push([arr[i], arr[j], arr[low], arr[high]])
          low += 1
          high -= 1
        } else if (curSum < target) {
          low += 1
        } else {
          high -= 1
        }
      }
    }
  }
  return result
}
