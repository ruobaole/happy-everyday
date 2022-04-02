// https://www.educative.io/courses/grokking-the-coding-interview/N0yqGR18jND
//
// First, a little bit of math--
// we know that num XOR complement_num = all_bits_one (because all bits all different)
// put num in both sides: num XOR num XOR complement_num = num XOR all_bits_one
// num XOR num = 0, thus, 0 XOR complement_num = num XOR all_bits_one
// thus, complement_num = num XOR all_bits_one
//
// How to get all_bits_one? if we know the bit count of num -- cnt_bit
// all_bits_one = Math.pow(2, cnt_bit) - 1
// How to get cnt_bit? we can count while shift the number rightwards (divided by 2)
//  until the number gets to 0 (e.g. cnt_bit of 2 is 2)
//
// Time: O(B) - B is the number of bits in num -> we have to iterate B times to get the
//  bit_cnt
// Space: O(1)

export const bitwiseComplement = (n: number): number => {
  // n is positive integer
  // 1. count the bit of n
  let cntBit = 0
  let num = n
  while (num > 0) {
    cntBit += 1
    num = num >> 1
  }

  // 2. get all_bits_one
  const allBitsOne = Math.pow(2, cntBit) - 1

  // 3. get the complement
  return n ^ allBitsOne
}

//--- r1 ---//

// Observe: n XOR nComplement = allOnes
// (XOR n on both sides): n XOR n XOR nComplement = n XOR allOnes
//  nComplement = n XOR allOnes
// How do we get allOnes (allOnes and n has the same leftmost 1 bit,
//  but allOnes have all bits as 1)?
// We first count the position of the leftmost 1 bit in n.
// - the answer is log(base2, n); the method is to divide n by 2
//  iteratively until n is 0, count the times.
// 2 ** (n + 1) - 1 is the allOnes
//
// Time: O(D) D is log(base2, n)
// Space: O(1)

export const bitwiseComplement_r1 = (n: number): number => {
  // 1. get log(base2, n)
  let num = n
  let cnt = 0
  while (num !== 0) {
    num = num >> 1
    cnt += 1
  }
  // 2. get allOnes
  const allOnes = 2 ** cnt - 1
  return n ^ allOnes
}

//--- r2 ---//
//
// Observe:
// A XOR A_Com = AllBitOnes (from the leftmost bit in A that is 1, all the rightwards bits are 1s)
// A XOR A XOR A_Com = A XOR AllBitOnes
// => A_Com = A XOR AllBitOnes
// Thus, the problem is simply to find AllBitOnes;
// 1. we first need to find the bit count in A that is leftmost 1 bit;
//   e.g. 8 which is 1000, bitCnt is 4
// 2. allBitOnes = 2 ** bitCnt - 1
//
// Time: O(1) the total number of bits in the variable is constant

export function bitwiseComplement_r2(n: number): number {
  // 1. find the count of the leftmost 1 bit in n that is not 0
  let n1 = n
  let cnt = 0
  while (n1 !== 0) {
    n1 = n1 >> 1
    cnt += 1
  }

  // 2. get allBitOnes
  const allBitOnes = 2 ** cnt - 1
  return n ^ allBitOnes
}
