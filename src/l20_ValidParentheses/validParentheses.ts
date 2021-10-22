// Clearify: ({}) is valid. Don't have to {[()]}
// One Stack
// - read str, if encounters left bracket, stack.push
// - if right bracket, stack.pop, if the popped bracket matched with the right bracket
//   i.e. ( matches ), [ matches ], continue
//   if does not match OR stack.isEmpty, return false
// - valid if read till the end of the str and stack.isEmpty
//
// Time: O(N), Space: O(N)

const isLeftBracket = (input: string): boolean => {
  if (input === '[' || input === '{' || input === '(') {
    return true
  }
  return false
}

const isBracketsMatch = (l: string, r: string): boolean => {
  if (l === '(' && r === ')') {
    return true
  }
  if (l === '[' && r === ']') {
    return true
  }
  if (l === '{' && r === '}') {
    return true
  }
  return false
}

export function isValid(s: string): boolean {
  const parenStk: string[] = []
  let idx = 0
  let valid = true
  while (idx < s.length) {
    if (isLeftBracket(s[idx])) {
      parenStk.push(s[idx])
    } else {
      // right bracket
      const top = parenStk.pop()
      if (top === undefined) {
        valid = false
        break
      } else if (!isBracketsMatch(top, s[idx])) {
        valid = false
        break
      }
    }
    idx += 1
  }
  if (parenStk.length > 0) {
    valid = false
  }
  return valid
}
