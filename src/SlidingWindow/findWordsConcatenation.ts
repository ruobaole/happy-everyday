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

export const findWordsConcatenation = (
  str: string,
  words: string[]
): number[] => {
  const res: number[] = []
  if (words.length === 0 || (words.length > 0 && words[0].length === 0)) {
    return res
  }
  const M = words[0].length
  const targetLen = words.length * M
  const matchFreq: Record<string, number> = {}
  words.forEach((w) => {
    if (matchFreq[w] === undefined) {
      matchFreq[w] = 0
    }
    matchFreq[w] += 1
  })
  for (let i = 0; i < str.length - targetLen + 1; i += 1) {
    const wordSeen: Record<string, number> = {}
    let j = 0
    for (j = 0; j < words.length; j += 1) {
      const word = str.substring(i + j * M, i + j * M + M)
      if (matchFreq[word] === undefined) {
        break
      }
      if (wordSeen[word] === undefined) {
        wordSeen[word] = 0
      }
      wordSeen[word] += 1
      if (wordSeen[word] > (matchFreq[word] || 0)) {
        break
      }
    }
    if (j === words.length) {
      res.push(i)
    }
  }

  return res
}
