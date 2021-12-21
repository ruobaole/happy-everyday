// https://www.educative.io/courses/grokking-the-coding-interview/xVlKmyX542P
//
// BFS to generate all permutations
// At level l, branching between two cases -- str[l] lowercase | largercase
// skip levels when str[l] is not letter
//
// Time: the number of nodes (results) is bounded by O(2^N) -- N is the number of
//  letters
//  copying each str takes O(M) -- M is the length of the string
//  thus, O(M * 2^N)
// Space: bounded by the result array -- O(M * 2^N)

const isLetterWithUpperLowerCases = (letter: string): boolean => {
  // letter has a length of 1
  // return true if the letter has upper case and lower case
  // e.g. ß -- no upper and lower cases -- false
  return letter.toLocaleLowerCase() !== letter.toLocaleUpperCase()
}

export const letterCasePermu = (str: string): string[] => {
  const permu: string[] = [str]
  for (let level = 0; level < str.length; level += 1) {
    if (!isLetterWithUpperLowerCases(str[level])) {
      continue
    }
    const queueLen = permu.length
    for (let j = 0; j < queueLen; j += 1) {
      const candi = permu[j]
      if (candi) {
        const candiArray = candi.split('')
        if (candiArray[level] === candiArray[level].toLocaleLowerCase()) {
          // the letter is in its lowercase, conver it to upper case
          candiArray[level] = candiArray[level].toLocaleUpperCase()
        } else {
          candiArray[level] = candiArray[level].toLocaleLowerCase()
        }
        const candi1 = candiArray.join('')
        permu.push(candi1)
      }
    }
  }
  return permu
}

// review practices //

// BFS to generate all answers.
// Start with the original string
// At level 0, branching between str[0] being capital or lowercase;
// At level 1. for all the answers in level0, branching each answer between
//   str[1] being capital or lowercase;
// If str[lv] is not a letter that has upper and lowercases, directly skip
//  the level;
//  -- to check if a char has upper and lowercases: check if
//    char.toLocaleLowerCase() !== char.toLocaleUpperCase()
// Collet answers at leaf level.
//
// Time: the number of answers is O(2^N) -- N being the number of chars having
//  two form cases;
//  In creating each answer, we need copy the original one -- O(N)
//  thus the time is O(N * 2^N)
// Space: bounded by the answer array -- O(N * 2^N)

const hasTwoForms = (letter: string): boolean => {
  return letter.toLocaleLowerCase() !== letter.toLocaleUpperCase()
}

export const letterCasePermu_r1 = (str: string): string[] => {
  const result: string[] = [str]
  for (let lv = 0; lv < str.length; lv += 1) {
    const lvLen = result.length
    if (!hasTwoForms(str[lv])) {
      continue
    }
    for (let j = 0; j < lvLen; j += 1) {
      const prevAns = result[j]
      const prevAnsArray = prevAns.split('')
      const ansArray = [...prevAnsArray]
      if (ansArray[lv].toLocaleUpperCase() === ansArray[lv]) {
        // upper case, the new one should be lower case
        ansArray[lv] = ansArray[lv].toLocaleLowerCase()
      } else {
        // lower case, the new one should be upper case
        ansArray[lv] = ansArray[lv].toLocaleUpperCase()
      }
      result.push(ansArray.join(''))
    }
  }
  return result
}
