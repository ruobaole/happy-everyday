// https://www.educative.io/courses/grokking-the-coding-interview/39q3ZWq27jM
//
// Similar to the 'determine if cycle exists in linkedList' question
// define a function to get the next number -- getSquareSum()
// slow = getSquareSum(slow); fast = getSquareSum(getSquareSum(fast))
// until slow === fast;
// if slow === 1 -> happy number; else -> unhappy number :-<

const getSquareSum = (num: number): number => {
  let sum = 0
  let numAbs = Math.abs(num)
  while (numAbs > 0) {
    const digit = numAbs % 10
    sum += digit ** 2
    numAbs = Math.floor(numAbs / 10)
  }
  return sum
}

export const isHappyNumber = (num: number): boolean => {
  let slow = num
  let fast = getSquareSum(getSquareSum(num))
  while (slow !== fast) {
    slow = getSquareSum(slow)
    fast = getSquareSum(getSquareSum(fast))
  }
  return slow === 1
}

// review practices //

// Slow Fast pointers
// Since the number will be either stuck at 1 or number other than 1, the pointers must meet.
// we just need to check if they meet when the number is 1

const getNextNum = (num: number): number => {
  let sum = 0
  while (num > 0) {
    const digit = num % 10
    sum += digit ** 2
    num = Math.floor(num / 10)
  }
  return sum
}

export const isHappyNumber_r1 = (num: number): boolean => {
  let slow = num
  let fast = getNextNum(getNextNum(num))
  while (slow !== fast) {
    slow = getNextNum(slow)
    fast = getNextNum(getNextNum(fast))
  }
  return slow === 1
}

//--- r2 ---//
//
// Hare-and-Tortoise
// Repeatedly calculate the next and nextnext number
// if at any time
// nextnext === 1 -> happy number
// if at any time
// next === nextnext && next !== 1 -> stuck in a non-one cycle -> unhappy

export function isHappyNumber_r2(num: number): boolean {
  let slow = num
  let fast = getNextNum_r2(num)
  while (slow !== fast) {
    slow = getNextNum_r2(slow)
    fast = getNextNum_r2(getNextNum_r2(fast))
  }
  return slow === 1
}

function getNextNum_r2(num: number): number {
  let res = 0
  while (num > 0) {
    const digit = num % 10
    res += digit ** 2
    num = Math.floor(num / 10)
  }
  return res
}
