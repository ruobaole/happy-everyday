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
