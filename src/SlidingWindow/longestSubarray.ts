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

export const longestSubstringWithKDistinctChars = (
  str: string,
  k: number
): number => {
  const charFreq: Record<string, number> = {}
  let l = 0
  let r = 0
  let maxLen = 0
  for (r = 0; r < str.length; r++) {
    const rightChar = str[r]
    if (charFreq[rightChar] === undefined) {
      charFreq[rightChar] = 0
    }
    charFreq[rightChar] += 1
    while (Object.keys(charFreq).length > k) {
      // shrink
      const leftChar = str[l]
      charFreq[leftChar] -= 1
      if (charFreq[leftChar] === 0) {
        delete charFreq[leftChar]
      }
      l += 1
    }
    maxLen = Math.max(r - l + 1, maxLen)
  }
  return maxLen
}
