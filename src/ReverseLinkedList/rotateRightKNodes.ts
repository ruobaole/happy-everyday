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

// review practices //

// 1. preprocess k; k = k % n
// 2. count k nodes from the bottom of the list - sublist
// 3. move the sublist to the head, link it with the firstPart
// below are the nodes of interests:
//  - firstPartHead (the old head)
//  - firstPartTail
//  - sublist head
//  - sublist tail
// these can be generated while we're counting nodes

export const rotateRightKNodes_r1 = (
  head: Node | null,
  k: number
): Node | null => {
  // 1. get the length of the list
  let n = 0
  let cur = head
  while (cur) {
    cur = cur.next
    n += 1
  }
  k = k % n

  // cur is the sublistTail
  cur = head
  const firstPartHead = head
  const dummyHead = new Node(0)
  dummyHead.next = head
  let prev: Node = dummyHead
  let i = 0
  while (cur && i < k - 1) {
    cur = cur.next
    i += 1
  }
  while (prev && prev.next && cur && cur.next) {
    prev = prev.next
    cur = cur.next
  }
  const sublistTail = cur
  const firstPartTail = prev
  const sublistHead = prev
  if (sublistTail) {
    sublistTail.next = firstPartHead
  }
  if (firstPartTail) {
    firstPartTail.next = null
  }
  return sublistHead
}
