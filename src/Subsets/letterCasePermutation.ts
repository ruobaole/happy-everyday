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
