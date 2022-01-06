// https://www.educative.io/courses/grokking-the-coding-interview/xV7wx4o8ymB
//
// IDEA: if we already have all letters with their frequencies in a freqMap,
//  we just need to greedily take out the letter with the largest frequency and
//  append it to the rearranged string;
// Thus, we first get the freqMap, and then use a maxHeap to store letters with
//  their frequencies.
// 1. in order not to put same letters next to each other, in each step, after
//  remove the root and appending the letter, we wait until the end of next
//  iteration to add the letter back to the heap
// 2. When the heap is empty, if the letter we have in hand is not empty, we know
//  that we ended up having to put same letters together -> cannot be rearranged
//
// Time: the size of the maxHeap is at most O(logD) -- D number of unique letters
//  at most N iteration of removing root and pushing into the heap --
//  thus, O(NlogD)
// Space: O(N)

import { Heap } from 'typescript-collections'

interface CharFreq {
  char: string
  freq: number
}

export const rearrangeString = (str: string): string => {
  if (str.length === 0) {
    return ''
  }
  const freqMap: Record<string, number> = {}
  for (let i = 0; i < str.length; i += 1) {
    if (freqMap[str[i]] === undefined) {
      freqMap[str[i]] = 0
    }
    freqMap[str[i]] += 1
  }
  const maxHeap = new Heap<CharFreq>((a, b) => a.freq - b.freq)
  Object.keys(freqMap).forEach((char) => {
    maxHeap.add({ char, freq: freqMap[char] })
  })
  let prevChar: string | null = null
  let prevFreq = 0
  const resultArray: string[] = []
  while (maxHeap.size() > 0) {
    // 1. greedily extract the most frequent one
    const cur = maxHeap.removeRoot() as CharFreq
    // 2. add back the prev one if the frequency is larger than 0
    if (prevChar && prevFreq > 0) {
      maxHeap.add({
        char: prevChar,
        freq: prevFreq - 1
      })
    }
    // 3. append to result
    resultArray.push(cur.char)
    // 4. update prev
    prevChar = cur.char
    prevFreq = cur.freq
  }
  if (prevChar && prevFreq > 0) {
    // we have to put same letters adjacently
    return ''
  }
  return resultArray.join('')
}
