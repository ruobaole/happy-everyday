// https://www.educative.io/courses/grokking-the-coding-interview/gx6oKY8PGYY
//
// Observe that, if we have count the elements with their frequencies, to get the
//  max number of distinct elements, we should greedily remove elements from the
//  duplicated ones which has smaller frequencies.
// Thus, we can use a minHeap with size k, ordered by the frequency of the elements
//  to facilitate the greedy removing approach
// First, count all elements with their requencies and store in a hashmap
// Iterate the hashmap, count the distinctCnt, store top k duplicated elements as [number, number]
// Then, start removing from the minHeap; each time, remove the root element, removing
//  until the element has only one left, update k and distinctCnt (if needed)
// If k > 0, keep the removing process
// If the minHeap is empty and k > 0, we have to remove the unique elements, the distinctCnt
//  will be -= k
//
// Time: the minHeap has a max size of K, hence, the inserting of all its element takes at most
//  O(NlogK); the removing element process calls for k rounds of removing from the minHeap, which
//  takes O(KlogK)
//  hence, bounded by O(NlogK + KlogK)
// Space: the hashmap takes O(D) space -- D is the number of distinct elements

import { Heap } from 'typescript-collections'

export const maxDistinctElements = (nums: number[], k: number): number => {
  const freqMap: Record<number, number> = {}
  // 1. count the elements' frequencies
  nums.forEach((num) => {
    if (freqMap[num] === undefined) {
      freqMap[num] = 0
    }
    freqMap[num] += 1
  })
  // 2. push the top k elements with smallest frequencies as [number, number]
  const minHeap = new Heap<[number, number]>((a, b) => b[1] - a[1])
  let cnt = 0
  Object.keys(freqMap).forEach((eleStr) => {
    const ele = +eleStr
    if (freqMap[ele] === 1) {
      cnt += 1
    } else {
      minHeap.add([ele, freqMap[ele]])
      if (minHeap.size() > k) {
        // size is k+1
        minHeap.removeRoot()
      }
    }
  })
  // 3. greedily removing k elements
  while (k > 0 && minHeap.size() > 0) {
    const top = minHeap.removeRoot() as [number, number]
    const freq = top[1]
    k -= freq - 1
    if (k >= 0) {
      cnt += 1
    }
  }
  if (k > 0) {
    cnt -= k
  }
  return cnt
}
