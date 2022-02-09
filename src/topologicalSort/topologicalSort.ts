// https://www.educative.io/courses/grokking-the-coding-interview/m25rBmwLV00
//
// Basic process is ----
// 1. find the sources all vertices, push them in the result list
// 2. for all the directed children of the vertices, decrease their degrees (number of incoming
//   edges) by 1; if some of them's degrees === 0 --> they have become a new source -> push them
//   to the sources list to be popped out later
// 3. continue the process until the sources list is empty
// Thus, we need a hashmap to store the vertices and their directed children; also a hashmap to store
//  the vertices and their degrees.
// The 2 hashmaps can be initialized by traversing all the edges.
// NOTE that if cycle exists in the graph, e.g. edges: [[0, 1], [1, 0]] -> we cannot find a source
// Hence the resulting list's length will be smaller than the vertices' length
// We can also use this method to tell if the graph is a DAG (directed acyclic graph) -- if we cannot
//  decide "the topological order of all vertices" -- the graph is not a DAG
//
// Time: O(V + E) -- each vertices can be the source only once -- hence popped from the source list only
//  once
// Space: O(V + E) -- the size of the hashmap to store the vertices with their children

export const topologicalSort = (
  vertices: number,
  edges: number[][]
): number[] => {
  const sortedOrder: number[] = []
  const graphMap: number[][] = new Array(vertices)
    .fill(0)
    .map(() => new Array<number>())
  const degreeMap = new Array(vertices).fill(0)
  // 1. initialize the graphMap and degreeMap
  edges.forEach((edge) => {
    const [parent, child] = edge
    graphMap[parent].push(child)
    degreeMap[child] += 1
  })
  const sources: number[] = []
  // 2. initialize the sources list
  for (let v = 0; v < vertices; v += 1) {
    if (degreeMap[v] === 0) {
      sources.push(v)
    }
  }
  // 3. pop out vertices and decrease their children's degree
  while (sources.length > 0) {
    const src = sources.shift()
    sortedOrder.push(src)
    graphMap[src].forEach((child) => {
      degreeMap[child] -= 1
      if (degreeMap[child] === 0) {
        sources.push(child)
      }
    })
  }
  if (sortedOrder.length !== vertices) {
    // there're some vertices whose topological order can not be
    //  decided --> cyclic exists
    return []
  }
  return sortedOrder
}
