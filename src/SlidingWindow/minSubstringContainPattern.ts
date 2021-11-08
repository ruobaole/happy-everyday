// https://www.educative.io/courses/grokking-the-coding-interview/3wDJAYG2pAR
//
// Use hashmap charFreq{} to record chars in pattern and the difference of the frequencies. --
//   key - char in pattern; value: freq of that char in pattern - freq of that char in the substring
// Update charFreq:
//   - everytime a char enters the window: charFreq[rightC] -= 1
//     ignore chars that are not in charFreq's keys -- because all strings that CONTAINS the pattern
//     is valid -> we are only interested in those chars that are in the pattern.
//   - everytime a char leaves the window: charFreq[leftC] += 1
// we also need an int - numMatched to record number of chars already matched --
//   everytime some value of charFreq reaches below 0 (<= 0) -> numMatched += 1;
//   everytime some value of charFreq reaches above 0 (> 0) -> numMatched -= 1;
// the substring is valid when numMatched === pattern.length
// 1. move right righwards 1 step each time
//    update charFreq using rightC
//    update numMatched
//    if windowSize > pattern.length and numMatched === pattern.length
//      -- potential smaller substring may exists, shrink the window
// 2. move left rightwards until the above constraint wouldn't meet
//    update charFreq using leftC
//    update numMatched
//    if the substring is valid, update resL and resR
//
// Time: O(N+K)

// export const findSmallestSubstringContaining = (
//   str: string,
//   pattern: string
// ): string => {
//   const charFreq: Record<string, number> = {}
//   let numMatched = 0
//   let l = 0
//   let r = 0
//   let resL = 0
//   let resR = -1
//   // init charFreq
//   for (let i = 0; i < pattern.length; i += 1) {
//     if (charFreq[pattern[i]] === undefined) {
//       charFreq[pattern[i]] = 0
//     }
//     charFreq[pattern[i]] += 1
//   }
//   for (r = 0; r < str.length; r += 1) {
//     const rightC = str[r]
//     if (charFreq[rightC] !== undefined) {
//       charFreq[rightC] -= 1
//     }
//     if (charFreq[rightC] === 0) {
//       numMatched += 1
//     }
//     while (numMatched === pattern.length) {
//       if (r - l + 1 < resR - resL + 1 || resR === -1) {
//         resL = l
//         resR = r
//       }
//       // shrink
//       const leftC = str[l]
//       if (charFreq[leftC] !== undefined) {
//         // we don't care those chars not in the pattern
//         charFreq[leftC] += 1
//       }
//       if (charFreq[leftC] === 1) {
//         numMatched -= 1
//       }
//       l += 1
//     }
//   }
//   return str.slice(resL, resR + 1)
// }

// review practices //

// Use a hashmap toMatch{} to record chars within the pattern and their frequencies.
// We also need a number matchedCnt to record the number of chars in the pattern we have already matched
// Each time a char enters the window:
//  - if it exists in toMatch: toMatch -= 1
//  - if it does not exists in toMatch: ignore it (cause we don't care chars other than those in the
//    pattern)
// Because the substring we are looking for is valid as long as it contains what in the pattern,
//  we first slide right to find a valid substring, and shrink in trying to find smaller ones.
// (if the larger substring is invalid, we do not need to search in its sub-substrings)
// Thus, the process are as the following:
// 1. move right rightwards 1 by each step
//  update toMatch (decrease the char we've matched)
//  update matchedCnt:
//    - if toMatch[rightC] === 0: matchedCnt += 1
//  if the substring is valid (matchedCnt === pattern.length): try finding smaller substrings
//  by moving left
// 2. how to move left: rightwards 1 by each step
//  update toMatch (increase the leaving char that matched in the pattern)
//  update matchedCnt:
//    - if toMatch[leftC] === 1: matchedCnt -= 1
//  update resL and resR if the substring is valid
//
// Time: O(N+K)

export const findSmallestSubstringContaining = (
  str: string,
  pattern: string
): string => {
  let resL = 0
  let resR = -1
  const toMatch: Record<string, number> = {}
  let matchedCnt = 0
  let l = 0
  let r = 0
  // init toMatch
  for (let i = 0; i < pattern.length; i += 1) {
    if (toMatch[pattern[i]] === undefined) {
      toMatch[pattern[i]] = 0
    }
    toMatch[pattern[i]] += 1
  }
  for (r = 0; r < str.length; r += 1) {
    const rightC = str[r]
    if (toMatch[rightC] !== undefined) {
      toMatch[rightC] -= 1
    }
    if (toMatch[rightC] === 0) {
      matchedCnt += 1
    }
    while (matchedCnt === pattern.length) {
      if (r - l + 1 < resR - resL + 1 || resR === -1) {
        resR = r
        resL = l
      }
      const leftC = str[l]
      if (toMatch[leftC] !== undefined) {
        toMatch[leftC] += 1
      }
      if (toMatch[leftC] === 1) {
        matchedCnt -= 1
      }
      l += 1
    }
  }
  return str.slice(resL, resR + 1)
}
