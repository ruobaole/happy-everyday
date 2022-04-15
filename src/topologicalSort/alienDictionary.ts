// https://www.educative.io/courses/grokking-the-coding-interview/R8AJWOMxw2q
//
// Each pair of adjacent words gives us one rule of the alien dictionary -- i.e.
//  the order of 2 letters -- i.e. a parent and a child in the graph
// Hence, we can construct our graph by traversing each adjacent pair of words; --
//  the first different letter tells us the rule.
// We store the graph in a hashmap (key - parent; value - list of its children) so that
//  we can get the children of a vertex in O(1)
// NOTE that the rules of letters the two adjacent words give us could be duplicated --
//  e.g. a -> c, and a -> c again. In that case we will have {a: [c, c]} in the graphMap
//  and {c: 2} in the degreeMap -- however that is correct -- the edge is duplicated.
//
// Time: the algorithm of topological sort is O(V+E) -- here, V is the number of letters
//  N; E is the number of rules. Since each pair of adjacent words gives us one rule,
//  the max number of rules would be M -- the number of words given.
//  thus, O(N + M)
// Space: O(N + M) -- bounded by the graphMap

export const findOrder = (words: string[]): string => {
  if (words.length === 0) {
    return ''
  }
  const inDegree: Record<string, number> = {}
  const graphMap: Record<string, string[]> = {}
  words.forEach((word) => {
    for (let i = 0; i < word.length; i += 1) {
      const letter = word[i]
      inDegree[letter] = 0
      if (graphMap[letter] === undefined) {
        graphMap[letter] = []
      }
    }
  })

  // traverse each adjacent pair of words to build the graphMap
  for (let i = 0; i < words.length - 1; i += 1) {
    const thisWord = words[i]
    const nextWord = words[i + 1]
    let parent = thisWord[0]
    let child = nextWord[0]
    for (let j = 0; j < Math.min(thisWord.length, nextWord.length); j += 1) {
      parent = thisWord[j]
      child = nextWord[j]
      if (parent !== child) {
        graphMap[parent].push(child)
        inDegree[child] += 1
        // NOTE that we need to break after finding the first different letters
        break
      }
    }
  }

  // find the topological order of the graph
  const topoOrder: string[] = []
  const sources: string[] = []
  Object.keys(inDegree).forEach((v) => {
    if (inDegree[v] === 0) {
      sources.push(v)
    }
  })
  while (sources.length > 0) {
    const v = sources.shift()
    topoOrder.push(v)
    graphMap[v].forEach((child) => {
      inDegree[child] -= 1
      if (inDegree[child] === 0) {
        sources.push(child)
      }
    })
  }

  if (topoOrder.length !== Object.keys(inDegree).length) {
    // there exists letters whose topological order cannot be decided
    return ''
  }
  return topoOrder.join('')
}

//--- r2 ---//
//
// 1. Each pair of adjacent words in the given word list gives us one rule
//  of the dictionary; the leftmost different letters tell the rule
// 2. We see the rules as edges in a graph, the problem becomes -- finding the topological
//  order of the graph
// 3. NOTE that, the rules drew from the word list can be duplicated -- a -> c and a -> c
//  agian. That will lead to a's children [c, c], and c's inDegree === 2
//  However, that is correct when we're building the topological rule.
//
// Time: O(N + M) -- N is the total number of letters; M is the total number of words given;
//  - time for topological sort is O(V + E); here, V is N; M words can generate as much as
//  M rules -- M edges;
// Space: O(N + M) bounded by the graphMap

export function findOrder_r1(words: string[]): string {
  const inDegree: Record<string, number> = {}
  const graph: Record<string, string[]> = {}
  words.forEach((word) => {
    for (let i = 0; i < word.length; i += 1) {
      const letter = word[i]
      if (graph[letter] === undefined) {
        graph[letter] = []
      }
      inDegree[letter] = 0
    }
  })

  for (let i = 0; i < words.length - 1; i += 1) {
    const word = words[i]
    const nextWord = words[i + 1]
    for (let j = 0; j < Math.min(word.length, nextWord.length); j += 1) {
      if (word[j] !== nextWord[j]) {
        graph[word[j]].push(nextWord[j])
        inDegree[nextWord[j]] += 1
        break
      }
    }
  }

  const order: string[] = []
  const sources: string[] = []
  Object.entries(inDegree).forEach(([letter, inDeg]) => {
    if (inDeg === 0) {
      sources.push(letter)
    }
  })

  while (sources.length > 0) {
    const parent = sources.shift()
    order.push(parent)
    graph[parent].forEach((child) => {
      inDegree[child] -= 1
      if (inDegree[child] === 0) {
        delete inDegree[child]
        sources.push(child)
      }
    })
  }

  return order.join('')
}
