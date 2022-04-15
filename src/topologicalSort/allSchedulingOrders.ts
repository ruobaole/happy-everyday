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

//--- r2 ---//
//
// 1. for the prerequisite pairs, we can regard them as edges -- hence the
//  problem becomes -- finding all possible topological orders of the graph
//  representing the dependencies
// 2. to get all possible orders, when source is more than 1, we need to branch
//  between having each of the source list as the first to push into the result list
//  (sortOrder)
//  we can define the problem(sources) -- to get all possible sortOrders based on the current
//  sources;
//  to get prob(sources), we should iterate sources to have each src to push in the sortOrder,
//   and continue to the next level;
//  the next level should be all sources except the pushed in one, plusing the pushed-in one's
//   children if becoming new sources;
//  when returning from the next level, don't forget to recorver to the state of current level
//   by popping out from sortOrder and recorvering the children's inDgrees
//  Base case should be when sources.length === 0:
//  if sortOrder.length === tasks -- meaning no cycle occurs, we should push the sortOrder to
//   the result allOrders
//
// Time: O(V! * E)
//  - at most number of all possible permutations if V vertices -- O(V!)
//  - of each permutation, the construction of the order calls for the iteration of all
//   the edges -- E
// Space: O(V! * V)
//  - at most V! permutations
//  - for each permutation, the orderList is O(V)

export function allSchedulingOrders_r1(
  tasks: number,
  prerequisites: number[][]
): number[][] {
  const allOrders: number[][] = []
  const inDegreeMap = new Array(tasks).fill(0)
  const graph = new Array(tasks).fill(0).map(() => new Array<number>())
  prerequisites.forEach(([parent, child]) => {
    inDegreeMap[child] += 1
    graph[parent].push(child)
  })

  const sources: number[] = []
  for (let t = 0; t < tasks; t += 1) {
    if (inDegreeMap[t] === 0) {
      sources.push(t)
    }
  }

  findAllSortedOrders(sources, tasks, graph, inDegreeMap, allOrders, [])
  return allOrders
}

function findAllSortedOrders(
  sources: number[],
  tasks: number,
  graph: number[][],
  inDegreeMap: number[],
  allOrders: number[][],
  sortOrder: number[]
): void {
  if (sources.length === 0) {
    if (sortOrder.length === tasks) {
      allOrders.push(sortOrder)
    }
  }

  for (let i = 0; i < sources.length; i += 1) {
    const parent = sources[i]
    sortOrder.push(parent)
    // the source list of the next level
    // - should not contain the current node
    // - should have the current node's children,
    // if becomming new sources, appended at last
    const nextSources = [...sources]
    nextSources.splice(i, 1)
    graph[parent].forEach((child) => {
      inDegreeMap[child] -= 1
      if (inDegreeMap[child] === 0) {
        nextSources.push(child)
      }
    })
    findAllSortedOrders(
      nextSources,
      tasks,
      graph,
      inDegreeMap,
      allOrders,
      sortOrder
    )
    // recovere to the current level
    sortOrder.pop()
    graph[parent].forEach((child) => {
      inDegreeMap[child] += 1
    })
  }
}
