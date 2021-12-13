// https://www.educative.io/courses/grokking-the-coding-interview/7npk3V3JQNr
//
// Also use the BFS strategy to generate the subset tree
// this time, in order to process duplicates easily, we first sort the input array
// (the process takes O(NlogN) time, which is acceptable comparing to the overall
//   O(N*2^N) time we need to generate all subsets)
// When BFS the tree:
// everytime we encounter a duplicate element (the element === its previous) ----
// instead of pushing the element to all exsisting subsets, we should only push
//  it to the subsets newly generated in the parent level.
// NOTE: not the half of the existing level. considering [1, 3, 3, 3] --
//  it is true for the first duplicate 3, but not true for the second duplicate
// Thus, in every level, we need to mark the starting index of the newly generated
//  subset in the result array; and in the next level, start from the starting index
//  till the length of the subset array
//
// Time: the sorting takes O(NlogN) time, the generating of all nodes in the
//  tree, as discussed in the findAllSubsets problem, takes O(N*2^N)
//  overall O(N*2^N)
// Space: the result array takes up to O(N*2^N)

export const findAllSubsets2 = (nums: number[]): number[][] => {
  const subsets: number[][] = [[]]
  nums.sort((a, b) => a - b)
  let startIdx = 0
  let levelNewlyAdded = 0
  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i]
    const len = subsets.length
    if (i > 0 && num === nums[i - 1]) {
      // the current element is a duplicate one
      startIdx = levelNewlyAdded
    } else {
      startIdx = 0
    }
    for (let j = startIdx; j < len; j += 1) {
      const set = subsets[j]
      const set1 = [...set, num]
      subsets.push(set1)
    }
    levelNewlyAdded = len
  }
  return subsets
}
