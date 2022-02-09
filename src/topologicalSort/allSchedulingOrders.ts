// https://www.educative.io/courses/grokking-the-coding-interview/q2YmVjQMMr3
//
// To get all possible orders, everytime when we find more than one source, we need
//   to iterate to put every source in the first place, then the 2nd, 3rd, ...
// Thus, we perform a recursion and backtracking to have each source as the first one
//  to push to the sortedOrder -- by removing the source from the sourceList and recur.
// Do not forget to backtracking.
//
// Time: the maximum number of possible combinations for the sources is V!
//   and for possibility, we have to iterate all its children to find further sources --
//   the number of children is at most E
//   hence O(V! * E)
// Space: maximum number of possibilities is V!, for each possibility, the length is V;
//   hence O(V! * V)

function getAllOrders(
  sources: number[],
  inDegree: number[],
  graphMap: number[][],
  sortOrder: number[],
  allOrders: number[][]
): void {
  // Base Case -- collect sortOrder
  if (sources.length === 0) {
    if (sortOrder.length > 0) {
      allOrders.push([...sortOrder])
    }
    return
  }
  if (sources.length > 0) {
    for (let i = 0; i < sources.length; i += 1) {
      const v = sources[i]
      sortOrder.push(v)
      // in the next level of the recursion tree, the next
      //  possition should be the 1st of the sourcesList
      const nextSources = [...sources]
      nextSources.splice(i, 1)
      graphMap[v].forEach((child) => {
        inDegree[child] -= 1
        if (inDegree[child] === 0) {
          nextSources.push(child)
        }
      })
      getAllOrders(nextSources, inDegree, graphMap, sortOrder, allOrders)
      // backtracking
      sortOrder.pop()
      graphMap[v].forEach((child) => {
        inDegree[child] += 1
      })
    }
  }
}

export const allSchedulingOrders = (
  tasks: number,
  prerequisites: number[][]
): number[][] => {
  const allOrders: number[][] = []
  if (tasks <= 0) {
    return allOrders
  }
  const graphMap = new Array(tasks).fill(0).map(() => new Array<number>())
  const inDegree = new Array(tasks).fill(0)
  prerequisites.forEach((pre) => {
    const [parent, child] = pre
    graphMap[parent].push(child)
    inDegree[child] += 1
  })
  const sources: number[] = []
  const sortOrder: number[] = []
  for (let v = 0; v < tasks; v += 1) {
    if (inDegree[v] === 0) {
      sources.push(v)
    }
  }
  getAllOrders(sources, inDegree, graphMap, sortOrder, allOrders)
  return allOrders
}
