// https://www.educative.io/courses/grokking-the-coding-interview/YQykDmBnvB0
//
// Solution 1 is to just pull all employees' working time into one large table
//  sort them by their starting time;
//  iterate the list, merge consecutive intervals, keep record of the last one (no matter it is
//  merged or not), compare the new interval with the merged one to see if a free time window
//  exists.
// This takes O(NlogN) time.
//
// However since each employee's list have already been sorted by their starting time, we can use
//  a minHeap to store the intervals so that we can always get the one with the minimum starting time
//  right now.
// 1. push k employee's 1st interval into the minHeap
// 2. each time, get the top from the minHeap, compare it with the last interval we have (no matter it
//   is a merged one or not)
//   also, if the two overlaps, we need to merge them and update the last interval
//   every time we popped out one interval, we also need to insert in the same person's next interval,
//
// Time: this solution also calls for O(N) iteration of all the interval list. And the pop/push of the minHeap
//   takes O(logN) time. -- thus, O(NlogN)

import { Interval } from './mergeIntervals'
import { Heap } from 'typescript-collections'

export const findEmployeeFreeTime = (schedule: Interval[][]): Interval[] => {
  const k = schedule.length // k is the number of employees
  const result: Interval[] = []
  // store [start, end, employeeIdx, intervalIdx_in_employee_list] into minHeap
  const minHeap = new Heap<number[]>((a, b) => b[0] - a[0])
  for (let i = 0; i < k; i += 1) {
    if (schedule[k].length === 0) {
      return result
    }
    minHeap.add([schedule[k][0].start, schedule[k][0].end, i, 0])
  }

  const lastIt = minHeap.peek()
  while (lastIt !== undefined && !minHeap.isEmpty()) {
    const curIt = minHeap.removeRoot() as number[]
    if (lastIt[1] < curIt[0]) {
      // if the current interval and the last interval merged share a free window
      const free = new Interval(lastIt[1], curIt[0])
      result.push(free)
    } else {
      // if the two overlaps, merge the two and update the last interval
      lastIt[1] = Math.max(lastIt[1], curIt[1])
    }
    // push in new intevals from the same person of curIt if the new intervals exists
    const employeeIdx = curIt[2]
    const intervalIdx = curIt[3]
    const newIntervalIdx = intervalIdx + 1
    if (newIntervalIdx < schedule[employeeIdx].length) {
      minHeap.add([
        schedule[employeeIdx][newIntervalIdx].start,
        schedule[employeeIdx][newIntervalIdx].end,
        employeeIdx,
        newIntervalIdx
      ])
    }
  }
  return result
}
