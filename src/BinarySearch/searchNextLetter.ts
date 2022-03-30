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

//--- r1 ---//

// Binary Search with the searching strategy a little different;
// - init the nextLetter being letters[0] -- because if no letter in the
//  array is greater than the key, the first letter is the next letter
// while searching,
//  - if letter[mid] <= key, the next letter is to the right of mid
//  - if letter[mid] > key, because we're to find the smallest letter
//   greater than key, we know that the nextLetter is either mid or to
//   the left of mid --> hence, we mark mid temperarily, and continue
//   searching in the left part of mid
// Because we're eliminating mid in every iteration, we can safely set the breaking
//  condition to be start > end
//
// Time: O(logN)
// Space: O(1)

export const searchNextLetter_r1 = (letters: string[], key: string): string => {
  // assume that letters contains only alphabetic lowercase letters
  let start = 0
  let end = letters.length - 1
  let mid = start
  let nextIdx = 0
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (letters[mid] <= key) {
      start = mid + 1
    } else {
      nextIdx = mid
      end = mid - 1
    }
  }
  return letters[nextIdx]
}

//--- r2 ---//
//
// Binary Search
// if midLetter > key, there can be potential answers to the left of midLetter,
// we can temporarily memorize the mid with nextIdx = mid; and search with in the
//  smaller half -- high = mid - 1
// the breaking condition should be the same -- low > high
// Notice that because all the letters are in their lower cases, we can compare the
//  order by directly -- letter1 < letter2
//
// Time: O(logN)

export function searchNextLetter_r2(letters: string[], key: string): string {
  let nextIdx = 0
  let low = 0
  let high = letters.length - 1
  let mid = low
  while (low <= high) {
    mid = Math.floor(low + (high - low) / 2)
    if (letters[mid] <= key) {
      low = mid + 1
    } else {
      nextIdx = mid
      high = mid - 1
    }
  }
  return letters[nextIdx]
}
