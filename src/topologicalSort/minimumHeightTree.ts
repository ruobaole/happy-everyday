// https://www.educative.io/courses/grokking-the-coding-interview/3Ym408v7NQA
//
// First, we observe that leaves cannot be roots of MHTs -- because the adjacent
// nodes of these leaves can always gives trees with smaller height.
// We can remove all leaves (nodes with only 1 edge) from the tree.
// The tree becomes a new tree with leaf -- we can furtherly remove the leaves.
// Repeat the process until we are left with only 1 or 2 leaves.
// Such algorithm can be converted to a topological sort algorithm with the following
//  differences --
// 1) the sourceList contains nodes with only 1 edge
// 2) because the graph is undirectional -- we save an edge twice -- [1, 2] to be 1->2
//   and 2->1
// 3) in each iteration, we remove leaves in the sourceList, and find further leaves among
//  their children
// 4) iterate until we are left with only 1 or 2 nodes
// what we left in the sourceList are the roots of MHTs
//
// Time: O(V + E)
// Space: O(V + E)

export const findTrees = (nodes: number, edges: number[][]): number[] => {
  if (nodes <= 0) {
    return []
  }
  const inDegree = new Array(nodes).fill(0)
  const graphMap = new Array(nodes).fill(0).map(() => new Array<number>())

  // 1. initialize the inDegree and graphMap
  edges.forEach((e) => {
    const n1 = e[0]
    const n2 = e[1]
    graphMap[n1].push(n2)
    graphMap[n2].push(n1)
    inDegree[n1] += 1
    inDegree[n2] += 1
  })

  // 2. initialize leaves
  const leaves: number[] = []
  for (let v = 0; v < nodes; v += 1) {
    if (inDegree[v] === 1) {
      leaves.push(v)
    }
  }

  let cntNodes = nodes
  // 3. keep removing leaves until we are left with 1 or 2 leaves
  while (cntNodes > 2) {
    const numLeaves = leaves.length
    cntNodes -= numLeaves
    for (let i = 0; i < numLeaves; i += 1) {
      const v = leaves.shift()
      graphMap[v].forEach((child) => {
        inDegree[child] -= 1
        if (inDegree[child] === 1) {
          leaves.push(child)
        }
      })
    }
  }

  return leaves
}
