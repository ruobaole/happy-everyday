/**
 * Definition for singly-linked list.
 */

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

// Iterative Solution:
// - three pointers: prev = null, cur = head, next
// - next = cur.next, cur.next = prev, cur = next, prev = cur
// - stop loop when cur === null -> prev is the tail (new head), return prev
// Time: O(N), Space: O(1)

// function reverseList(head: ListNode | null): ListNode | null {
//     let prev: ListNode | null = null
//     let cur: ListNode | null = head
//     let next: ListNode | null = null
//     while (cur) {
//         next = cur.next
//         cur.next = prev
//         prev = cur
//         cur = next
//     }
//     return prev
// };

// Recursive Solution:
// - head, reversedHead = reverseList(head.next) -- grab head, reversed the rest of the linkedList, return the new head
// - add head to the reversed rest of the list (head.next is actually the tail of the reversed linkedList)
//   head.next.next = head; head.next = null; return reversedHead
// - Base case: head === null, head.next === null
// Time: O(N), Space: O(N) callstack

export function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head
  }
  const reversedHead: ListNode | null = reverseList(head.next)
  head.next.next = head
  head.next = null
  return reversedHead
}
