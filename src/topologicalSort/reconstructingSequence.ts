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
