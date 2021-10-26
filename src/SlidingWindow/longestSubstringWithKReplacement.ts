// https://www.educative.io/courses/grokking-the-coding-interview/R8DVgjq78yR
//
// Use hashmap charFreq {} to record the char and its occuring frequency in the substring [l, r]
// We also need a variable maxFreq to remember the frequency of the most frequent char in the
//    substring [l, r] (no matter shrinking or not)
// We update maxFreq when some char c's frequency > maxFreq
// The substring is valid when the substirng length (i.e. the window size) - maxFreq <= k
// 1. move right rightwards 1 step each time, record str[right] in charFreq,
//    update maxFreq if charFreq[string[right]] > maxFreq
//    if windowSize - maxFreq > k -> the substring is invalid, we need to shrink
// 2. move left rightwards until the substring is valid
//    we don't need to update maxFreq when shrinking, because maxFreq is just the max occurence no
//    matter which char has this occurance -- meaning that all other char's occurence is less than
//    maxFreq. When shrinking, we cannot get better answer even though all these letters are moving
//    out of the window.
// 3. update maxLen to windowSize
//
// Time: O(N) - each char is examined only twice, and the examination (all these hashmap and updating
//    mostFreq take only O(1))

export const longestSubstringWithKReplacements = (
  str: string,
  k: number
): number => {
  const charFreq: Record<string, number> = {}
  let maxFreq = 0
  let l = 0
  let r = 0
  let maxLen = 0
  for (r = 0; r < str.length; r += 1) {
    const rightC = str[r]
    if (charFreq[rightC] === undefined) {
      charFreq[rightC] = 0
    }
    charFreq[rightC] += 1
    maxFreq = Math.max(maxFreq, charFreq[rightC])
    while (r - l + 1 - maxFreq > k) {
      // substring is invalid, move l to shrink the window
      const leftC = str[l]
      charFreq[leftC] -= 1
      if (charFreq[leftC] === 0) {
        delete charFreq[leftC]
      }
      // we don't need to update maxFreq actually
      l += 1
    }
    maxLen = Math.max(maxLen, r - l + 1)
  }
  return maxLen
}
