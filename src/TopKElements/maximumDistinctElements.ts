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

//--- r1 ---//

// The removing strategy should be, for all the elements that are not unique, in each
//  iteration we should greedily remove the one with the smallest frequency --> trying
//  to make it unique.
// Thus, we first get the frequency of all elements in freqMap (hashmap), at the same
//  time, counting the number of distinct element.
// Then, push all elements which are not unique into the minHeap ordered by their freq.
// In each iteration, get the root of the heap, removing its freq. until k reaches 0
//  or the freq. reaches 1;
// Iterating until k === 0 or minHeap is empty
// If minHeap is empty and k > 0, we have no choice but to remove distinct elements
//  distinctCnt -= k
// NOTE that we can at most remove k elements, thus we do not need to push all into the
//  minHeap. Keep a minHeap of size K should be ok.
//
// Time: O(N + KlogK)
// Space: O(N)

export const maxDistinctElements_r1 = (nums: number[], k: number): number => {
  const freqMap: Record<number, number> = {}
  nums.forEach((num) => {
    if (freqMap[num] === undefined) {
      freqMap[num] = 0
    }
    freqMap[num] += 1
  })
  // [value, freq]
  const minHeap = new Heap<[number, number]>((a, b) => b[1] - a[1])
  let distinctCnt = 0
  Object.keys(freqMap).forEach((eleStr) => {
    const ele = parseInt(eleStr, 10)
    if (freqMap[ele] > 1) {
      // keep the the size k minHeap
      if (minHeap.size() < k) {
        minHeap.add([ele, freqMap[ele]])
      } else {
        const topFreq = (minHeap.peek() as [number, number])[1]
        if (freqMap[ele] < topFreq) {
          minHeap.add([ele, freqMap[ele]])
          minHeap.removeRoot()
        }
      }
    } else {
      distinctCnt += 1
    }
  })
  while (k > 0 && minHeap.size() > 0) {
    const top = minHeap.removeRoot() as [number, number]
    k -= top[1] - 1
    if (k >= 0) {
      distinctCnt += 1
    }
  }
  if (k > 0) {
    distinctCnt -= k
  }
  return distinctCnt
}
