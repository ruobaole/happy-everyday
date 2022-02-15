// https://www.educative.io/courses/grokking-the-coding-interview/N8vB7OVYo2D
//
// Use hashmap patternMap {} to validate a substring --
//  key: char, value: freq of this char in pattern - freq of this char in substring
// Update patternMap - every time a char enters the window, patternMap[rightC] -= 1
//  every time a char leaves the window, patternMap[leftC] += 1
//  delete the record when value === 0 --> thus, a substring is valid when
//  Objects.keys(patternMap) === 0 -> we can validate in O(1)
// 1. move right rightwards 1 step each time
//    update patternMap by ---- patternMap[rightC] -= 1
// 2. if windowSize > patternSize, move left rightwards by 1 each time
//    update patternMap by ---- patternMap[leftC] += 1
// 3. if Object.keys(patternMap.keys()) === 0 -> return true
// return false if right reaches to the end
//
// Time: O(N+K) K is the length of pattern

export const findPermulatePatternSubstring = (
  str: string,
  pattern: string
): boolean => {
  const patternMap: Record<string, number> = {}
  let l = 0
  let r = 0
  let findOne = false
  // init patternMap
  let i = 0
  while (i < pattern.length) {
    if (patternMap[pattern[i]] === undefined) {
      patternMap[pattern[i]] = 0
    }
    patternMap[pattern[i]] += 1
    i += 1
  }
  for (r = 0; r < str.length; r += 1) {
    const rightC = str[r]
    if (patternMap[rightC] === undefined) {
      patternMap[rightC] = 0
    }
    patternMap[rightC] -= 1
    if (patternMap[rightC] === 0) {
      delete patternMap[rightC]
    }
    if (r - l + 1 > pattern.length) {
      const leftC = str[l]
      if (patternMap[leftC] === undefined) {
        patternMap[leftC] = 0
      }
      patternMap[leftC] += 1
      if (patternMap[leftC] === 0) {
        delete patternMap[leftC]
      }
      l += 1
    }
    if (Object.keys(patternMap).length === 0) {
      findOne = true
      break
    }
  }
  return findOne
}

//--- r2 ---//

// Sliding window with fixed size -- pattern.length
// Use a hashmap patternFreq to mark the chars in the pattern; everytime
//   a char in the pattern is found in the window, we decrease its freq by 1
// Also keep a count of matchedCnt to see how many chars in the pattern have
//   been matched in the window
// Everytime patternFreq[someChar] is 0, matchedCnt += 1
// We know that a permutation is found when matchedCnt === Object.keys(patternFreq).length
// 1. try expand the window
// move right one step each time
// update patternFreq
// update matchedCnt
// 2. shrink the window if windowLen > pattern.length
// update patternFreq
// update matchedCnt
// 3. now, if windowLen === pattern.length, we should check if
// matchedCnt === 0 -> find the pattern
//
// Time: O(N)
// Space: O(N) -- the hashmap's size if we do not clean 0 ones

export function findPermutation(str: string, pattern: string): boolean {
  if (str.length < pattern.length) {
    return false
  }
  const patternFreq: Record<string, number> = {}
  // intialize patternFreq
  for (let i = 0; i < pattern.length; i += 1) {
    const pChar = pattern[i]
    if (patternFreq[pChar] === undefined) {
      patternFreq[pChar] = 0
    }
    patternFreq[pChar] += 1
  }
  let matchedCnt = 0
  let left = 0
  for (let right = 0; right < str.length; right += 1) {
    const rightC = str[right]
    if (patternFreq[rightC] !== undefined) {
      patternFreq[rightC] -= 1
    }
    if (patternFreq[rightC] === 0) {
      // one char matched
      matchedCnt += 1
    }
    while (right - left + 1 > pattern.length) {
      // shrink the window to make window size fixed
      const leftC = str[left]
      if (patternFreq[leftC] !== undefined) {
        patternFreq[leftC] += 1
      }
      if (patternFreq[leftC] === 1) {
        // a matched char is unmatched
        matchedCnt -= 1
      }
      left += 1
    }
    if (
      right - left + 1 === pattern.length &&
      matchedCnt === Object.keys(patternFreq).length
    ) {
      return true
    }
  }
  return false
}
