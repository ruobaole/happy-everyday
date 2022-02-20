// https://www.educative.io/courses/grokking-the-coding-interview/N8nMBvDQJ0m
//
// There's no left right sliding window solution.
// Actually we have to do i, j iteration.
//   - i is the starting of the substring [0, str.length - targetlen + 1)
//   - j is the word pointer in the substring
//   for each i, using j to iterate through all K words in the substring
//   if we encounter a word not in the given list, break loop
//   keep record of the freq of the word we've seen in wordSeen{}, if wordSeen[word] > wordFreq[word]
//     the word appears to much time -- break loop
//   res.push(i) if j reached words.length without breaking out the loop
//
//
// Time: O(N * M * k) M - length of each word in words, K - num of words

// export const findWordsConcatenation = (
//   str: string,
//   words: string[]
// ): number[] => {
//   const res: number[] = []
//   if (words.length === 0 || (words.length > 0 && words[0].length === 0)) {
//     return res
//   }
//   const M = words[0].length
//   const targetLen = words.length * M
//   const matchFreq: Record<string, number> = {}
//   words.forEach((w) => {
//     if (matchFreq[w] === undefined) {
//       matchFreq[w] = 0
//     }
//     matchFreq[w] += 1
//   })
//   for (let i = 0; i < str.length - targetLen + 1; i += 1) {
//     const wordSeen: Record<string, number> = {}
//     let j = 0
//     for (j = 0; j < words.length; j += 1) {
//       const word = str.substring(i + j * M, i + j * M + M)
//       if (matchFreq[word] === undefined) {
//         break
//       }
//       if (wordSeen[word] === undefined) {
//         wordSeen[word] = 0
//       }
//       wordSeen[word] += 1
//       if (wordSeen[word] > (matchFreq[word] || 0)) {
//         break
//       }
//     }
//     if (j === words.length) {
//       res.push(i)
//     }
//   }

//   return res
// }

// review practices //

// This is similar to 'find anagrams' if we treat each words as a letter in 'anagrams'.
// Say: length of words in the given words[] -- wordSize; we can skip wordSize each time when moving
//   left or right
// Use a hashmap wordFreq{} to record words in the subarray and their frequencies
// Use a number matchedCnt to remember the number of words we have matched within our subarray
// We know that the subarray is a concatenation (i.e. is valid) when
//  matchedCnt === words.length && windowSize = words.length * wordSize
// The process:
// 1. init wordsSet{} -- a hashmap containing words in words[]
// 2. move right rightwards, from 0 to str.length - wordSize, wordSize by each step (at the starting of each word)
//  update wordFreq[rightW] += 1
//  update matchedCnt:
//   if rightW in wordsSet && rightW not in wordFreq: matchedCnt += 1
//   else if rightW alread in wordFreq: matchedCnt -= 1
//  if windowSize > words.length * wordSize -> smaller substring could be valid, search by moving left
// 3. how to move left -- righwards, wordSize each step
//  update wordFreq[leftW] -= 1
//  update matchedCnt:
//    if leftW in wordsSet && wordFreq[leftW] === 1: matchedCnt += 1
//    if leftW in wordsSet && wordFreq[leftW] === 0: matchedCnt -= 1
//  stop moving left when windowSize === targetSize
// 4. now, see if the substring is valid by seeing if
//  matchedCnt === words.length
//  if valid: push left in result
//
// Time:
//   - we see each 'words' in the string at most twice - O(K) (K -- number of words)
//   - to get a 'word' from the string -- get substring with fixed length - O(wordSize)
//   - to match a word in the hashmap -- O(1)
//   O(N * wordSize) --> O(N)

export const findWordsConcatenation = (
  str: string,
  words: string[]
): number[] => {
  // Assume that words contains no duplicate element
  const result: number[] = []
  if (words.length === 0 || (words.length > 0 && words[0].length === 0)) {
    return result
  }
  const wordSize = words[0].length
  const targetLen = wordSize * words.length
  const wordsSet: Record<string, number> = {}
  const wordFreq: Record<string, number> = {}
  let matchedCnt = 0
  let l = 0
  let r = 0
  // init wordsSet
  words.forEach((w) => {
    wordsSet[w] = 1
  })
  for (r = 0; r < str.length - wordSize; r += wordSize) {
    const rightW = str.slice(r, r + wordSize)
    if (wordFreq[rightW] === undefined) {
      wordFreq[rightW] = 0
    }
    wordFreq[rightW] += 1
    if (rightW in wordsSet && wordFreq[rightW] === 1) {
      matchedCnt += 1
    } else if (rightW in wordsSet && wordFreq[rightW] > 1) {
      matchedCnt -= 1
    }
    while (r + wordSize - 1 - l + 1 > targetLen) {
      // the substring is longer than target
      const leftW = str.slice(l, l + wordSize)
      wordFreq[leftW] -= 1
      if (leftW in wordsSet && wordFreq[leftW] === 1) {
        matchedCnt += 1
      } else if (leftW in wordsSet && wordFreq[leftW] === 0) {
        matchedCnt -= 1
      }
      l += wordSize
    }
    // now the windowSize === target length
    if (matchedCnt === words.length) {
      result.push(l)
    }
  }
  return result
}

//--- r2 ---//

// Sliding window with fixed size
// Because all the words have the same length, we can regard each word as a
//  character -- thus, the problem is tranformed into 'find anagram' problem.
// Use a hashmap toMatch to mark each word and its frequency in the words array
// Also keep an int matchedCnt to count the unique word we have matched
// We know that the window is valid when matchedCnt === Object.keys(toMatch).length
// The window need to be fixed size, thus we shrink when window when the windowSize >
//   targetSize
// Also, we stop shrinking when the windowSize is valid
// Now, when the windowSize is valid, check the matchedCnt to see if the window is a
//  valid concatenate
//
// Time: O(N*W + K) -- W is the word length, we assume that to check if 2 words are the same
//  needs O(W) time
// Space: O(K) the hashmap's size

export const findWordsConcatenation_r2 = (
  str: string,
  words: string[]
): number[] => {
  // Assume that words contains no duplicate words
  const result: number[] = []
  if (words.length === 0) {
    return result
  }
  if (words[0].length === 0) {
    return result
  }
  const W = words[0].length
  const targetLen = words.length * W
  const toMatch: Record<string, number> = {}
  words.forEach((word) => {
    if (toMatch[word] === undefined) {
      toMatch[word] = 0
    }
    toMatch[word] += 1
  })
  let left = 0
  let matchedCnt = 0
  const targetCnt = Object.keys(toMatch).length
  for (let right = 0; right < str.length - W + 1; right += 1) {
    const rightW = str.slice(right, right + W)
    if (toMatch[rightW] !== undefined) {
      toMatch[rightW] -= 1
    }
    if (toMatch[rightW] === 0) {
      matchedCnt += 1
    }
    while (right + W - 1 - left + 1 > targetLen) {
      // shrink the window to keep the window size fixed
      const leftW = str.slice(left, left + W)
      if (toMatch[leftW] !== undefined) {
        toMatch[leftW] += 1
      }
      if (toMatch[leftW] === 1) {
        matchedCnt -= 1
      }
      left += 1
    }
    if (right + W - 1 - left + 1 === targetLen && matchedCnt === targetCnt) {
      result.push(left)
    }
  }
  return result
}
