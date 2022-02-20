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

//--- r2 ---//

// Sliding Window with unfixed window size
// When should we try to shrink the window? - when the window already contains
//  all the chars in the pattern. Because if the window does not have
//  all the chars, it is impossible that a smaller subarray within it can
//  have those.
// When should we stop shrinking the window? - when the windowSize === pattenSize
//  or the window is invalid (does not contain all the chars)
// How do we determine if the window is valid?
// - we need a hashmap toMatch to mark all the chars in the pattern and its frequencies.
// - we decrease the char's frequency everytime a char in the window is matched
//  ignore those are not in the map
//  increase the frequency when a matched char leaves the window
// - we also need an int matchedCnt to count the chars already matched in the window
//  update matchedCnt when toMatched[char] reached 0 or increased to 1 from 0
// - the window is valid when matchedCnt === Object.keys(toMatch).length
//
// Time: O(N + K)
// Space: O(K)

export const findSmallestSubstringContaining_r2 = (
  str: string,
  pattern: string
): string => {
  if (pattern.length > str.length) {
    return ''
  }
  const toMatch: Record<string, number> = {}
  for (let i = 0; i < pattern.length; i += 1) {
    if (toMatch[pattern[i]] === undefined) {
      toMatch[pattern[i]] = 0
    }
    toMatch[pattern[i]] += 1
  }
  const targetCnt = Object.keys(toMatch).length
  let resLeft = 0
  let resLen = Infinity
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
    while (matchedCnt === targetCnt) {
      // update the result when the window is valid
      if (right - left + 1 < resLen) {
        resLeft = left
        resLen = right - left + 1
      }
      // try shrinking the window when the window is valid
      const leftC = str[left]
      if (toMatch[leftC] !== undefined) {
        toMatch[leftC] += 1
      }
      if (toMatch[leftC] === 1) {
        matchedCnt -= 1
      }
      left += 1
    }
  }
  if (resLen === Infinity) {
    return ''
  }
  return str.slice(resLeft, resLeft + resLen)
}
