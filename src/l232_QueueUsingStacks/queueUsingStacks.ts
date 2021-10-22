// Push/pop Stack Solution
// - pushStk, popStk
// PushOp. pushStk.push(x), pushStk.top() is the last of the subQueue
// PopOp. if popStk.isEmpty(), move all from pushStk to popStk first, popStk.pop()
//   if not empty, pop directly. -- popStk.top() is the start(first) of the queue
//
// Time: pushStk O(1), popStk - worst case O(N) - amortized O(1)
// Why amortized O(1)? exactly like the dynamic array.
// N push() + N pop() -- 2N operations
// total time: O(N) + O(2N) + O(N-1) = O(4N)
// average: 4n / 2n = 2 --> O(1)

export class MyQueue {
  private pushStk: number[]
  private popStk: number[]
  constructor() {
    this.pushStk = []
    this.popStk = []
  }

  push(x: number): void {
    this.pushStk.push(x)
  }

  pop(): number | undefined {
    if (this.popStk.length === 0) {
      this.moveElements(this.pushStk, this.popStk)
    }
    return this.popStk.pop()
  }

  peek(): number | undefined {
    if (this.popStk.length === 0) {
      this.moveElements(this.pushStk, this.popStk)
    }
    return this.popStk[this.popStk.length - 1]
  }

  empty(): boolean {
    return this.pushStk.length === 0 && this.popStk.length === 0
  }

  private moveElements = (stk1: number[], stk2: number[]): void => {
    let popped = stk1.pop()
    while (popped) {
      stk2.push(popped)
      popped = stk1.pop()
    }
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
