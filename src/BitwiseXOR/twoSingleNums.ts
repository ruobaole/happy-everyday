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

//--- r1 ---//

// We accumulately XOR all numbers, because A XOR A === 0 and A XOR 0 === A
//  the result will be n1XORn2 -- the only two numbers that appeared once.
// n1XORn2 will mark all the bits that n1 and n2 are different in 1s.
// Then, we can find one bit in n1XORn2 that is 1, based on whether the bit is
//  1 or 0, we can divided all numbers into two groups.
// n1 and n2 can be seperated in the two group. If we XOR each group, we will
//  cancel out all duplicate numbers and have n1 and n2.
// How do we find the bit that is 1 in n1XORn2? -- perform n1XORn2 & 00001000
//  if the result === 0, the bit is 0, otherwise is 1. we can find the rightmost
//  1 bit by iterativly AND n1XORn2 with 1 shifted leftwards by 1 bit each time
//  until the result is not 0;
// How do we seperate the numbers by seeing if the bit is 1 or 0? we can AND the
//  number with 00001000, to see if the result is 0
//
// Time: O(N + B), N is the length of nums[], B is the rightmost bit that is
//  different in n1 and n2
// Space: O(1)

export const findSingleNums_r1 = (nums: number[]): [number, number] => {
  // 1. find n1xn2
  let n1xn2 = 0
  nums.forEach((num) => {
    n1xn2 ^= num
  })
  // 2. find the rightmost bit in that is different in n1 and n2
  let rightmostbit = 1
  while ((n1xn2 & rightmostbit) === 0) {
    rightmostbit = rightmostbit << 1
  }
  // 3. iterate to seperate the numbers into 2 groups and xor
  // each of the group
  let n1 = 0
  let n2 = 0
  nums.forEach((num) => {
    if ((num & rightmostbit) === 0) {
      // the bit is 0
      n1 ^= num
    } else {
      // the bit is 1
      n2 ^= num
    }
  })
  return [n1, n2]
}

//--- r2 ---//
//
// 1. accumulately XOR all numbers together, and we got n1XORn2
// (because A XOR A = 0; 0 XOR A = A)
// 2. n1XORn2 has all bits that is different in n1 and n2 marked 1; thus, we
// can pick any bit in n1XORn2, based on whether the bit is 1 or 0, seperate all
// numbers into 2 groups;
// 3. for the respective 2 groups, XOR all the numbers together and we can get n1 and
//  n2 seperately;
// How do we find a bit that is 1 in n1XORn2?
// - note that when we perform A & 0000 0010, the answer is 0 if the bit is 0
// - thus, we just shift our oneBit by 1 bit leftwards in each iteration; AND n1XORn2
//  with oneBit until the result is not 0; -- oneBit marks the bit that is not 0 in n1XORn2
// How do we seperate the numbers into 2 groups based on bit?
// - AND the number with oneBit, if the result is 0 or not
//
// Time: O(N); the loop in finding oneBit takes constant time

export function findSingleNums_r2(nums: number[]): [number, number] {
  let n1XORn2 = 0
  nums.forEach((num) => {
    n1XORn2 ^= num
  })

  let oneBit = 1
  while ((n1XORn2 & oneBit) === 0) {
    oneBit = oneBit << 1
  }

  let n1 = 0
  let n2 = 0
  nums.forEach((num) => {
    if ((num & oneBit) === 0) {
      n1 ^= num
    } else {
      n2 ^= num
    }
  })
  return [n1, n2]
}
