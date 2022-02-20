// https://www.educative.io/courses/grokking-the-coding-interview/YQ8N2OZq0VM
//
// (similiar to findPermutationSubstring)
// Use hashmap patternMap{} to validate a substring
//  key - char in pattern, value - freq of that char in pattern - freq of that char in substring
// Update patternMap:
//  when char enters the window - patternMap[rightC] += 1
//  when char leaves the window - patternMap[leftC] -= 1
//  don't forget to delete pairs when value === 0, so that we can check valiation simply by
//  seeing if Objects.keys(patternMap).length === 0
// 1. move right rightwards one step each time
//    update patternMap
//    if windowSize > pattern.length, we have to move left
// 2. move left when windowSize > pattern.length
//    update patternMap
// 3. if the substring is valid (patternMap matches && windowSize === pattern.length) ->
//    push left to result
//
// Time: O(N)

export const findStringAnagrams = (str: string, pattern: string): number[] => {
  const patternMap: Record<string, number> = {}
  let l = 0
  let r = 0
  const result: number[] = []
  // init patternMap
  let idx = 0
  while (idx < pattern.length) {
    if (patternMap[pattern[idx]] === undefined) {
      patternMap[pattern[idx]] = 0
    }
    patternMap[pattern[idx]] += 1
    idx += 1
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
    if (r - l + 1 === pattern.length && Object.keys(patternMap).length === 0) {
      result.push(l)
    }
  }
  return result
}

//--- r2 ---//

// Sliding window with fixed window size
// Use a hashmap toMatch to mark chars in the pattern and their frequencies.
// Whenever a char is matched, toMatch[char] -= 1
// Whenever a matched char is leaving the window, toMatch[char] += 1
// We also keep an int -- matchedCnt, to count the unique chars we have matched
// Update matchedCnt when toMatch[someChar] === 0
// We know that the substring in the window is an anagram when
// 1. windowSize === patternSize
// 2. matchedCnt === toMatch's keys' length
// Expand the window -- moving right
// - update toMatch and matchedCnt
// Shrink the window when the windowSize > pattern.length
// move left
// - update toMath and matchedCnt
// Now if windowSize === pattern.length
// check if matchedCnt === toMatch's keys' length
// if true -> push left into the result
//
// Time: O(N + P) P is the length of pattern
// Space: O(P) -- the hashmap

export const findStringAnagrams_r2 = (
  str: string,
  pattern: string
): number[] => {
  const result: number[] = []
  if (pattern.length > str.length) {
    return result
  }
  const toMatch: Record<string, number> = {}
  for (let i = 0; i < pattern.length; i += 1) {
    if (toMatch[pattern[i]] === undefined) {
      toMatch[pattern[i]] = 0
    }
    toMatch[pattern[i]] += 1
  }
  let left = 0
  let matchedCnt = 0
  for (let right = 0; right < str.length; right += 1) {
    const rightC = str[right]
    if (toMatch[rightC] !== undefined) {
      toMatch[rightC] -= 1
    }
    if (toMatch[rightC] === 0) {
      matchedCnt += 1
    }
    while (right - left + 1 > pattern.length) {
      // shrink by moving left
      const leftC = str[left]
      if (toMatch[leftC] !== undefined) {
        toMatch[leftC] += 1
      }
      if (toMatch[leftC] === 1) {
        matchedCnt -= 1
      }
      left += 1
    }
    if (
      right - left + 1 === pattern.length &&
      matchedCnt === Object.keys(toMatch).length
    ) {
      result.push(left)
    }
  }
  return result
}
