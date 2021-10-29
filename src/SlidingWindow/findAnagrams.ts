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
