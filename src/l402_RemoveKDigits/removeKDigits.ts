// Smallest possible integer should always maintain a non-descending leftside
// Use stack to store the current candidate leftside of the result number
// - stack bottom is the leftmost number
// - stack should maintain a non-descending pattern --> that's why we use stack
// Compare each time the new num with the top, if we encounter a fall --
// the non-descending pattern is about to break -->
// the 'peek' (the top of the stack) is the num we need to remove.
// Continue to remove the peek until the stack remains non-descending pattern. -- k most of course
// If no 'fall' is encountered -- we should push to stack.
// NOTE the zeros -- if we encounter zeros and the stack is empty -- meaning that
//  these zeros are going to be leading zeros. -- remove them directly
//
// NOTE cases: '111111', k=1 or 2 or 3... '9', k=1 -- the stack is in 'flat-pattern' while
//  k > 0 -- remove the numbers until k === 0
//
// TIME: O(N+K) -- looks like we've had nested while loop, but the inner while will not be
//  executed when k === 0.

export function removeKdigits(num: string, k: number): string {
  const stk: number[] = []
  let i = 0
  while (i < num.length) {
    const n: number = +num[i]
    while (k > 0 && stk.length > 0 && stk[stk.length - 1] > n) {
      // find the peek && k > 0
      stk.pop()
      k -= 1
    }
    if (n > 0 || stk.length > 0) {
      // do not push leading zeros
      stk.push(n)
    }
    i += 1
  }
  // cases like: 1119, k = 1 or 111, k = 1 or 9, k = 1
  while (k > 0 && stk.length > 0) {
    stk.pop()
    k -= 1
  }

  return stk.length === 0 ? '0' : stk.join('')
}
