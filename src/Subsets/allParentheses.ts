// https://www.educative.io/courses/grokking-the-coding-interview/NEXBg8YA5A2
//
// BFS to generate all answers.
// Given N, the length of the total string is fixed (2N) -- in each level,
//  permulate all possiblilities of the parentheses at string[level]
// To make valid string, there're some constraints --
//  keep record of the current ( and ) in the answer string
//  if leftNum < num: we can still add (
//  if rightNum < leftNum: we can still add )
// The leftNum and rightNum is different for every ans, in order to not counting it
//  each time, we store them with the answer string
// Collect answers at the leaf level
//
// Time: loosly O(N*2^N)
//  - number of nodes; if binary tree, O(2^N)
//  - for every node, when we concatenat the string, the process is O(N)
//   (string copy first, and then concatenate)
// Space: the result array -- O(N*2^N)

type LevelAns = {
  ans: string
  leftCnt: number
  rightCnt: number
}

export const allValidParentheses = (num: number): string[] => {
  const level0Ans: LevelAns = {
    ans: '(',
    leftCnt: 1,
    rightCnt: 0
  }
  const queue: LevelAns[] = [level0Ans]
  for (let l = 1; l < num * 2; l += 1) {
    const queueLen = queue.length
    for (let i = 0; i < queueLen; i += 1) {
      const levelAns = queue.shift()
      if (levelAns) {
        if (levelAns.leftCnt > num) {
          queue.push({
            ans: `${levelAns.ans}(`,
            leftCnt: levelAns.leftCnt + 1,
            rightCnt: levelAns.rightCnt
          })
        }
        if (levelAns.rightCnt < levelAns.leftCnt) {
          queue.push({
            ans: `${levelAns.ans})`,
            leftCnt: levelAns.leftCnt,
            rightCnt: levelAns.rightCnt
          })
        }
      }
    }
  }
  return queue.map((levelAns) => levelAns.ans)
}

// review practices //

// BFS to generate all possibilities
// At every level, we branch between adding a ( or );
// - if in the parent answer, the number of ( < num -> we can add (
// - if in the parent answer, the number of ) < number of ( -> we can add )
// To keep record of the ( and ) counts in the parent answer, we need to also
//  store the counts along with the answer array;
// Iterate 2*num levels
// Collect all answers at the leaf level
//
// Time: each level at most 2 possibilities -> loosely O(2^N)
//  the creating of new answers based on the parent one calls for
//  string or array copying -> O(N)
//  thus, loosely O(N * 2^N)
// Space: the answers O(N * 2^N)

type Ans = {
  str: string
  leftCnt: number
  rightCnt: number
}

export const allValidParentheses_r1 = (num: number): string[] => {
  const queue: Ans[] = [{ str: '', leftCnt: 0, rightCnt: 0 }]
  for (let lv = 0; lv < 2 * num; lv += 1) {
    const lvLen = queue.length
    for (let i = 0; i < lvLen; i += 1) {
      const prevAns = queue.shift()
      if (prevAns) {
        if (prevAns.leftCnt < num) {
          // we can add (
          queue.push({
            str: `${prevAns.str}(`,
            leftCnt: prevAns.leftCnt + 1,
            rightCnt: prevAns.rightCnt
          })
        }
        if (prevAns.rightCnt < prevAns.leftCnt) {
          // we can add )
          queue.push({
            str: `${prevAns.str})`,
            leftCnt: prevAns.leftCnt,
            rightCnt: prevAns.rightCnt + 1
          })
        }
      }
    }
  }
  return queue.map((ans) => ans.str)
}
