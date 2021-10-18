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

// Slow-fast pointers (Totorise & Hare)
// - slow, fast inited to head
// - slow move by 1 position each time; fast move by 2;
// - slow === fast -> intersect -> cycle detected
// Find position pos
// - the distance from head to intesect === the distance from
//  intersect to pos
//
// Proof: the distance between slow and fast in the loop is gonna by
// decrease by 1 each time. -> thus they are sure to meet.
//
// Time: O(N), Space: O(1)

export function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head
  let intersect = head
  let start = head
  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      intersect = slow
      break
    }
  }
  if (!fast || !slow || !fast.next) {
    // no cycle
    return null
  }
  // find pos
  while (start !== intersect && start && intersect) {
    start = start.next
    intersect = intersect.next
  }
  return intersect
}
