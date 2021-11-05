// https://www.educative.io/courses/grokking-the-coding-interview/N7pvEn86YrN
//
// 1. slow fast pointer to detect cycle first
//   slow move by 1 step; fast move by 2 steps each time.
//   if slow === fast -> intersect -> cycle detected!
// 2. find cycle length
//   save slow; use another pointer to traverse the cycle from slow, until it gets to slow again
//   keep counting nodes.
// 3. find cycle start
//   cycle length - k
//   pointer1 start at head; pointer2 start at k steps ahead of pointer1
//   move the two pointers together, they must be meeting at the starting point of the cycle. ---- why?
//   because pointer2 is k steps ahead, meaning that when pointer1 enters the cycle (at the starting point)
//     pointer2 should be k distance away. i.e. the starting point
//   The process can be further reduced ----
//   we can prove that in 1, when slow and fast meet, the intersect is k distance away from the head.
//   (because fast is twice the speed of slow)
//   Thus, from step1. we just initiate pointer1 at head and pointer2 at the intersect point, and moves
//   until they meet at the starting point.

export class Node {
  public value: number
  public next: Node | null
  constructor(value: number, next = null) {
    this.value = value
    this.next = next
  }
}

export const findCycleStart = (head: Node | null): Node | null => {
  let slow = head
  let fast = head
  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      break
    }
  }
  if (!fast || !fast.next) {
    // no cycle detected
    return null
  }
  let p1 = head
  let p2 = slow
  while (p1 && p2 && p1 !== p2) {
    p1 = p1.next
    p2 = p2.next
  }
  return p1
}
