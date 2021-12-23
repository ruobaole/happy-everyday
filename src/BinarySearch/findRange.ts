// https://www.educative.io/courses/grokking-the-coding-interview/R1B78K9oBEz
//
// Iterate the array twice to find the first position of the key and the last position.
// Of course, if the first position is -1, we do not need to iterate again.
// In finding the first position, when arr[mid] === key, we should let
//   end = mid - 1 to see if key exists before the current one
// In find the last position...
//   start = mid + 1 to see if key exists after the current
// Because we are eliminating the mid in each iteration -- we will not loop
//   in start === end -> hence, break at start > end
// While searching, keeping record of the positionFound in each iteration
// -- this is for writing cleaner code
//
// Time: O(logN)
// Space: O(1)

const findKeyPosition = (arr: number[], key: number, findFirst: boolean) => {
  let keyPos = -1
  let start = 0
  let end = arr.length - 1
  while (start <= end) {
    const mid = Math.floor(start - (start - end) / 2)
    if (arr[mid] < key) {
      start = mid + 1
    } else if (arr[mid] > key) {
      end = mid - 1
    } else {
      keyPos = mid
      if (findFirst) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    }
  }
  return keyPos
}

export const findRange = (arr: number[], key: number): [number, number] => {
  const res: [number, number] = [-1, -1]
  res[0] = findKeyPosition(arr, key, true)
  if (res[0] !== -1) {
    res[1] = findKeyPosition(arr, key, false)
  }
  return res
}
