// https://www.educative.io/courses/grokking-the-coding-interview/gxJrM9goEMr
//
// We can see the prerequisite pairs as edges of the graph; The problem calls
//  use to establish the topological order of the tasks.
// If we failed to find the topological order of all tasks (i.e. some task's order
//  can not be decided) -- there must be cyclic dependencies among tasks.
//
// Time: O(V + E) because each vertices are pushed and popped out as sources only once.
// Space: O(V + E) the size of the hashmap to represent graph

export const isSchedulingPossible = (
  tasks: number,
  prerequisites: number[][]
): boolean => {
  if (tasks < 0) {
    return false
  }
  if (tasks === 0) {
    return true
  }
  const graphMap = new Array(tasks).fill(0).map(() => new Array<number>())
  const degreeMap = new Array(tasks).fill(0)
  prerequisites.forEach((pre) => {
    const [parent, child] = pre
    graphMap[parent].push(child)
    degreeMap[child] += 1
  })
  const sources: number[] = []
  const sortedOrder: number[] = []
  Object.keys(degreeMap).forEach((v) => {
    if (degreeMap[v] === 0) {
      sources.push(parseInt(v, 10))
    }
  })
  while (sources.length > 0) {
    const v = sources.shift()
    sortedOrder.push(v)
    graphMap[v].forEach((child) => {
      degreeMap[child] -= 1
      if (degreeMap[child] === 0) {
        sources.push(child)
      }
    })
  }
  if (sortedOrder.length === tasks) {
    return true
  }
  return false
}
