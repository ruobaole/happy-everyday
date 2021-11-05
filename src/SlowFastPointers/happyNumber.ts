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
