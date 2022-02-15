// https://www.educative.io/courses/grokking-the-coding-interview/YQQwQMWLx80
//
// Longest Substring with maximum K Distinct Characters (medium)
// - Assuming, K > 0
//
// Using a hashmap to store chars within the substring and its frequency. Delete key-value when
// value === 0. Thus, the length of the hashmap.keys should be the number of distinct chars in the substring.
// 1. start by expanding the rightside of the window until the distinctNumOfChar in the substring is
//   larger than k --> candidate length = l - r
// 2. no substrings starting from l can be longer than the current substring and be valid at the same
//   time. Thus, we start to permulate substrings starting from somewhere between (l, r)
//   ---- i.e. now begin to shrink the substring by moving l, until the distinctNumOfChar <= k
//   ---- this is a potential starting point.
// 3. continue to move the window rightwards, in each step, do the above 2 steps.
//
// Time: O(N) -- because each elements are inspected only twice. the manipulate of hashmap is O(1)
// Space: O(N)

// export const longestSubstringWithKDistinctChars = (
//   str: string,
//   k: number
// ): number => {
//   const charFreq: Record<string, number> = {}
//   let l = 0
//   let r = 0
//   let maxLen = 0
//   for (r = 0; r < str.length; r++) {
//     const rightChar = str[r]
//     if (charFreq[rightChar] === undefined) {
//       charFreq[rightChar] = 0
//     }
//     charFreq[rightChar] += 1
//     while (Object.keys(charFreq).length > k) {
//       // shrink
//       const leftChar = str[l]
//       charFreq[leftChar] -= 1
//       if (charFreq[leftChar] === 0) {
//         delete charFreq[leftChar]
//       }
//       l += 1
//     }
//     maxLen = Math.max(r - l + 1, maxLen)
//   }
//   return maxLen
// }

//--- r2 ---//

// Sliding window with window size unfixed
// 1. expand the window
// move right one step each time
// use hashmap charFreq to mark the chars in the window and their frequencies.
// update charFreq for str[right]
// if Object.keys(charFreq).length > k --> the window is invalid --> try shrink the window
// 2. shrink the window to valid
// move left while Object.keys(charFreq).length > k (i.e. window is invalid)
// update charFreq for str[left]
//   if charFreq[str[left]] === 0, delete charFreq[str[left]]
// 3. update maxLen after shinking the window (now the window is valid)
//
// Time: O(N)
// Space: O(1)

export function longestSubstringWithKDistinctChars_r2(
  str: string,
  k: number
): number {
  if (k <= 0 || str.length < k) {
    return 0
  }
  const charFreq: Record<string, number> = {}
  let maxLen = 0
  let left = 0
  for (let right = 0; right < str.length; right += 1) {
    const rChar = str[right]
    if (charFreq[rChar] === undefined) {
      charFreq[rChar] = 0
    }
    charFreq[rChar] += 1
    while (Object.keys(charFreq).length > k) {
      // shrink the window to valid
      const lChar = str[left]
      charFreq[lChar] -= 1
      if (charFreq[lChar] === 0) {
        delete charFreq[lChar]
      }
      left += 1
    }
    maxLen = Math.max(right - left + 1, maxLen)
  }
  return maxLen
}
