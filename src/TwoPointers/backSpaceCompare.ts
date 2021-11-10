// https://www.educative.io/courses/grokking-the-coding-interview/g7pBzR12YPl
//
// TRICKY: a solution in O(N+M) time and O(1) extra space is to compare both of the string
//  backwards (from the ends of the strings)
// everytime we encounter a #, we apply the # by moving the pointers to cancel the equal number of non-# chars
// as the number of # we seen ---- find the next non-# chars
// And we compare the two non-# chars each time.

const findValidIndex = (str: string, idx: number): number => {
  let hashCount = 0
  while (idx >= 0) {
    if (str[idx] === '#') {
      hashCount += 1
      idx -= 1
    } else if (hashCount > 0) {
      hashCount -= 1
      idx -= 1
    } else if (hashCount === 0) {
      break
    }
  }
  return idx
}

export const backspaceCompare = (str1: string, str2: string): boolean => {
  let p1 = str1.length - 1
  let p2 = str2.length - 1
  while (p1 >= 0 && p2 >= 0) {
    p1 = findValidIndex(str1, p1)
    p2 = findValidIndex(str2, p2)
    if (p1 < 0 && p2 < 0) {
      return true
    }
    if (p1 < 0 || p2 < 0) {
      return false
    }
    if (str1[p1] !== str2[p2]) {
      return false
    }
    p1 -= 1
    p2 -= 1
  }
  return true
}

// review practice //

// To compare two strings, we need 2 pointers each pointing at a string and comparing each letter.
// [TRICKY] a # cancels its previous letter, 2 consecutive #s cancel 2 of its previous letters
//  - imagine grows from back. a## -> '', ba## -> '', cba## -> c, #ba## -> '', c#ba## -> ''
//   c#a## -> ''
//  - we only need to read from back, when encountering continuous #, count the number and skip
//   non-hash letters.
//
// Time: O(N)

const findValidIdx_r1 = (str: string, idx: number): number => {
  if (idx < 0 || idx > str.length - 1) {
    return idx
  }
  let cnt = 0
  while (idx >= 0) {
    if (str[idx] === '#') {
      cnt += 1
      idx -= 1
    } else if (cnt > 0) {
      cnt -= 1
      idx -= 1
    }
    if (cnt === 0) {
      break
    }
  }
  return idx
}

export const backspaceCompare_r1 = (str1: string, str2: string): boolean => {
  let p1 = str1.length - 1
  let p2 = str2.length - 1
  while (p1 >= 0 && p2 >= 0) {
    p1 = findValidIdx_r1(str1, p1)
    p2 = findValidIdx_r1(str2, p2)
    if (p1 < 0 || p2 < 0) {
      break
    }
    if (str1[p1] !== str2[p2]) {
      return false
    }
    p1 -= 1
    p2 -= 1
  }
  if (p1 < 0 && p2 < 0) {
    return true
  }
  return false
}
