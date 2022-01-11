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

//--- r1 ---//

// Count the frequency of the tasks, in each iteration, we should greedily
// pull out the task with the largest frequency and process it as high priority.
// Hence, we use a maxHeap to store the task with their frequencies.
// Inorder for the task to cool, we also need a queue to serve as the waiting list.
// The queue keep record of the last executed at most K tasks.
// In each iteration:
// 1. pull out the top of the heap and executed it.
// 2. decrease its freq and add it to the queue
// 3. if the queue's length === k+1, we should pull out the front of the queue, if
//  the front's freq > 0, add it back to the maxHeap so that it can be furtherly executed.
// 4. if not, we have to first idle. we idle for k+1 - queue.length intervals. and pull out the
//  front of the queue and add it to the heap
// We do not need to output the executing array, but only count the intervals.
//
// Time: O(N + NlogD)
// Space: O(N)

type TaskTuple = {
  task: string
  freq: number
}

export const scheduleTasks_r1 = (tasks: string[], k: number): number => {
  const freqMap: Record<string, number> = {}
  tasks.forEach((task) => {
    if (freqMap[task] === undefined) {
      freqMap[task] = 0
    }
    freqMap[task] += 1
  })
  const maxHeap = new Heap<TaskTuple>((a, b) => a.freq - b.freq)
  Object.keys(freqMap).forEach((task) => {
    maxHeap.add({ task, freq: freqMap[task] })
  })
  let cnt = 0
  const queue: TaskTuple[] = []
  while (maxHeap.size() > 0) {
    const top = maxHeap.removeRoot() as TaskTuple
    cnt += 1
    top.freq -= 1
    queue.push(top)
    if (queue.length < k + 1) {
      // we have to idle for the rest intervals before we can
      // execute the next
      cnt += k + 1 - queue.length
    }
    const front = queue.shift() as TaskTuple
    if (front.freq > 0) {
      maxHeap.add(front)
    }
  }
  return cnt
}
