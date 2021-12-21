// https://www.educative.io/courses/grokking-the-coding-interview/NEOZDEg5PlN
//
// For each letter in the word, we have 2 options -- 1. abbreviate to number
//  2. leave it as it were (do not abbreviate)
// Thus we can start from the empty string, process word[level] at each level;
// - at level 0, for the 1st letter (e.g. A), we got 2 answers:
//  1, A
// - at level 1, for the 2nd letter, we concate it to the previous answers and got:
//  2, 1B, A1, AB
// - continue with all rest levels
// collect answers at leaf level
// (We assume that the input word contains only alphabet letters)
//
// Time: as can be seen, each letter has two options -- total O(2^N) possibilities
//  the generating of each possibility calls for string concatenation (copy) - O(N)
//  O(N * 2^N)
// Space: the result array O(N * 2^N)

export const getGeneralizedAbbreviations = (word: string): string[] => {
  // Assume that word contains only letters in the alphabet
  // In order to process more-than-one-digit numbers easily --
  const Abbs: string[][] = [['0']]
  for (let lv = 0; lv < word.length; lv += 1) {
    const curLetter = word[lv]
    const lvLen = Abbs.length
    for (let i = 0; i < lvLen; i += 1) {
      const prevAns = Abbs.shift()
      if (prevAns) {
        // branch 1. abbreviate the curLetter
        const prevAnsLen = prevAns.length
        const prevAnsLast = prevAns[prevAnsLen - 1]
        const prevAnsLastDigit = parseInt(prevAnsLast)
        if (isNaN(prevAnsLastDigit)) {
          Abbs.push([...prevAns, '1'])
        } else {
          Abbs.push([
            ...prevAns.slice(0, prevAnsLen - 1),
            (prevAnsLastDigit + 1).toString()
          ])
        }
        // branch 2. do not abbreviate the curLetter
        // special process for the first letter
        if (prevAnsLastDigit === 0) {
          Abbs.push([...prevAns.slice(0, prevAnsLen), curLetter])
        } else {
          Abbs.push([...prevAns, curLetter])
        }
      }
    }
  }
  return Abbs.map((strArray) => strArray.join(''))
}
