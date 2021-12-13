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
