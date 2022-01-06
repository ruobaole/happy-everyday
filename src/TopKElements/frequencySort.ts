// https://www.educative.io/courses/grokking-the-coding-interview/gxZz615BPPG
//
// First we traverse the string and mark each char with its frequency in a hashmap freqMap.
// Then, push all the char with its frequency into a maxHeap (ordered by the frequency)
// At last, pop each char out and concatenate them into a string
//
// Time: O(DlogD) - D is the number of distinct chars; the inserting and removing root
//  of each char in the maxHeap takes O(logD)
// Space: O(N)

import { Heap } from 'typescript-collections'

type LetterFreq = {
  letter: string
  freq: number
}

export const frequentSort = (str: string): string => {
  const freqMap: Record<string, number> = {}
  for (let i = 0; i < str.length; i += 1) {
    if (freqMap[str[i]] === undefined) {
      freqMap[str[i]] = 0
    }
    freqMap[str[i]] += 1
  }
  const maxHeap = new Heap<LetterFreq>((a, b) => a.freq - b.freq)
  Object.keys(freqMap).forEach((letter) => {
    maxHeap.add({
      letter,
      freq: freqMap[letter]
    })
  })
  const resultArray: string[] = []
  while (maxHeap.size() > 0) {
    const top = maxHeap.removeRoot()
    if (top !== undefined) {
      for (let j = 0; j < top.freq; j += 1) {
        resultArray.push(top.letter)
      }
    }
  }
  return resultArray.join('')
}
