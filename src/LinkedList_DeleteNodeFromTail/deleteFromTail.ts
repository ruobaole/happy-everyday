import { ListNode } from '@src/dataStructure/ListNode'
// Problem Description:
// Given a linkedList - head and an integer n. Delete the nth node from the tail
// of the linkedList
// - Note that n could be larger than the length of the linkedList, return the original list then

// Two pointers: prevToDelete, tail
// - init: prevToDelete = dummyHead, tail n steps away from prevToDelete
// - careful: check n < 0 cases.
// - if n steps make tail reached null --> return the original list
// - break when tail.next === null
// - Delete prevToDelete.next
// - return head
//
// Time: O(N), Space: O(1)
export function deleteNodeFromTail(
  head: ListNode | null,
  n: number
): ListNode | null {
  if (n <= 0) {
    return head
  }
  let prevToDelete: ListNode | null = new ListNode()
  let tail: ListNode | null = prevToDelete
  while (n > 0 && tail) {
    tail = tail.next
    n -= 1
  }
  if (n > 0) {
    // n is larger than the length of the list
    return head
  }
  while (tail && tail.next && prevToDelete) {
    // sure to break when tail.next reached null
    tail = tail.next
    prevToDelete = prevToDelete.next
  }
  const deletedNode = prevToDelete?.next
  if (prevToDelete && prevToDelete.next) {
    prevToDelete = prevToDelete.next.next
  }
  if (deletedNode) {
    deletedNode.next = null
  }
  return head
}
