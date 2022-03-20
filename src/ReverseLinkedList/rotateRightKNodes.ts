// https://www.educative.io/courses/grokking-the-coding-interview/mErolRNQ00R
//
// preprocess k; k = k % n; counting k nodes from the end, move it to the front;
// when moving the sublist in front, below are the nodes we are insterested in:
//  - sublist's prev; sublist's tail

import { Node } from './../SlowFastPointers/startOfLinkedListCycle'

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

//--- r2 ---//
//
// 1. get the list's length - n and preprocess k = k % n
// 2. count k nodes from the end - sublist2
// 3. link sublist2's head with the original head
//   sublist1's tail links to null
// These're the nodes we're interested in --
// - originial head
// - first part tail
// - second part head
// - second part tail

export function rightRotateK(head: Node | null, k: number): Node | null {
  // 1. get the list's length
  let n = 0
  let cur = head
  while (head) {
    n += 1
    cur = cur.next
  }
  k = k % n
  // 2. get the second part
  const dummyHead = new Node(-1)
  dummyHead.next = head
  let prev = dummyHead
  cur = head
  let secondTail = cur
  while (k > 1 && secondTail) {
    secondTail = secondTail.next
    k -= 1
  }
  while (secondTail && secondTail.next) {
    secondTail = secondTail.next
    cur = cur.next
    prev = prev.next
  }
  const firstTail = prev
  const secondHead = cur
  // 3. link the second part back with the first part
  secondTail.next = head
  firstTail.next = null
  return secondHead
}
