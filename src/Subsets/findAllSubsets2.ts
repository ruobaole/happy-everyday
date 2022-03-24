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

// review practices //

// The only difference with findSubsets1 is that the input array
//  may contains duplicate elements.
// Sort the nums[] first, so that the duplicate elements are next to
//  each other and can be easily detected.
// This time, at every level, if the nums[lv] === nums[lv-1] -> duplicate,
//  we should not add it to all the existing answers, but only the
//  answers of the previous level -- because nums[lv-1] have already
//  presents itself in answers of the previous levels.
// Thus, we need to keep track of the starting point of each level's
//  answers in the queue
//
// Time: still bounded by O(N*2^N) -- because when all elements are unique,
//  the number of nodes doubles in each level
// Space: O(N*2^N)

export const findAllSubsets2_r1 = (nums: number[]): number[][] => {
  const result: number[][] = [[]]
  nums.sort()
  let lastLvStart = 0
  for (let lv = 0; lv < nums.length; lv += 1) {
    const lvNum = nums[lv]
    const lvLen = result.length
    let startingPoint = 0
    if (lv > 0 && nums[lv] === nums[lv - 1]) {
      startingPoint = lastLvStart
    }
    for (let i = startingPoint; i < lvLen; i += 1) {
      const prevAns = result[i]
      const newAns = [...prevAns, lvNum]
      result.push(newAns)
    }
    lastLvStart = lvLen
  }
  return result
}

//--- r2 ---//
//
// First, sort the input array so that duplicates are next to each other;
// Whenever we encounter a number that is the same with its previous one,
//  we should not add it to all the previous answers, but only the answers
//  in the previous level;
// Why? because, its previous number has already has itself added with all
//  the previous level's answers;
// Hence, we need to mark the starting point or the length of each level's
//  answers;
//
// Time: still O(N*2^N) -- because when all numbers are unique, the answer still
//  doubles in each level;
// Space: O(N*2^N)

export function allDistinctSubsets2(nums: number[]): number[][] {
  const result: number[][] = [[]]
  nums.sort()
  let lvStart = 0
  for (let lv = 0; lv < nums.length; lv += 1) {
    const lvNum = nums[lv]
    const lvLen = result.length
    let start = 0
    if (lv > 0 && lvNum === nums[lv - 1]) {
      start = lvStart
    }
    for (let i = start; i < lvLen; i += 1) {
      const newAns = [...result[i], lvNum]
      result.push(newAns)
    }
    lvStart = lvLen
  }
  return result
}
