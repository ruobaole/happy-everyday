// https://www.educative.io/courses/grokking-the-coding-interview/m2YYJJRP9KG
//
//
// Use the same strategy as reverseEveryKNodes.
// The only difference is to skip k nodes after each reversing of the sublist
// Start with prev = null, cur = head
//  - firstPartTail = prev; sublistTail = cur
//  - reverse while counting i < k
//  - after reversing, link the sublist to the 1st and 3rd parts, update head
//  - now cur is the next sublist's head, update prev = sublistTail
//  - skip k nodes: move prev and cur together
// iterate until cur is null
//
// Time: O(N)

import { Node } from '@src/SlowFastPointers/startOfLinkedListCycle'

export const reverseAlternativeKNodes = (
  head: Node | null,
  k: number
): Node | null => {
  let prev: Node | null = null
  let cur = head
  while (cur) {
    let i = 0
    // reverse sublist
    const firstPartTail = prev
    const sublistTail = cur
    while (cur && i < k) {
      const tmp: Node | null = cur.next
      cur.next = prev
      prev = cur
      cur = tmp
      i += 1
    }
    // link to the 1st and 3rd part
    if (firstPartTail) {
      firstPartTail.next = prev
    } else {
      head = prev
    }
    sublistTail.next = cur
    prev = sublistTail
    // just skip k nodes
    i = 0
    while (cur && i < k) {
      prev = cur
      cur = cur.next
      i += 1
    }
  }
  return head
}
