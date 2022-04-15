// https://www.educative.io/courses/grokking-the-coding-interview/m20NY0Rwz7A
//
// Each sequence in the sequence array tells us the number of the orders.
// We can construct a graph by comparing each pair of adjacent numbers in a sequence.
// The problem calls us to find out the following:
// 1. if the topological order we draw is the same as the original one.
// 2. if the topological order we draw is the only possible one.
// Thus, while building the topological order, we need to check these things:
// 1. if the number of vertices we got from the degreeMap !== the length of the originalSeq
//  -- not all number have rules -- return false
// 2. if at any time, the sources array contains more than one number -- the rule we draw is
//  not the only possible one -- return false
// 3. if at any time, the number in the topologicalOrder we build does not match with the number
//  in the original sequence -- the rules are not the same -- return false
//
// Time: O(V + E) -- here, V is the number of unique numbers; E is the number of rules, i.e. the
//   number of numbers in the sequences array
// Space: O(V + E)

export const canConstruct = (
  originalSeq: number[],
  sequences: number[][]
): boolean => {
  const graphMap: Record<number, number[]> = {}
  const inDegree: Record<number, number> = {}
  sequences.forEach((seq) => {
    seq.forEach((num) => {
      inDegree[num] = 0
      if (graphMap[num] === undefined) {
        graphMap[num] = []
      }
    })
  })

  // build the graph from the sequence in the array
  sequences.forEach((seq) => {
    let parent = seq[0]
    let child = seq[0]
    for (let i = 0; i < seq.length - 1; i += 1) {
      parent = seq[i]
      child = seq[i + 1]
      // duplicate edges between a pair of vertices could exist
      // but since the degree is also doulbed -- it should be correct
      inDegree[child] += 1
      graphMap[parent].push(child)
    }
  })

  // check if there're numbers that do not have rules
  if (Object.keys(inDegree).length !== originalSeq.length) {
    return false
  }
  const sources: number[] = []
  Object.keys(inDegree).forEach((v) => {
    const vn = parseInt(v, 10)
    if (inDegree[vn] === 0) {
      sources.push(vn)
    }
  })

  const topoOrder: number[] = []
  while (sources.length > 0) {
    if (sources.length !== 1) {
      // more than one source -- multiple possibilities
      return false
    }
    const v = sources.shift()
    topoOrder.push(v)
    if (v !== originalSeq[topoOrder.length - 1]) {
      // the two rules are not the same
      return false
    }
    graphMap[v].forEach((child) => {
      inDegree[child] -= 1
      if (inDegree[child] === 0) {
        sources.push(child)
      }
    })
  }

  if (topoOrder.length !== originalSeq.length) {
    return false
  }
  return true
}

//--- r2 ---//
//
// Each subsequence in the given sequence list gives us rules of adjacent elements' order;
// We can treat these rules as edges in the graph. The problem calls us to find ----
//  1. whether the reconstructed topo order and the original one are the same
//  2. whether the reconstructed one is the only one
// Thus, while building the topo order from the graph and inDegreeMap, we need to check:
// - if the vertices we got in the inDegreeMap !== length of the original sequence, return false
// - if at any time, the source list contains more than one source -- more than one reconstructed
//  order -- return false
// - if at any time, the reconstructed order's element !== the corresponding element in the orignal
//  sequence -- the 2 sequences do not match -- return false
//
// Time: O(N + M) -- N is the number of elements (the originalSeq's length); M is the number of rules
//  given in the sequence list
// Space: O(N + M) -- the graph

export function canConstruct_r1(
  originalSeq: number[],
  sequences: number[][]
): boolean {
  const graph: Record<number, number[]> = {}
  const inDegreeMap: Record<number, number> = {}
  originalSeq.forEach((num) => {
    if (graph[num] === undefined) {
      graph[num] = []
    }
    inDegreeMap[num] = 0
  })

  sequences.forEach((seq) => {
    for (let i = 0; i < seq.length - 1; i += 1) {
      const cur = seq[i]
      const next = seq[i + 1]
      graph[cur].push(next)
      inDegreeMap[next] += 1
    }
  })

  if (Object.keys(inDegreeMap).length !== originalSeq.length) {
    // The orders cannot match
    return false
  }

  const sources: number[] = []
  Object.entries(inDegreeMap).forEach(([childStr, inDeg]) => {
    if (inDeg === 0) {
      sources.push(+childStr)
    }
  })
  let reconSeqLen = 0
  while (sources.length > 0) {
    if (sources.length !== 1) {
      // More than one order can be reconstructed
      return false
    }
    const parent = sources.shift()
    if (parent !== originalSeq[reconSeqLen]) {
      // The orders do not match
      return false
    }
    reconSeqLen += 1
    graph[parent].forEach((child) => {
      inDegreeMap[child] -= 1
      if (inDegreeMap[child] === 0) {
        delete inDegreeMap[child]
        sources.push(child)
      }
    })
  }

  if (reconSeqLen !== originalSeq.length) {
    // The orders do not match
    return false
  }

  return true
}
