// https://www.educative.io/courses/grokking-the-coding-interview/g2w6QPBA2Nk
//
// The problem is very similar to the 'findCeiling' problem with some difference:
// 1. the array is circular -- means that if the last letter is smaller than the key
//   we should return the first letter; also, if the first letter is greater than the
//   key, the result is still the first letter;
// 2. We are to find the smallest letter greater than the key -- not >= -->
//   hence we should ignore the case when letters[mid] === key and continue search
//   in area when start = mid + 1
// In this case, we dump half of the array + the mid letter in each iteration -->
//  if cases are that the letters is reduced to only one element --> start will
//  become 1 in the next iteration
//  -> hence, we break when start > end -> at last, return letters[start % length]
//  (circular, return the first one)
//
// Time: O(logN)
// Space: O(1)

export const searchNextLetter = (letters: string[], key: string): string => {
  // Assume: letters contains only lowercase letters
  const len = letters.length
  let start = 0
  let end = len - 1
  let mid = start
  while (start <= end) {
    mid = Math.floor(start - (start - end) / 2)
    if (letters[mid] <= key) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  // now start > end
  return letters[start % len]
}
