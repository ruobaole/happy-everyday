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
