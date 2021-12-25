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

// review practices //
//
// At each level of the tree, we branching between using each operator in
//  the current expression string to seperate the string into 2 halves
// Each half can generate a list of result, hence for each subtree of the level.
//  we need to do N*N iterations to loop all answers in the left half substring
//  and all answers in the right half and combine them to generate result of
//  the current subtree
// The level's answer is the super set of answers of all subtrees
// Note that there will be many overlapping subproblems when we calculting the
//  value of the expressions
// -- hence we can avoid duplicated calculation by using a memo
//
// Time: how many ways we can seperate the string? -- O(2^N) N is the number of
//  operators (the same as the parentheses problem); and to get the result of
//  each expression calls for the traversing of the whole tree -- O(M) (M is the total
//  number of the operators and digits combined) -- hence: O(M * 2^N)
// Space: number of possible expressions is loosely O(2^N); for each expression,
//  to get the value, the tree traversing calls for returning arrays at each level;
//  the max of the array is O(M)
//  hence, O(M * 2^N)

const waysToEvaluateExpression_r1Helper = (
  input: string,
  start: number,
  end: number,
  memo: Record<string, number[]>
): number[] => {
  const result: number[] = []
  const substring = input.substring(start, end + 1)
  if (
    !substring.includes('+') &&
    !substring.includes('-') &&
    !substring.includes('*')
  ) {
    result.push(parseInt(substring))
    return result
  }
  if (memo[substring] !== undefined) {
    return memo[substring]
  }
  for (let i = start; i <= end; i += 1) {
    const op = input[i]
    if (op !== '+' && op !== '-' && op !== '*') {
      continue
    }
    const resLeft = waysToEvaluateExpression_r1Helper(input, start, i - 1, memo)
    const resRight = waysToEvaluateExpression_r1Helper(input, i + 1, end, memo)
    resLeft.forEach((l) => {
      resRight.forEach((r) => {
        if (op === '+') {
          result.push(l + r)
        } else if (op === '-') {
          result.push(l - r)
        } else {
          result.push(l * r)
        }
      })
    })
  }
  memo[substring] = result
  return result
}

export const waysToEvaluateExpression_r1 = (input: string): number[] => {
  // assume that the input contains only: digts, +, - and *
  const memo: Record<string, number[]> = {}
  return waysToEvaluateExpression_r1Helper(input, 0, input.length - 1, memo)
}
