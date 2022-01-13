// https://www.educative.io/courses/grokking-the-coding-interview/Y5n0n3vAgYK
//
// In every iteration, we find the min of the k lists' heads, append it to the
//  merged list, move the min head to point to its next;
// In order to draw the min of k heads, use a minHeap to store the heads.
// Thus, in every iteration:
// - draw the root of the heap, append it to the head of the merged list
// - push the root.next into the heap if it is not null
// - move the merged list's head to its next
// until the heap is empty
//
// Time: heap size is K; maximum N times of popping and pushing into the heap
//   hence O(NlogK)
// Space: extra space is O(K)

import { ListNode } from '@src/dataStructure/ListNode'
import { Heap } from 'typescript-collections'

export const mergeList = (lists: (ListNode | null)[]): ListNode | null => {
  const minHeap = new Heap<ListNode>((a, b) => b.val - a.val)
  // init minHeap
  lists.forEach((list) => {
    if (list !== null) {
      minHeap.add(list)
    }
  })
  const dummyHead = new ListNode()
  let mergedHead = dummyHead
  while (minHeap.size() > 0) {
    const top = minHeap.removeRoot() as ListNode
    mergedHead.next = top
    mergedHead = mergedHead.next
    if (top.next !== null) {
      minHeap.add(top.next)
    }
  }
  return dummyHead.next
}
