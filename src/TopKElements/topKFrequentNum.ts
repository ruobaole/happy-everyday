// https://www.educative.io/courses/grokking-the-coding-interview/B89rvR6XZ3J
//
// We use a hashmap to store all number with its frequencies
// Then, use the same strategy as to find the k largest numbers, use a minHeap
// (however, ordered by the frequency of the numbers) to maintain the k most
//   frequent numbers
//
// Time: the populating of the hashmap is O(N), the operation on the minHeap
//  takes O(klogk + (n - k)logk)
// Space: O(N) the hashmap

import { Heap } from 'typescript-collections'

export const findKFrequentNum = (nums: number[], k: number): number[] => {
  const result: number[] = []
  const freqMap = new Map<number, number>()
  nums.forEach((num) => {
    const freq =
      freqMap.get(num) === undefined ? 0 : (freqMap.get(num) as number)
    freqMap.set(num, freq + 1)
  })

  // ordered by the freq
  const minHeap = new Heap<[number, number]>((a, b) => b[1] - a[1])
  let idx = 0
  for (idx = 0; idx < k && idx < nums.length; idx += 1) {
    minHeap.add([nums[idx], freqMap.get(nums[idx]) as number])
  }
  for (idx = k; idx < nums.length; idx += 1) {
    if (minHeap.peek() !== undefined) {
      const top = minHeap.peek() as [number, number]
      const curNumTuple = [nums[idx], freqMap.get(nums[idx]) as number]
      if (top[1] < curNumTuple[1]) {
        minHeap.removeRoot()
        minHeap.add([curNumTuple[0], curNumTuple[1]])
      }
    }
  }
  minHeap.forEach((numTuple) => {
    result.push(numTuple[0])
  })
  return result
}
