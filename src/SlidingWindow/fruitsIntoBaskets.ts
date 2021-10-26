// Use hashmap baskets = {} to store fruits in baskets
//  - key: letter, value: number of that letter
//  - when value === 0, delete the pair
// 1. starting from left = 0, right = 0, move right rightwards 1 by each step, recording in ...
//  baskets{}
//   Objects.keys(baskets).length is the total types of fruits
//   the window length, i.e. right - left + 1 is the total num of fruits in baskets
//   updating maxTotal in this progress (CASE: [A, A, A, A] - only one type of fruits)
// 2. when baskets.keys.length > 2 -> start shrinking the window by moving left.
// 3. when moving left rightwards 1 by each step, recording the minus in baskets{}, delete
//  pairs whose value is 0 -> got a candidate result
// In each iteration (right += 1), do the above 3 steps.
//
// Time: O(n) - each element is examinied only twice

export const fruitsIntoBaskets = (fruits: string[]): number => {
  const baskets: Record<string, number> = {}
  let l = 0
  let r = 0
  let maxTotal = 0
  for (r = 0; r < fruits.length; r += 1) {
    if (baskets[fruits[r]] === undefined) {
      baskets[fruits[r]] = 0
    }
    baskets[fruits[r]] += 1
    // shrinking
    while (Object.keys(baskets).length > 2) {
      baskets[fruits[l]] -= 1
      if (baskets[fruits[l]] === 0) {
        delete baskets[fruits[l]]
      }
      l += 1
    }
    if (Object.keys(baskets).length <= 2) {
      maxTotal = Math.max(r - l + 1, maxTotal)
    }
  }
  return maxTotal
}
