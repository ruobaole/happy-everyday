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

// export const longestSubstringWithKReplacements = (
//   str: string,
//   k: number
// ): number => {
//   const charFreq: Record<string, number> = {}
//   let maxFreq = 0
//   let l = 0
//   let r = 0
//   let maxLen = 0
//   for (r = 0; r < str.length; r += 1) {
//     const rightC = str[r]
//     if (charFreq[rightC] === undefined) {
//       charFreq[rightC] = 0
//     }
//     charFreq[rightC] += 1
//     maxFreq = Math.max(maxFreq, charFreq[rightC])
//     while (r - l + 1 - maxFreq > k) {
//       // substring is invalid, move l to shrink the window
//       const leftC = str[l]
//       charFreq[leftC] -= 1
//       if (charFreq[leftC] === 0) {
//         delete charFreq[leftC]
//       }
//       // we don't need to update maxFreq actually
//       l += 1
//     }
//     maxLen = Math.max(maxLen, r - l + 1)
//   }
//   return maxLen
// }

// review practices //

// Use a hashmap charFreq{} to record the chars and their frequencies within the subarray.
// We also need to record the frequency of the most frequent char within the subarray (we don't actually
//   care which char is the most frequent one)
// We know the subarray is valid when windowSize - maxFreq <= k
// Every time, don't forget to update the both records
// 1. move right rightwards, 1 by each step
//   charFreq[rightC] += 1
//   maxFreq = max(maxFreq, charFreq[rightC])
//   if the subarray is invalid, move left until the subarray is again valid
// 2. how to move left? -- rightwards while updating charFreq{} and maxFreq
//   charFreq[leftC] -= 1
//   maxFreq = max(maxFreq, charFreq[leftC])
//   break until the subarray is valid
// 3. Once valid -- update maxLen
//
// Time: O(N)

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
      const leftC = str[l]
      charFreq[leftC] -= 1
      maxFreq = Math.max(maxFreq, charFreq[leftC])
      l += 1
    }
    maxLen = Math.max(maxLen, r - l + 1)
  }
  return maxLen
}

//--- r2 ---//

// Keep a record of the frequncy of the most frequent occured char
//  in the window -- maxFreq
// No matter what char it is, we know that the window is valid if
//  windowLen - maxFreq <= k
// We also need a hashmap charFreq to mark the char in the window and their
//  frequencies so that we can update maxFreq.
// 1. try expand the window
// move right one step each time
// update charFreq
// update maxFreq if charFreq[char] > maxFreq
// if windowLen - maxFreq > k, the window is invalid, we need to shrink it
// 2. shrink the window to make it valid
// move left
// update charFreq and maxFreq
// stop when the window is valid
// 3. the window now is valid, update maxLen
//
// Time: O(N)
// Space: O(N) -- maximum k elements in the hashmap if we do not clear those
// with 0 frequencies

export function longestSubstringWithKReplacements_r2(
  str: string,
  k: number
): number {
  if (k <= 0) {
    return 0
  }
  let maxLen = 0
  let maxFreq = 0
  const charFreq: Record<string, number> = {}
  let left = 0
  for (let right = 0; right < str.length; right += 1) {
    const rightC = str[right]
    if (charFreq[rightC] === undefined) {
      charFreq[rightC] = 0
    }
    charFreq[rightC] += 1
    maxFreq = Math.max(maxFreq, charFreq[rightC])
    while (right - left + 1 - maxFreq > k) {
      // the window is invalid
      const leftC = str[left]
      charFreq[leftC] -= 1
      // actually maxFreq will never be updated before the window
      // is valid again
      // Thus, we do not need to update maxFreq
      maxFreq = Math.max(maxFreq, charFreq[leftC])
      left += 1
    }
    maxLen = Math.max(maxLen, right - left + 1)
  }
  return maxLen
}
