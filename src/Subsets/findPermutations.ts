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
