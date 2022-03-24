// https://www.educative.io/courses/grokking-the-coding-interview/gx2OqlvEnWG
//
// Generate the subsets in Breadth First Way
// 1. start with empty array []
// 2. at every level of the tree, we process the element in nums[level];
//   for all the existing subsets, push nums[level] into it to generate
//   an equal number of new subsets
// since the input array contains no duplicate element -- all subsets generated
// should be distinct subsets
//
// Time: O(N*2^N)
//  - in each level, the number of subsets are doubled -- the total number of
//   subsets (nodes in the tree) is bounded by O(2^N)
//  - the creating of each subset calls for the copying of the array -- this can
//   take as much as O(N) time
// Space: the extra space taken is mainly on the result array -- O(2^N) subsets
//   and each subset takes up to O(N) space
//   hence, O(N*2^N) space

export const findAllSubsets = (nums: number[]): number[][] => {
  const subsets: number[][] = [[]]
  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i]
    const len = subsets.length
    for (let j = 0; j < len; j += 1) {
      const set = subsets[j]
      const set1 = [...set, num]
      subsets.push(set1)
    }
  }
  return subsets
}

// review practices //

// BFS to generate all answers
// start with [[]]
// At level 0, push nums[0] to all the existing answers to generate
//  answers at this level
// At level 1, push nums[1] to all the existing answers to generate
//  answers at this level -- because the input array contains no
//  dupliates -> this step won't generate duplicate answers
// Return answers of all levels
//
// Time: the number of total answers is O(2^N) -- because the number of
//  nodes doubles in each level of the tree;
//  besides, in each level, the creating of the new answers based on the
//  answers of the previous level calls for copying of the array, this
//  is bounded by O(N)
//  thus, O(N*2^N)
// Space: bounded by all answers -- O(N*2^N)

export const findAllSubsets_r1 = (nums: number[]): number[][] => {
  const result: number[][] = [[]]
  for (let lv = 0; lv < nums.length; lv += 1) {
    const lvNum = nums[lv]
    const curLen = result.length
    for (let i = 0; i < curLen; i += 1) {
      const prevAns = result[i]
      const newAns = [...prevAns, lvNum]
      result.push(newAns)
    }
  }
  return result
}

//--- r2 ---//
//
// BFS the tree to generate all answers at the leaf nodes;
// init the tree's root with an empty array result -- [[]]
// At every level of the tree, push the level's number nums[lv] into
//  each answer of the previous level to generate answers for this level;
// Since the orignal array contains no duplicate elements, the result would be
//  all distinct elements;
//
// Time: the total number of leaves -- O(2^N); the tree's node number is bounded by
//  its leaf numbers -- hence O(2^N)
// Space: O(2^N) -- for the result array

export function allDistinctSubsets(nums: number[]): number[][] {
  const result: number[][] = [[]]
  for (let lv = 0; lv < nums.length; lv += 1) {
    const lvNum = nums[lv]
    const lvLen = result.length
    for (let i = 0; i < lvLen; i += 1) {
      const prevAns = result[i]
      const newAns = [...prevAns, lvNum]
      result.push(newAns)
    }
  }
  return result
}
