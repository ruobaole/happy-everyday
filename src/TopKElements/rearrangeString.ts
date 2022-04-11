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
    // 4. update prev
    prevChar = cur.char
    prevFreq = cur.freq
  }
  if (prevChar && prevFreq > 0) {
    // we have to put same letters adjacently
    return ''
  }
}

//--- r1 ---//

// We should get the frequency of all chars, and iteratively pull out the
//  one with the largest frequency and put it in the resulting string.
// Hence, we need a maxHeap ordered by the chars' frequency.
// Each time, we remove the root of the heap, decrease its frequency.
// In order not to get the same chars next to each other, we should not put
//  the popped element back in this iteration, but to temp mark it in prev
//  and add it back in the next iteration, after pulling out the next root.
// If when the heap is empty, prev is not empty -> we know that we have no
//  choice but have to the same elements together -> return ""
//
// Time: O(N + NlogD) D is the distinct element cnt
// Space: O(N)

type CharPair = {
  char: string
  freq: number
}

export const rearrangeString_r1 = (str: string): string => {
  const freqMap: Record<string, number> = {}
  for (let i = 0; i < str.length; i += 1) {
    if (freqMap[str[i]] === undefined) {
      freqMap[str[i]] = 0
    }
    freqMap[str[i]] += 1
  }
  const maxHeap = new Heap<CharPair>((a, b) => a.freq - b.freq)
  Object.keys(freqMap).forEach((char) => {
    maxHeap.add({
      char,
      freq: freqMap[char]
    })
  })
  const resArray: string[] = []
  let prev: CharPair | null = null
  while (maxHeap.size() > 0) {
    const top = maxHeap.removeRoot() as CharPair
    resArray.push(top.char)
    top.freq -= 1
    if (prev) {
      maxHeap.add(prev)
    }
    if (top.freq > 0) {
      prev = top
    }
  }
  if (prev) {
    return ''
  }
  return resArray.join('')
}

//--- r2 ---//
//
// In each itereation, we should geedily take the char with the largest
//  frequency, append it to the string;
// To avoid putting same chars next to each other, we hold the char we've just
//  appended to the string temporarily, add it back to the heap until we've put
//  the char after it;
// Hence, we first get the frequencies of all chars and store the char along with
//  their frequencies in a maxHeap;
// Everytime, remove the root the heap, append it to the string, decrease its frequency;
// If prev exists, push prev back to the heap;
// If the newly pulled out root's frequency is not 0, store it in prev;
// If the heap is empty when prev exists -- meaning that we have no choice but to put same
//  chars next to each other -- return ""
//
// Time: O(NlogK) -- K is the number of distinct chars, i.e. the size of the heap;
//  N iteration of popping from the heap to construct the string
// Space: O(K)

interface CharFreq {
  char: string
  freq: number
}

export function rearrangeString_r2(str: string): string {
  const maxHeap = new Heap<CharFreq>((a, b) => a.freq - b.freq)
  const freqMap: Record<string, number> = {}
  for (let i = 0; i < str.length; i += 1) {
    if (freqMap[str[i]] === undefined) {
      freqMap[str[i]] = 0
    }
    freqMap[str[i]] += 1
  }
  Object.entries(freqMap).forEach(([char, freq]) => {
    maxHeap.add({ char, freq })
  })
  const resultString: string[] = []
  let prev: CharFreq | null = null
  while (maxHeap.size() > 0) {
    const top = maxHeap.removeRoot()
    resultString.push(top.char)
    top.freq -= 1
    if (prev) {
      maxHeap.add(prev)
    }
    if (top.freq > 0) {
      prev = top
    }
  }
  if (prev) {
    // same chars have to be next to each other
    return ''
  }
  return resultString.join('')
}
