// https://www.educative.io/courses/grokking-the-coding-interview/RMZylvkGznR
//
// At first glance, it seems that we can make use of reversePQ(head, p, q)
//  reversePQ(head, 1, k), reversePQ(head, k+1, 2k), reversePQ(2k+1. 3k), ...
//  reversePQ(head, mk+1, n) -- m = n / k
// However, in each of the reversePQ, we have to first iterate to skip the first p-1
//  nodes, meaning that the time is 1 + k + 2k + 3k + ... mk -> O(m^2k)
// We can save the 'skip first p-1 nodes' process by reforming reversePQ() to
//  reversePK(head, pNode, k)
//  -- pNode is the starting point of the sublist; k is the length of the sublist
//  if the list's actual length is smaller than k -- reverse only till the end of the sublist
// In each reverse iteration:
//  1. before reversing, tail = pNode
//  2. reversePK(head, pNode, k)
//  3. after reversing, we know that the next pNode should be tail.next
//
// NOTE that k should > 1
// Time: O(N) -- each node is visited only once

import { Node } from './../SlowFastPointers/startOfLinkedListCycle'

export const reverseEveryKNode = (
  head: Node | null,
  k: number
): Node | null => {
  if (k <= 1) {
    return head
  }
  let prev: Node | null = null
  let cur = head
  while (cur) {
    const firstPartTail = prev
    const sublistTail = cur
    let tmp: Node | null = cur
    let i = 0
    // reverse the at most k nodes starting from prev.next
    while (cur && i < k) {
      tmp = cur.next
      cur.next = prev
      prev = cur
      cur = tmp
      i += 1
    }
    if (firstPartTail) {
      firstPartTail.next = prev
    } else {
      head = prev
    }
    sublistTail.next = cur
    // update prev and cur
    prev = sublistTail
  }
  return head
}

// review status //

// when reversing every k nodes, we are interested in the below nodes:
//  - tail of the first part
//  - head of the reversed sublist
//  - tail of the sublist
//  - head of the third part
// 1. init prev = null, cur = head
//  we know that: firstPartTail = prev, sublistTail = cur
// 2. reverse the sublist while counting k
//  we know that after the reversal -- head of the sublist = prev
//  head of the third part = cur
// 3. link the parts
//  NOTE that if firstPartTail is null, we need to update head to sublistHead
// 4. after linking the parts, update prev and cur
//  prev = sublistTail; loop from step2
//
// Time: O(N)

export const reverseEveryKNode_r1 = (
  head: Node | null,
  k: number
): Node | null => {
  let prev: Node | null = null
  let cur = head
  let firstPartTail = head
  let sublistTail = head
  while (cur) {
    let i = 0
    firstPartTail = prev
    sublistTail = cur
    let tmp: Node | null = cur
    while (cur && i < k) {
      tmp = cur.next
      cur.next = prev
      prev = cur
      cur = tmp
      i += 1
    }
    // link the parts
    if (firstPartTail) {
      firstPartTail.next = prev
    } else {
      head = prev
    }
    sublistTail.next = cur
    prev = sublistTail
  }
  return head
}

//--- r2 ---//
//
// We just keep counting k and reverse the k-length sublist.
// In order to link the sublist, there're several nodes we need to
//  keep record of --
// 1. the previous part's tail
// 2. the head of the sublist
// 3. the tail of the sublist
// The process would be
// 1. init prev = null, cur = head
//  prevTail = prev
//  sublistTail = cur (because after reversing, this will be the tail)
// 2. reverse while counting k
//  after the reversing,
//  sublistHead = prev
// 3. link the parts
//  NOTE that if prevTail === null, we should update the head to sublistHead
// 4. get ready for the next iteration
//  set prev = sublistTail; cur is now at the next sublist's head (before reverse)
//  reset k and iterate

export function reverseEveryK(head: Node | null, k: number): Node | null {
  let prev: Node | null = null
  let cur = head
  let tmp = cur
  let prevTail = prev
  let sublistTail = cur
  while (cur !== null) {
    // reverse sublist
    prevTail = prev
    sublistTail = cur
    let i = 0
    while (i < k && cur !== null) {
      tmp = cur.next
      cur.next = prev
      prev = cur
      cur = tmp
      i += 1
    }
    // link the prev part with the reversed sublist
    if (prevTail) {
      prevTail.next = prev
    } else {
      head = prev
    }
    // ready for the next k node's reversal
    prev = sublistTail
    sublistTail.next = cur
  }
  return head
}
