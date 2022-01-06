// https://www.educative.io/courses/grokking-the-coding-interview/qVZmZJVxPY0
//
// We should greedily extract the smallest rope each time and connect to the
//  next smallest until all ropes are connected.
// Hence, we can use a minHeap to store all the ropes.
// Everytime we pull out the top of the heap, connect it with the rope we already
//  have in hand, or the next smallest, and push the resultant rope into the heap
// Until the heap is empty
//
// Time: the cost to push all ropes into the heap is O(NlogN), everytime we insert
//  the resultant rope, the cost is O(logN), however we insert in at most N times
//  -- hence, bounded by O(NlogN)
// Space: O(N)

import { Heap } from 'typescript-collections'

export const minCostConnectRopes = (ropeLengths: number[]): number => {
  let cost = 0
  const minHeap = new Heap<number>((a, b) => b - a)
  ropeLengths.forEach((len) => {
    minHeap.add(len)
  })
  while (minHeap.size() > 1) {
    const heapTop = minHeap.removeRoot() as number
    const heapNextTop = minHeap.removeRoot() as number
    cost += heapTop + heapNextTop
    minHeap.add(cost)
  }
  return cost
}
