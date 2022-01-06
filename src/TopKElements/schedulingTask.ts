// https://www.educative.io/courses/grokking-the-coding-interview/JYB20zgR32o
//
// We follow the same greedy approach as in problem 'rearrange string k distance
//  apart' to extract the task with the most frequency at each time.
// The task need k intervals to cool, which means the same task should be at least
//  k+1 distance apart.
// We can, at each iteration, try to execute as many as k+1 tasks.
// While extracting, we push them into a waiting list.
// After extracting, we added back all tasks in the waitinglist to the maxHeap
// Now, we check if the maxHeap is empty (are there still tasks waiting to be
//   executed) and we have executed k+1 tasks in this iteration.
// If there're still tasks waiting and we cannot execute k+1 tasks, we have to
//  idle in the rest intervals.
// Until the maxHeap reaches empty
//
// Time: each task in the input array is extract only once, hence O(NlogD)
// Space: O(N)

import { Heap } from 'typescript-collections'

interface TaskFreq {
  task: string
  freq: number
}

export const scheduleTasks = (tasks: string[], k: number): number => {
  const taskFreq: Record<string, number> = {}
  tasks.forEach((task) => {
    if (taskFreq[task] === undefined) {
      taskFreq[task] = 0
    }
    taskFreq[task] += 1
  })
  const maxHeap = new Heap<TaskFreq>((a, b) => a.freq - b.freq)
  Object.keys(taskFreq).forEach((task) => {
    maxHeap.add({
      task,
      freq: taskFreq[task]
    })
  })
  let cnt = 0
  const waitingList: TaskFreq[] = []
  while (maxHeap.size() > 0) {
    // 1. extract as many as k+1 tasks
    let i = 0
    while (maxHeap.size() > 0 && i < k + 1) {
      const curT = maxHeap.removeRoot() as TaskFreq
      if (curT.freq - 1 > 0) {
        curT.freq -= 1
        waitingList.push(curT)
      }
      i += 1
      cnt += 1
    }
    // 2. push the waitinglist back to heap
    while (waitingList.length > 0) {
      maxHeap.add(waitingList.shift() as TaskFreq)
    }
    // 3. we only need to idle if there're still tasks
    //  waiting to be executed and we cannot add all k+1
    //  in this iteration
    if (maxHeap.size() > 0 && i < k + 1) {
      cnt += k + 1 - i
    }
  }
  return cnt
}
