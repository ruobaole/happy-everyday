// https://www.educative.io/courses/grokking-the-coding-interview/YMzBx1gE5EO
//
// Use hashmap charIdx {} to record the non-distinct character in the sustring [l, r]
// 1. moving right of the window rightwards 1 step each time
//    if string[right] is aready in charIdx, we know the substring contains duplicate char
//    and the duplicate char is string[right], we need to shrink the window
// 2. we can directly shrink the window by setting its left = charIdx[string[right]] + 1, because
//    the only way to make the substring valid is to 'slide out' the duplicate char.
// 3. update maxLen when substring is valid. current len is the window size
// Move right 1 step each time and repeat 2, 3 in each iteration
// TRICKY: tricky part in this problem is 1) to see if the substring is valid;
//     2) shrink the window so that the substring is once again valid;
//
// Time: O(N)

// export const nonRepeatSubstring = (str: string): number => {
//   const charIdx: Record<string, number> = {}
//   let l = 0
//   let r = 0
//   let maxLen = 0
//   for (r = 0; r < str.length; r += 1) {
//     const rightC = str[r]
//     if (charIdx[rightC] !== undefined) {
//       // substring contains duplicate char, and we need to shrink the window
//       l = charIdx[rightC] + 1
//     }
//     charIdx[rightC] = r
//     maxLen = Math.max(maxLen, r - l + 1)
//   }
//   return maxLen
// }

// review practices //

// [TRICKY]: hashmap charSeen{} records chars and their indices last seen -- instead of chars and their
//  indices within the subarray
// Why? Because in this way, to make the subarray valid, we can directly update left to
//  left = max(left, charSeen[rightC] + 1)
//  - if charSeen[rightC] + 1 is already out of the window, we do not need to move left
// The steps are:
// 1. move right rightwards, 1 by each step
//   mark rightC in charSeen
//   if charSeen[rigthC] !== undefined, we need to update left to make the subarray valid:
// 2. update left when the subarray is invalid
//   left = max(left, charSeen[rigthC] + 1)
// 3. once the subarray is valid
//   DO NOT FORGET to update charSeen[rightC] to current right -- because this stores the index we last
//   seen the char
//   update maxLen = max(maxLen, right - left + 1)
//
// Time: O(N), Space: O(N)

export const nonRepeatSubstring = (str: string, k: number): number => {
  const charSeen: Record<string, number> = {}
  let l = 0
  let r = 0
  let maxLen = 0
  for (r = 0; r < str.length; r += 1) {
    const rightC = str[r]
    if (charSeen[rightC] !== undefined) {
      // rightC already seen
      l = Math.max(l, charSeen[rightC] + 1)
    }
    charSeen[rightC] = r
    maxLen = Math.max(maxLen, r - l + 1)
  }
  return maxLen
}

//--- r2 ---//

// Observe that, when we encounter a char which is already in the window,
//  the only way to make the window once again valid is by moving the
//  left to the char's first apperance's next idx;
// Thus, we use a hashmap charSeen to mark the char in the window, and their
//  first indices in the window
// 1. try expand the window
// move right one step each time
// update charSeen
// if the right char is already in the charSeen -- the window is invalid
// 2. shrink the window by
// moving left to charSeen[rightChar] + 1
// update charSeen to left
// 3. the window is now valid, update maxLen
//
// Time: O(N)
// Space: O(N) -- the hashmap

export function nonRepeatSubstring_r2(str: string): number {
  const charSeen: Record<string, number> = {}
  let maxLen = 0
  let left = 0
  for (let right = 0; right < str.length; right += 1) {
    const rightC = str[right]
    if (charSeen[rightC] === undefined) {
      charSeen[rightC] = right
    } else {
      // the window is invalid, shrink to make it valid
      left = charSeen[rightC] + 1
      charSeen[rightC] = left
    }
    maxLen = Math.max(maxLen, right - left + 1)
  }
  return maxLen
}
