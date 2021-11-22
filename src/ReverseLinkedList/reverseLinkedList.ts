// https://www.educative.io/courses/grokking-the-coding-interview/3wENz1N4WW9
//
// Use prev/cur pointers to iteratively make cur points to prev
// init: prev = null, cur = head
// iteration: tmp = cur.next, cur.next = prev, prev = cur, cur = tmp
// break when cur is null -- prev is the reversedHead
//
// Time: O(N)

import { Node } from '@src/SlowFastPointers/startOfLinkedListCycle'

export const reverseLinkedList = (head: Node | null): Node | null => {
  let prev: Node | null = null
  let cur = head
  let tmp: Node | null = null
  while (cur) {
    tmp = cur.next
    cur.next = prev
    prev = cur
    cur = tmp
  }
  return prev
}
