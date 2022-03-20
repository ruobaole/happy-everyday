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

import { Node } from './../SlowFastPointers/startOfLinkedListCycle'

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

// review practices //

// Divide the list into 3 parts, below are the nodes we're interested about:
//  tail of the 1st part
//  head of the reversed sublist
//  tail of the reversed sublist
//  head of the 3rd part
// So that after the reversing, we can link the parts together.
// 1. init prev = null, cur = head, skip p - 1 nodes
//  now cur - the head of sublist;
//   prev - tail of the first part;
// 2. reverse the sublist headed at cur while keeping the count
//  before reverse, we know store these points
//  firstPartTail = prev
//  sublistTail = cur
//  after reversing, prev will points to sublistHead, and cur will points to
//  thirdPartHead
// 3. Linking the parts
//  NOTE that when first part's length is 0, we have to update head, otherwise
//  we don't need to update head, just link firstPartTail.next = sublistHead

export const reverseSublist_r1 = (
  head: Node | null,
  p: number,
  q: number
): Node | null => {
  let prev: Node | null = null
  let cur = head
  // skip first part
  let i = 0
  while (cur && i < p - 1) {
    prev = cur
    cur = cur.next
    i += 1
  }
  const firstPartTail = prev
  const sublistTail = cur
  // reverse sublist
  i = 0
  let tmp = cur
  while (cur && i < q - p + 1) {
    tmp = cur.next
    cur.next = prev
    prev = cur
    cur = tmp
    i += 1
  }
  const sublistHead = prev
  const thirdPartHead = cur
  // link the parts
  if (firstPartTail) {
    firstPartTail.next = sublistHead
  } else {
    head = sublistHead
  }
  if (sublistTail) {
    sublistTail.next = thirdPartHead
  }
  return head
}

//--- r2 ---//
//
// The list can be divided into 3 parts:
// part1. the first p-1 nodes
// part2. the reversed sublist, from the p-th node, count q - p + 1 nodes to
//  the q-th node
// part3. the rest nodes
// The following nodes are the nodes we're interested in --
// - the first part's tail
// - the sublist's head and tail (also the reversed sublist's head and tail)
// - the third part's head
// The process is as follows:
// 1. init prev = null, cur = head; count p - 1 nodes
//  now prev points to the first part's tail while
//  cur points to the sublist's head
// 2. before reversing, save the first part's tail and
//  the sublist's head -- because we know that after the
//  reversal, it will be the sublist's tail
//  then reverse the sublist
//  now, prev points to the sublist's new head
//  cur points to the 3rd parts' head
// 3. link the parts
//  NOTE here, we need to check if the first part's tail === null, i.e.
//  the first part is empty -- if so, we need to update the head;
//
// Time: O(N)
// Space: O(1)

export function reverseSublist_r2(
  head: Node | null,
  p: number,
  q: number
): Node | null {
  let prev: Node | null = null
  let cur = head
  let tmp = cur
  let i = 1
  // 1. skip the first part
  while (i <= p - 1 && cur !== null) {
    tmp = cur.next
    prev = cur
    cur = cur.next
    i += 1
  }
  const firstPartTail = prev
  const secondPartTail = cur

  // 2. reverse the sublist
  i = 1
  prev = null
  while (i <= q - p + 1 && cur !== null) {
    tmp = cur.next
    cur.next = prev
    prev = cur
    cur = tmp
    i += 1
  }
  const thirdPartHead = cur
  const secondPartHead = prev
  // 3. link the parts
  if (firstPartTail !== null) {
    firstPartTail.next = secondPartHead
  }
  if (secondPartTail !== null) {
    secondPartTail.next = thirdPartHead
  }
  if (firstPartTail === null) {
    return secondPartHead
  }
  return head
}
