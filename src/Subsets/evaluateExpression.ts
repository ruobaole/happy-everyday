// https://www.educative.io/courses/grokking-the-coding-interview/N0Q3PKRKMPz
//
// BFS to generate all possibilities.
// In each level, we branch between using each operator (+. -. *) to seperate the expression
//  into two parts (left and right subtree)
// The evalutaion result is calculated by recursively process the expression string
// Base case is when the string is a number -- not containing any operators
// For every subtree, the result is all the combinations of the result in its left subtree
//  and right subtree
// NOTE that when calculating results, we actually have many duplicate child problems (duplicate subtrees)
// We can use a memo -- expMemo[expression] = result to memorize the result -> if the the
//  expression exists in the hashmap -> return the result directly
//
// Time: total number of result is at most O(2^N), why?
//  because the problem is equivalent of seperating the expression into sub-expressions
//  the total number's calculation is similar to the parenthesis problem
//  In getting each expression's result, all numbers in it is visited once -- O(N)
//  Hence, the time is bounded by O(N*2^N) -- loosely -- tighter bound is by calculating
//  the Catalan Number https://en.wikipedia.org/wiki/Catalan_number
// Space: bounded by the total number of results -- loosely O(2^N)
//  note that we don't need to copy the expression string each time

const waysToEvaluateExpressionHelper = (
  input: string,
  start: number,
  end: number,
  memo: Record<string, number[]>
): number[] => {
  const results: number[] = []
  const expression = input.substring(start, end)
  if (
    !expression.includes('+') &&
    !expression.includes('-') &&
    !expression.includes('*')
  ) {
    // the expression is a number
    results.push(parseInt(expression, 10))
    memo[expression] = results
    return results
  }
  if (memo[expression] !== undefined) {
    return memo[expression]
  }
  for (let i = start; i < end; i += 1) {
    const operator = input[i]
    if (operator !== '+' && operator !== '-' && operator !== '*') {
      continue
    }
    const leftResults = waysToEvaluateExpressionHelper(input, start, i, memo)
    const rightResults = waysToEvaluateExpressionHelper(input, i + 1, end, memo)
    for (let l = 0; l < leftResults.length; l += 1) {
      const leftRes = leftResults[l]
      for (let r = 0; r < rightResults.length; r += 1) {
        const rightRes = rightResults[r]
        let res = leftRes + rightRes
        if (operator === '-') {
          res = leftRes - rightRes
        }
        if (operator === '*') {
          res = leftRes * rightRes
        }
        results.push(res)
      }
    }
  }
  memo[expression] = results
  return results
}

export const waysToEvaluateExpression = (input: string): number[] => {
  // Assume that the expression is valid
  // the operators are +, -, and *
  const memo: Record<string, number[]> = {}
  return waysToEvaluateExpressionHelper(input, 0, input.length, memo)
}
