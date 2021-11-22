// https://www.educative.io/courses/grokking-the-coding-interview/qVANqMonoB2
//
// 1. init prev = null, cur = head; skip p-1 nodes to move prev and cur together.
//  now: prev - the tail of the first part; cur - tail of the sublist;
// 2. reverse sublist headed at cur
//  keep a counter i; i inited to 0; keep reversing the consecutive nodes until
//  cur === null || i >= q - p + 1
//  after reversing: prev - the newHead of the reversed sublist;
//  cur - the head of the 3rd part
// 3. now we need to link the 1st part, the reversed sublist and the 3rd part
//  NOTE that we should check if tailOf1stPart === null
//  tailOf1stPart.next = prev
//  tailOfSublist.next = cur
//  return head
//
// Time: O(N)

import { Node } from '@src/SlowFastPointers/startOfLinkedListCycle'

export const reverseSublist = (
  head: Node | null,
  p: number,
  q: number
): Node | null => {
  let prev: Node | null = null
  let cur = head
  let tmp = head
  let i = 0
  // 1. skip the first p-1 nodes
  while (i < p - 1 && cur) {
    prev = cur
    cur = cur.next
    i += 1
  }
  const tailOf1stPart = prev
  const tailOfSublist = cur
  // 2. reverse the sublist
  i = 0
  while (cur && i < q - p + 1) {
    tmp = cur.next
    cur.next = prev
    prev = cur
    cur = tmp
    i += 1
  }
  // now prev is the newHead; cur is the head of the 3rd part;
  // if the first part contains 0 nodes (p is 1)
  if (tailOf1stPart === null) {
    head = prev
  } else {
    tailOf1stPart.next = prev
  }
  if (tailOfSublist) {
    tailOfSublist.next = cur
  }
  return head
}

// Similar Questions
// Reverse the First K Elements
// 1. init prev = null, cur = head
// 2. reverse while counting i
// 3. break when cur === null || i === k - 1
// prev is the new head

export const reverseFirstKNode = (
  head: Node | null,
  k: number
): Node | null => {
  let prev = null
  let cur = head
  let i = 0
  while (cur && i < k) {
    const tmp = cur.next
    cur.next = prev
    prev = cur
    cur = tmp
    i += 1
  }
  return prev
}

// Reverse Halves
// Ex1. n is even [1, 2, 3, 4] -> [2, 1, 4, 3]
// Ex2. n is odd [1, 2, 3, 4, 5] -> [2, 1, 3, 5, 4]
//
// 1. count the length of the list -- n
// 2. if n is even:
//  firstHead = reverse(head, 1, n/2)
//  reverse(head, n/2 + 1, n)
// if n is odd
//  firstHead = reverse(head, 1, n/2)
//  reverse(head, n/2 + 2, n)
// because reverse(head, p, q) will always connect the reversed sublist with the
//   original one -- no need to reconnect the parts
// return firstHead

const reversePQ = (head: Node | null, p: number, q: number): Node | null => {
  let prev = null
  let cur = head
  let i = 0
  while (cur && i < p - 1) {
    prev = cur
    cur = cur.next
    i += 1
  }
  // now cur is the head of the sublist, prev is the tail of the first part
  // cur is also the tail of the reversed sublist
  const firstTail = prev
  const reversedSublistTail = cur
  i = 0
  while (cur && i < q - p + 1) {
    const tmp = cur.next
    cur.next = prev
    prev = cur
    cur = tmp
    i += 1
  }
  // now cur is the head of the 3rd part; prev is the reversed head of the sublist
  if (firstTail) {
    firstTail.next = prev
  } else {
    // if the p === 1 (the first part is empty) --
    //  the reversed sublist's head is the list's head
    head = prev
  }
  if (reversedSublistTail) {
    reversedSublistTail.next = cur
  }
  return head
}

export const reverseHalves = (head: Node | null): Node | null => {
  let n = 0
  let p = head
  // 1. count the length -- n
  while (p) {
    p = p.next
    n += 1
  }
  let firstHead = head
  if (n % 2 === 0) {
    // n is even
    firstHead = reversePQ(head, 1, n / 2)
    reversePQ(head, n / 2 + 1, n)
  } else {
    // n is odd
    firstHead = reversePQ(head, 1, n / 2)
    reversePQ(head, n / 2 + 2, n)
  }
  return firstHead
}
