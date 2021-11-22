// https://www.educative.io/courses/grokking-the-coding-interview/mErolRNQ00R
//
// preprocess k; k = k % n; counting k nodes from the end, move it to the front;
// when moving the sublist in front, below are the nodes we are insterested in:
//  - sublist's prev; sublist's tail

import { Node } from '@src/SlowFastPointers/startOfLinkedListCycle'

export const rotateRightKNodes = (
  head: Node | null,
  k: number
): Node | null => {
  // 1. find length of the list
  let n = 0
  let cur = head
  while (cur) {
    cur = cur.next
    n += 1
  }
  k = k % n
  // 2. find the sublist
  const dummyHead = new Node(0)
  dummyHead.next = head
  let prev: Node | null = dummyHead
  cur = head
  let i = 0
  while (cur && i < k - 1) {
    cur = cur.next
    i += 1
  }
  while (prev && cur && cur.next) {
    prev = prev.next
    cur = cur.next
  }
  // now cur is the sublist's tail; prev is the node previous to the sublist
  if (prev && cur) {
    const oldHead = head
    head = prev.next
    prev.next = null
    cur.next = oldHead
  }
  return head
}
