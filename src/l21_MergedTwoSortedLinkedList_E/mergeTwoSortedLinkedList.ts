import { ListNode } from '@src/dataStructure/ListNode'

// - newHead, p1, p2;
// - init: newHead = DummyHead,  p1 = l1, p2 = l2
// - iteration: compare p1.val and p2.val, newHead.next points to the smaller one,
//   the smaller one moved by 1, newHead moved by 1
// - break: p1 === null or p2 === null, newHead.next points the FindNotNull(p1, p2)
//
// Time: O(N), Space: O(1)

export function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummyHead: ListNode = new ListNode()
  let newHead = dummyHead,
    p1 = l1,
    p2 = l2
  while (p1 && p2) {
    if (p1.val < p2.val) {
      newHead.next = p1
      p1 = p1.next
    } else {
      newHead.next = p2
      p2 = p2.next
    }
    newHead = newHead.next
  }
  if (!p1) {
    newHead.next = p2
  } else {
    newHead.next = p1
  }
  return dummyHead.next
}
