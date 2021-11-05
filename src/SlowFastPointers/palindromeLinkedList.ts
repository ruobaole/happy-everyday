// https://www.educative.io/courses/grokking-the-coding-interview/B1PzmqOKDLQ
//
// 1. find the middle of the linkedList using slow/fast pointers
//   mind that: if the length is even e.g. 1 -> 2 -> 3 -> 4 -> null, the middle is 3
// 2. from the middle node, read the first and second half of the linked list should either:
//   exactly the same OR the first half list remains ONLY one node.
//   Thus, we reverse the second half. Read the two half list from its head and compare.
//   the LinkedList is palin if the two matched exactly or matched until one got null (we don't need to
//   count the remaining nodes because it is a HALF -- thus the remaining should always be ONE)
// 3. reverse back the second half to revert it to its original
//
// Time: O(N) Space: O(1)

import { Node } from './startOfLinkedListCycle'

const reverseLinkedList = (head: Node | null): Node | null => {
  let p1: Node | null = null
  let p2 = head
  let tmp = head
  while (p2) {
    tmp = p2.next
    p2.next = p1
    p1 = p2
    p2 = tmp
  }
  return p1
}

export const isPalindromeLinkedList = (head: Node | null): boolean => {
  let isPalin = true
  if (!head || !head.next) {
    return isPalin
  }
  // 1. find middle node
  let slow: Node | null = head
  let fast: Node | null = head
  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  // 2. reverse the second half
  const reversedHead = reverseLinkedList(slow)
  // 3. compare the two half
  let p2: Node | null = reversedHead
  let p1: Node | null = head
  while (p1 && p2) {
    if (p1.value !== p2.value) {
      isPalin = false
      break
    }
    p1 = p1.next
    p2 = p2.next
  }
  // 4. reverse the second half back
  reverseLinkedList(reversedHead)
  if (p1 === null || p2 === null) {
    // one of the half reached null with all values matched
    isPalin = true
  }
  return isPalin
}
