// https://www.educative.io/courses/grokking-the-coding-interview/YQJ4mr7yOrW
//
// 1. fast/slow pointers to find the linkedList middle
//    even length: 1 -> 2 -> 3 -> 4 -> null --- middle is 3
//    odd length: 1 -> 2 -> 3 -> null --- middle is 2
// 2. reverse the second half headed at middle
//    even becomes: 1 -> 2 -> 3 -> null; 4 -> 3 -> null; (newHead 4)
//    odd becomes: 1 -> 2 -> null; 3 -> 2 -> null; (newHead 3)
// 3. two pointers to insert the nodes
//    init: p1 = head, p2 = newHead
//    next1 = p1.next, next2 = p2.next. p1.next = p2, p2.next = next1, p1 = next1, p2 = next2
//    break when p1 === null || p2 === null
// 4. NOTE that the middle node exists both in half1 and half2
//    the result is 1 -> 4 -> 2 -> 3 -> 3 -> null OR 1 -> 3 -> 2 -> 2 -> null
//    we should not let the point points to itself --> cycle
//    thus, we break when next1 === p2

import { Node } from './startOfLinkedListCycle'

const reverseLinkedList = (head: Node | null): Node | null => {
  let l: Node | null = null
  let r = head
  while (r) {
    const tmp = r.next
    r.next = l
    l = r
    r = tmp
  }
  return l
}

export const reorderLinkedList = (head: Node | null): Node | null => {
  let slow = head
  let fast = head
  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  const middle = slow
  const half2Head = reverseLinkedList(middle)
  let p1 = head
  let p2 = half2Head
  let next1 = head
  let next2 = half2Head
  while (p1 && p2) {
    next1 = p1.next
    next2 = p2.next
    if (next1 === p2) {
      break
    }
    p1.next = p2
    p2.next = next1
    p1 = next1
    p2 = next2
  }
  return head
}
