import { ListNode } from '@src/dataStructure/ListNode'

// Two Pointers: slow fast
// - init: slow = head, fast = head
// - iterate: slow = slow.next, fast = fast.next.next
// - break when fast === null or fast.next === null. return slow
//
// Time: O(N), Space: O(1)

export function middleNode(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head
  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}
