// https://www.educative.io/courses/grokking-the-coding-interview/B8R83jyN3KY
//
// BFS and swap element approach
// we start with the given array
// - at level 0 -- permulate all possibilities of different element at index 0
//   swap element [0 + 1, ...., len-1] to index 0
// - at level 1 -- based on the result, permulate all possibilities of elements
//   at index 1 -- [1 + 1, ..., len-1]
//   swap them to index 1
// - at level 2 -- swap [2+1, ..., len-1] to index 2
// ...
// - until level len-1 -- collect all results
//
// Time: the number of nodes in the tree is bounded by the number of leaf -- O(N!)
//  while swapping elements, we actually need to copy the original -- takes O(N)
//  thus, O(N * N!)
// Space: space is bounded by the output result array, that is O(N * N!)

export const findAllPermutations = (nums: number[]): number[][] => {
  // permu store the permutations at the current level
  const permu: number[][] = []
  permu.push(nums)
  for (let i = 0; i < nums.length; i += 1) {
    const len = permu.length
    for (let j = 0; j < len; j += 1) {
      // iteratively swap all elements within range [i+1, end]
      //  to index i
      const permuEle = permu[j]
      for (let k = i + 1; k < permuEle.length; k += 1) {
        const newPossibility = [...permuEle]
        newPossibility[i] = permuEle[k]
        newPossibility[k] = permuEle[i]
        permu.push(newPossibility)
      }
    }
  }
  return permu
}

// review practices //

// Imagine we have only one element, there'll be only one permutation
// Now if we add the second element, there're two possible positions that
//  we can add the element -- hence generating two permutations
// Now if we add the 3rd element, the possible positions to insert this element
//  will increased to 3; and based on the previous 2 possibilities, the total
//  number of permutations will be 6;
// We can use this strategy to generate permutations in BFS way
// start with [[]], in each level, try inserting nums[level] into the answers of
// the previous level's answers
// Return answers at the leaf level
//
// Time: the number of permutation -- N!; in creating each permutation, we insert
//  based on the previous answer -> calls for array copy -- bounded by O(N) ->
//  O(N * N!)
// Space: bounded by the result array -- O(N * N!)

export const findAllPermutations_r1 = (nums: number[]): number[][] => {
  const result: number[][] = []
  const queue: number[][] = [[]]
  for (let lv = 0; lv < nums.length; lv += 1) {
    const queueLen = queue.length
    const lvNum = nums[lv]
    for (let i = 0; i < queueLen; i += 1) {
      const prevAns = queue.shift()
      if (prevAns) {
        // iterate all possible positions
        for (let pos = 0; pos <= prevAns.length; pos += 1) {
          const newAns = [...prevAns]
          newAns.splice(pos, 0, lvNum)
          if (lv === nums.length - 1) {
            result.push(newAns)
          } else {
            queue.push(newAns)
          }
        }
      }
    }
  }
  return result
}
