// https://www.educative.io/courses/grokking-the-coding-interview/Bn2KLlOR0lQ
//
// Use hashmap baskets = {} to store fruits in baskets
//  - key: letter, value: number of that letter
//  - when value === 0, delete the pair
// 1. starting from left = 0, right = 0, move right rightwards 1 by each step, recording in ...
//  baskets{}
//   Objects.keys(baskets).length is the total types of fruits
//   the window length, i.e. right - left + 1 is the total num of fruits in baskets
//   updating maxTotal in this progress (CASE: [A, A, A, A] - only one type of fruits)
// 2. when baskets.keys.length > 2 -> start shrinking the window by moving left.
// 3. when moving left rightwards 1 by each step, recording the minus in baskets{}, delete
//  pairs whose value is 0 -> got a candidate result
// In each iteration (right += 1), do the above 3 steps.
//
// Time: O(n) - each element is examinied only twice

// export const fruitsIntoBaskets = (fruits: string[]): number => {
//   const baskets: Record<string, number> = {}
//   let l = 0
//   let r = 0
//   let maxTotal = 0
//   for (r = 0; r < fruits.length; r += 1) {
//     if (baskets[fruits[r]] === undefined) {
//       baskets[fruits[r]] = 0
//     }
//     baskets[fruits[r]] += 1
//     // shrinking
//     while (Object.keys(baskets).length > 2) {
//       baskets[fruits[l]] -= 1
//       if (baskets[fruits[l]] === 0) {
//         delete baskets[fruits[l]]
//       }
//       l += 1
//     }
//     if (Object.keys(baskets).length <= 2) {
//       maxTotal = Math.max(r - l + 1, maxTotal)
//     }
//   }
//   return maxTotal
// }

// review practices //

// Actually, the question is to find the longest continuous subarray which only contains no more
//  than 2 distinct characters.
// Use hashmap fruitCnt{} to memorize types of the fruits within the subarray, and their counts.
// When sliding left, fruitCnt[fruits[left]] -= 1; delete the value when it reaches 0; so that we
//  know the subarray is valid by Objects.keys(fruitCnt).length === 2 -> in O(1) time
// Also, we need to update fruitSum everytime the subarray is valid --
//  sum = windowSize
// 1. move right 1 by each step
//  update fruitCnt
//  when the subarray is invalid, move left until it becomes valid
//  update maxSum when the subarray is valid
// 2. how to move left? -- rightwards
//  update fruitCnt
//  until the subarray is valid
//
// Time: O(N), Space: O(1)

export const fruitsIntoBaskets = (fruits: string[]): number => {
  const fruitCnt: Record<string, number> = {}
  let l = 0
  let r = 0
  let maxSum = 0
  for (r = 0; r < fruits.length; r += 1) {
    const rFruit = fruits[r]
    if (fruitCnt[rFruit] === undefined) {
      fruitCnt[rFruit] = 0
    }
    fruitCnt[rFruit] += 1
    while (Object.keys(fruitCnt).length > 2) {
      const lFruit = fruits[l]
      fruitCnt[lFruit] -= 1
      if (fruitCnt[lFruit] === 0) {
        delete fruitCnt[lFruit]
      }
      l += 1
    }
    // the subarray is valid
    maxSum = Math.max(maxSum, r - l + 1)
  }
  return maxSum
}

//--- r2 ---//

// The problem can be decribed as 'finding the longest subarray
//   which contains no more than 2 distinct chars'
// Sliding window with no fixed window size
// 1. try expand the window
// move right one step each time
// use hashmap fruitFreq to record fruits within the window and their
//   frequencies
// update fruitFreq for fruits[right]
// stop expanding when the window is invalid --
// Object.keys(fruitFreq).length > 2
// 2. shrink the window
// move left while the window is invalid
// update fruitFreq at fruits[left]
// delete paris with 0 frequencies
// 3. after the 2nd step, the window should be valid
// update the maxCnt -- the window size
//
// Time: O(N)
// Space: O(1)

export function fruitsIntoBaskets_r2(fruits: string[]): number {
  const fruitFreq: Record<string, number> = {}
  let maxCnt = 0
  let left = 0
  for (let right = 0; right < fruits.length; right += 1) {
    const rFruit = fruits[right]
    if (fruitFreq[rFruit] === undefined) {
      fruitFreq[rFruit] = 0
    }
    fruitFreq[rFruit] += 1
    while (Object.keys(fruitFreq).length > 2) {
      const lFruit = fruits[left]
      fruitFreq[lFruit] -= 1
      if (fruitFreq[lFruit] === 0) {
        delete fruitFreq[lFruit]
      }
      left += 1
    }
    maxCnt = Math.max(right - left + 1, maxCnt)
  }
  return maxCnt
}
