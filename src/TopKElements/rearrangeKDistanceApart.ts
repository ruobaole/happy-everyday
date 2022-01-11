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

//--- r1 ---//

// Count each char's frequency. At each time, we should greedily pull out the
//  char with the largest freq and append it into the resultStr.
// Hence, we use a maxHeap to store the char with their freq.
// In order to separate duplicate chars k distance apart. We should not add the
//  top back each time we remove the root of the heap.
// But have to wait until k-1 iterations
// Thus, we use a queue to serve as the waiting list.
// Each time a root is removed, push it to the queue.
// If the queue's size reaches k --> pop out the front and push it back to the
//  the heap.
// At last when the heap is empty, if the queue size is not empty, we know that
//  there're no way we should separate duplicate elements k distance apart ->
//  return ''
// TRICKY: the tricky part is that, when the root's frequency will be decreased to 0
//  after appending it to the result, should we push it to the queue?
// - Yes! the actual meaning of the queue is the "last added k-1 elements"; if we do
//  not push it, another element after it will have to wait one more iteration while
//  it is in fact k ditance apart from the former one
//
// Time: O(N + NlogD)
// Space: O(N)

type CharPair = {
  char: string
  freq: number
}

export const rearrangeKDistanceApart_r1 = (str: string, k: number): string => {
  const charFreq: Record<string, number> = {}
  for (let i = 0; i < str.length; i += 1) {
    if (charFreq[str[i]] === undefined) {
      charFreq[str[i]] = 0
    }
    charFreq[str[i]] += 1
  }
  const maxHeap = new Heap<CharPair>((a, b) => a.freq - b.freq)
  Object.keys(charFreq).forEach((char) => {
    maxHeap.add({ char, freq: charFreq[char] })
  })
  const resArray: string[] = []
  const queue: CharPair[] = []
  while (maxHeap.size() > 0) {
    const top = maxHeap.removeRoot() as CharPair
    top.freq -= 1
    // TRICKY: Once we've added a char into the resArray
    // we should push it into the queue to say that it has
    // exist before the cur top
    queue.push(top)
    resArray.push(top.char)
    if (queue.length === k) {
      const front = queue.shift() as CharPair
      if (front.freq > 0) {
        maxHeap.add(front)
      }
    }
  }
  // TRICKY: now the queue could contain eleements with 0 freq
  if (resArray.length < str.length) {
    return ''
  }
  return resArray.join('')
}
