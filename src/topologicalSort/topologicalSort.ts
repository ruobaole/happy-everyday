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

//--- r2 ---//
//
// Basic process described is --
//  Removes the sources (no parent) of the graph, add them to the result list
//  Some of the nodes in the graph will become new sources, add them to the result list
//  Repeat the process until there're no more sources
// 1. how do we find the sources of the graph
// - keep a map inDegreeMap, key - node, value - the in-degree count of the node
// - each time one of its parent is removed from the graph, its inDegreeMap's value should -1
// - when removing the nodes from the graph, we need to easily know its children, so that we can
//  update its inDegree, thus, store the graph in an adjacency list -- a hashmap whose key being the
//  node, value being the list of its children nodes;
// - we should also keep a queue to store all the sources nodes in each iteration; because we can have
//  more than one source;
// NOTE that, if cycle exists in the graph, e.g. [2, 1], [1, 3], [3, 2] there're no nodes whose inDegree
//  is 1 -- no source
// In that case, we'll end up to have our final result list (sortedList) to have fewer nodes than the
//  number of vertices -- we know that cycle exists -- return []
//
// Time: O(V + E); the construction of the adjacency list and the inDegreeMap takes the traversal of
//  all edges -- O(E); when recursively removing the sources, each node can be the source at most onece
//  -- O(V)
// Space: O(V + E) -- the space need to store the adjacency list

export function topologicalSort_r1(
  vertices: number,
  edges: number[][]
): number[] {
  const sortedList: number[] = []
  // rowIdx - parent node number; colIdx - children of the parent node
  const graph = new Array(vertices).fill(0).map(() => new Array<number>())
  // key - node; value: its inDegree count
  const inDegree = new Array(vertices).fill(0)
  edges.forEach(([parent, child]) => {
    graph[parent].push(child)
    inDegree[child] += 1
  })

  const queue: number[] = []
  for (let v = 0; v < vertices; v += 1) {
    if (inDegree[v] === 0) {
      queue.push(v)
    }
  }

  while (queue.length > 0) {
    const source = queue.shift()
    sortedList.push(source)
    graph[source].forEach((child) => {
      inDegree[child] -= 1
      if (inDegree[child] === 0) {
        delete inDegree[child]
        queue.push(child)
      }
    })
  }

  if (sortedList.length < vertices) {
    // cycle occurs in the graph -- some nodes can never be sources
    return []
  }
  return sortedList
}
