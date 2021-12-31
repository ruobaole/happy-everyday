// https://www.educative.io/courses/grokking-the-coding-interview/N7VMDGgr9Vm
//
// 1. accumulately XOR all numbers in the array, the result will be num1 XOR num2
//  say it is n1xn2 (because all other numbers that exist twice will cancel out themselves
//  to have XOR equals 0)
// 2. now we know that for all bits in n1xn2 that is 1, it means that num1 and num2 are different
//  in that bit. Thus, we can use that bit to seperate the numbers into two groups. num1 and num2
//  will be in different groups.
// 3. once we've seperate num1 and num2 in different groups, we just need to XOR all numbers in the
//  two group to get the two numbers
// How to find a bit in n1xn2 that is 1? -- we can start from 1, each time << 1 (left shift 1 bit)
//  until the number & theBit !== 0
// How to find out whether the bit of a number is 1 or 0? -- also use the bitwise and & operation.
//
// Time: O(N)
// Space: O(1)

export const findSingleNums = (nums: number[]): [number, number] => {
  // 1. get num1 XOR num2
  let n1xn2 = 0
  nums.forEach((num) => {
    n1xn2 ^= num
  })
  // 2. get the rightmost bit that is 1 in n1xn2
  let rightmost = 1
  while ((rightmost & n1xn2) === 0) {
    rightmost = rightmost << 1
  }
  // 3. seperate the numbers into two groups by
  // the rightmost bit and XOR the two groups
  let num1 = 0
  let num2 = 0
  nums.forEach((num) => {
    if ((num & rightmost) === 0) {
      // the rightmost bit of num is 0
      num1 ^= num
    } else {
      // the rightmost bit of num is 1
      num2 ^= num
    }
  })
  return [num1, num2]
}
