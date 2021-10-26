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

export const nonRepeatSubstring = (str: string): number => {
  const charIdx: Record<string, number> = {}
  let l = 0
  let r = 0
  let maxLen = 0
  for (r = 0; r < str.length; r += 1) {
    const rightC = str[r]
    if (charIdx[rightC] !== undefined) {
      // substring contains duplicate char, and we need to shrink the window
      l = charIdx[rightC] + 1
    }
    charIdx[rightC] = r
    maxLen = Math.max(maxLen, r - l + 1)
  }
  return maxLen
}
