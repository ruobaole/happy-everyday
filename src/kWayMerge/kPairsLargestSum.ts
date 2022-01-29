// https://www.educative.io/courses/grokking-the-coding-interview/B1JKxRB8EDJ
//
// The basic process is to 1) find all candidate pairs, insert in a heap ordered
//   by its sum; 2) get the k largest pairs.
// To optimize the process, we need to find better way to get these pairs.
// Draw the two arrays in a matrix, L1 as x and L2 as y.
// We can see that the largest must be the top left corner, from that, every time
//   we pull out a pair, the next possible ones should be its right or bottom neighbors.
// Hence, we can keep a maxHeap inited with the top left cell.
// Everytime we pull out the root of the heap, we push in its right and bottom neighbors.
// NOTE that some neighbors would be repeatedly pushed -- to solve that, we can use a
//   hashmap to record the cells already in the heap OR pulled
// Keep pulling the heap's top until we've got k pairs.
//
// Time: the heap's size is at most 3; number of iteration is k
//  O(klog3)
// Space: O(K + K) -- the hashmap's size is K+3 at last

import { Heap } from 'typescript-collections'

export const findKLargestPairs = (
  nums1: number[],
  nums2: number[],
  k: number
): number[][] => {
  // [sum, idx1, idx2]
  const maxHeap = new Heap<[number, number, number]>((a, b) => a[0] - b[0])
  const result: number[][] = []
  if (nums1.length > 0 && nums2.length > 0) {
    maxHeap.add([nums1[0] + nums2[0], 0, 0])
  }
  // [idx1, idx2]
  const memoSet = new Set<[number, number]>()
  while (k > 0 && maxHeap.size() > 0) {
    const top = maxHeap.removeRoot() as [number, number, number]
    const idx1 = top[1]
    const idx2 = top[2]
    result.push([nums1[idx1], nums2[idx2]])
    k -= 1
    // 1. try to add in the right neighbor
    if (idx1 + 1 < nums1.length && !memoSet.has([idx1 + 1, idx2])) {
      maxHeap.add([nums1[idx1 + 1] + nums2[idx2], idx1 + 1, idx2])
      memoSet.add([idx1 + 1, idx2])
    }
    // 2. try to add in the bottom neighbor
    if (idx2 + 1 < nums2.length && !memoSet.has([idx1, idx2 + 1])) {
      maxHeap.add([nums1[idx1] + nums2[idx2 + 1], idx1, idx2 + 1])
      memoSet.add([idx1, idx2 + 1])
    }
  }

  return result
}

//--- r1 ---//

// Imagine if we put all pairs in a matrix, while row is idx in L1 and col
//  being indices in L2.
// The pair with the largest sum must be the top left corner.
// The 2nd largest is either the top's right or bottom neighbor.
// The 3rd largest is either the 2nd largest's right or bottom neighbor.
// Hence, best-first-search with a maxHeap (ordered by the pair's sum)
// We start by initial the heap with the top left corner.
// In each iteration, pull out the root, add in its right and bottom neighbor
//  if exists.
// Keep counting, when cnt === k. The root should be the k-th largest.
// NOTE that while adding in the right and bottom neighbor, we could add duplicate
//  pairs.
// To avoid that, we can use a hashset to store the [row, col] indices we've already
//  added or pulled.
// The size of this hashset is at most O(k + 2) at last -- because it marks pairs
//  either pulled out from the heap (which is k) or still in the heap (which is 2)
//
// Time: O(klog2) -- the size of the heap is at most 2
// Space: (k + 2 + 2) -- the size of the heap and hashset

type Pair = {
  n1: number
  n2: number
  sum: number
  idx1: number
  idx2: number
}

export const findKLargestPairs_r1 = (
  nums1: number[],
  nums2: number[],
  k: number
): number[][] => {
  const result: number[][] = []
  if (k <= 0 || nums1.length === 0 || nums2.length === 0) {
    return result
  }
  const maxHeap = new Heap<Pair>((a, b) => a.sum - b.sum)
  const memoSet = new Set<Pair>()
  const topleft: Pair = {
    n1: nums1[0],
    n2: nums2[0],
    sum: nums1[0] + nums2[0],
    idx1: 0,
    idx2: 0
  }
  maxHeap.add(topleft)
  memoSet.add(topleft)
  while (maxHeap.size() > 0 && result.length < k) {
    const top = maxHeap.removeRoot() as Pair
    // push into result
    result.push([top.n1, top.n2])
    // try add in right neighbor
    if (top.idx1 + 1 < nums1.length) {
      const right: Pair = {
        n1: nums1[top.idx1 + 1],
        n2: top.n2,
        sum: nums1[top.idx1 + 1] + top.n2,
        idx1: top.idx1 + 1,
        idx2: top.idx2
      }
      if (!memoSet.has(right)) {
        maxHeap.add(right)
      }
    }
    // try add in bottom neighbor
    if (top.idx2 + 1 < nums2.length) {
      const bottom: Pair = {
        n1: top.idx1,
        n2: nums2[top.idx2 + 1],
        sum: top.idx1 + nums2[top.idx2 + 1],
        idx1: top.idx1,
        idx2: top.idx2 + 1
      }
      if (!memoSet.has(bottom)) {
        maxHeap.add(bottom)
      }
    }
  }
  return result
}
