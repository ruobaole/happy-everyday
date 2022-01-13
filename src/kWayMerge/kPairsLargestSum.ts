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
