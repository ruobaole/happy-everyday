// https://www.educative.io/courses/grokking-the-coding-interview/xVlyyv3rR93
//
// Similar to the Meeting Room Problem
// The problem is to find the maximum overlaps of the jobs of all time, and add up
//  their CPU loads.
// 1. to determine if a job overlaps with another one:
//  first, find the one that starts later
//  see if the later one's starting time lies within the range of the former one
// 2. Thus, to get the overlap of jobs of all time, we can use a minHeap (order by the
//  end time of all jobs) -- why end time, because that will make it easier to determine if
//  a new job is overlapping with the current ones
// 3. We also need to sort jobs on their starting time -- to maintain the minHeap
// Thus, we iterate through all jobs, each time, pop all jobs from the minHeap that is
//  not overlapping with the current one, update the load.
// The max load of all time is the result.
//
// Time: O(NlogN) - sorting takes O(NlogN) time; while iterating, we might need to poll/offer
//  to the priority queue, the process takes O(logN) time
// Space: O(N) - the sorting takes O(N) space; at worst case, we also need to insert N jobs into
//  the priority queue

import { Heap } from 'typescript-collections'

export const maxCPULoad = (jobs: number[][]): number => {
  let maxLoad = 0
  let curLoad = 0
  jobs.sort((a, b) => a[0] - b[0])
  // stores [endtime, load] in heap
  const minHeap = new Heap<number[]>((a, b) => b[0] - a[0])
  jobs.forEach((job) => {
    while (!minHeap.isEmpty() && (minHeap.peek() || [0, 0])[0] <= job[1]) {
      const poppedJob = minHeap.removeRoot()
      if (poppedJob) {
        curLoad -= poppedJob[1]
      }
    }
    minHeap.add([job[1], job[2]])
    curLoad += job[2]
    maxLoad = Math.max(maxLoad, curLoad)
  })
  return maxLoad
}
