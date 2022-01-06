// https://www.educative.io/courses/grokking-the-coding-interview/m2E4y26k3LE
//
// The problem is similar to problem "rearrange string".
// The only difference is that we should arrange the same chars k distance
// apart.
// We can follow the same greedy approach to append the char with the most
//  frequency in each step.
// However, we do not directly add the char in the previous iteration back to
//  the maxHeap. Instead, we use a queue to store these chars and wait until
//  k iterations to add the front of the queue back
//  i.e when the queue.length === k
//
// Time: heap size at most D, N iteration of removing root and adding back
// hence, O(NlogD)
// Space: O(N)

import { Heap } from 'typescript-collections'

interface CharFreq {
  char: string
  freq: number
}

export const rearrangeKDistanceApart = (str: string, k: number): string => {
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
  const queue: CharFreq[] = []
  const resultArray: string[] = []
  while (maxHeap.size() > 0) {
    const cur = maxHeap.removeRoot() as CharFreq
    resultArray.push(cur.char)
    cur.freq -= 1
    queue.push(cur)
    if (queue.length === k) {
      const prev = queue.shift() as CharFreq
      if (prev.freq > 0) {
        maxHeap.add(prev)
      }
    }
  }
  if (resultArray.length === str.length) {
    return resultArray.join('')
  }
  return ''
}
