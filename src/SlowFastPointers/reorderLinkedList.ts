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

// review practices //

// 1. slow/fast pointers to find the middle point -- mid
// 2. reverse the second half -- newHead (now mid is tail and mid -> null)
// 3. start inserting the reversed 2nd half (newHead) into the 1st half (head)
//   first = head; second = newHead;
//   firstNxt = first.next, secondNxt = second.next
//   first.next = second, second.next = firstNxt
//   first = firstNxt, second = secondNxt
// NOTE: the mid will always be the tail. Thus, when first === mid (now, second === null), we should break
//  and first.next = null.
//  else, we will append mid.next = mid -> and cause an infinite loop
//
// Time: O(N)

const reverseLinkedList_r1 = (head: Node | null): Node | null => {
  let prev = null
  let
  while (p2) {
    const tmp = p2.next
    p2.next = p1
    p2 = tmp
    p1 = p2
  }
  return p1
}

export const reorderLinkedList_r1 = (head: Node | null) => {
  // 1. find mid
  let slow = head
  let fast = head
  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  const mid = slow
  // 2. reverse the second half
  const newHead = reverseLinkedList_r1(mid)

  // 3. insert
  let first = head
  let second = newHead
  while (first && second) {
    // not reaching the tail
    const firstNxt = first.next
    const secondNxt = second.next
    first.next = second
    second.next = firstNxt
    first = firstNxt
    second = secondNxt
  }
  if (first) {
    first.next = null
  }
}
