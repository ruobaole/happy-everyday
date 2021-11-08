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
