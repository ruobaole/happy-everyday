// https://www.educative.io/courses/grokking-the-coding-interview/B6x69OLX4jY
//
// While selecting projects, we have 2 constraints --
//  1) we have enough capital the project needs
//  2) there is a max number of projects we can select
// While selecting projects, we should do the following 2 things --
//  1) find all the projects with the available capital
//  2) from the project list, select the one with the max profit
// Thus, this is a greedy approach. If without two heaps, we have to
//   repeatedly scan the capital and profits lists everytime to generate
//   the greedy result.
// If using two heaps. we can use one minHeap to store all the capitals.
// In each round of selecting projects,
//  1) pop all from the minHeap that has available capitals
//  2) while popping, pushing these projects' profits into the maxHeap;
//    all projects in the maxHeap are projects that are available (and will
//    continuously be available from now on)
//  3) pop the top project from the maxHeap -- the project selected in this round
//  NOTE that it is possible that we can still select projects under the numberOfProjects
//    constraint, but based on the capital we have, there're no available projects --
//  thus, we still need to break in this situation
// Repeat the process in each round. Because the two heaps allow us to store the
//  the available projects' profits, we can save time of scanning the list to find
//  the available projects with max profits in each round.
//
// Time:
//  1) populating minHeap -- O(NlogN)
//  2) popping from the maxHeap in all rounds -- O(klogN) -- k is the numberOfProjects
// Space: O(N) -- the maxHeap can have as much as N elements

import { Heap } from 'typescript-collections'

export const findMaxCapital = (
  capital: number[],
  profits: number[],
  numberOfProjects: number,
  initialCapital: number
): number => {
  // [projectIndex, capital]
  const minHeap = new Heap<[number, number]>((a, b) => b[1] - a[1])
  // store the profits of the available projects
  const maxHeap = new Heap<number>((a, b) => a - b)
  capital.forEach((cap, idx) => {
    minHeap.add([idx, cap])
  })
  let curCap = initialCapital
  while (numberOfProjects > 0) {
    // 1. get available projects
    while (
      minHeap.peek() !== undefined &&
      (minHeap.peek() as [number, number])[1] <= curCap
    ) {
      const projCap = minHeap.removeRoot() as [number, number]
      if (projCap[0] < profits.length) {
        maxHeap.add(profits[1])
      }
    }
    // 2. select project
    if (maxHeap.size() > 0) {
      const selectedProfit = maxHeap.removeRoot() as number
      curCap += selectedProfit
      numberOfProjects -= 1
    } else {
      // we need to terminate if we cannot find any more available projects
      break
    }
  }
  return curCap
}

// review practice //

// Because the total number of projects to select is limited, in each round
//  for all the projects that are available, we need to first pick the one
//  with larger profit.
// Two heaps -- one to check projects' availability (constraint), the other one is a maxHeap
//  to store all available projects based on their profits
// In each round of selection, we perform greedy strategy with some constraints.
// 1. pop all from the minHeap (ordered by the projects' capitals) that are available
//  for our current capital;
//  push them into the maxHeap (ordered by the projects' profits);
// 2. from the maxHeap, pop the top one which has the largest profit
// Iterate until the total number of the projects selected reach the limit
//
// Time: O(NlogN) bounded by initial the minHeap -- add all projects to the minHeap
// Space: O(N) -- heap size

export const findMaxCapital_r1 = (
  capital: number[],
  profits: number[],
  numberOfProjects: number,
  initialCapital: number
): number => {
  // [capital, projectIdx]
  const minHeap: Heap<[number, number]> = new Heap((a, b) => b[0] - a[0])
  // profit
  const maxHeap: Heap<number> = new Heap((a, b) => a - b)
  let curCapital = initialCapital
  let cnt = 0
  capital.forEach((cap, idx) => minHeap.add([cap, idx]))
  while (cnt < numberOfProjects) {
    // 1. get all available projects from the minHeap
    while (
      minHeap.peek() !== undefined &&
      (minHeap.peek() as [number, number])[0] <= curCapital
    ) {
      const minHeapRoot = minHeap.removeRoot()
      if (minHeapRoot !== undefined) {
        maxHeap.add(profits[minHeapRoot[1]])
      }
    }
    // 2. pick the one with the largest profit
    const maxHeapTop = maxHeap.removeRoot()
    if (maxHeapTop !== undefined) {
      curCapital += maxHeapTop
      cnt += 1
    }
  }
  return curCapital
}

//--- r2 ---//
//
// Because we get the the profit for the invested project once we
//  select it -- our total capital would never decrease -- we do not
//  need to care the capitial of the projects;
// Every time, for all the projects available (affordable) for us, pick
//  the one with the max profit -- greedy with constraints;
// We use 2 heaps:
// - minHeap for the constraints; so that we can pull out all projects
//  affordable easily
// - maxHeap for the gready pick; while popping out from the minHeap, push
//  their profits into the maxHeap so that we can pick the one with the max
//  profit easily
//
// Time: O(NlogN) - the size of the minHeap is inited to be N; and we at most
//  pops all the elements out -- hence N rounds -- O(NlogN)
// Space: O(N) -- the size of the minHeap

export function maxCapital(
  capitial: number[],
  profits: number[],
  numberOfProjects: number,
  initialCapital: number
): number {
  if (
    capitial.length === 0 ||
    profits.length === 0 ||
    capitial.length !== profits.length
  ) {
    return 0
  }
  // [capital, projectIndex]
  const minHeap = new Heap<[number, number]>((a, b) => b[0] - a[0])
  const maxHeap = new Heap<number>((a, b) => a - b)
  capitial.forEach((cap, idx) => {
    minHeap.add([cap, idx])
  })
  let totalCap = initialCapital
  while (numberOfProjects > 0) {
    while (minHeap.peek() !== undefined && minHeap.peek()[0] <= totalCap) {
      const [projCap, idx] = minHeap.removeRoot()
      maxHeap.add(profits[idx])
    }
    if (!maxHeap.isEmpty()) {
      totalCap += maxHeap.removeRoot() as number
    } else {
      break
    }
    numberOfProjects -= 1
  }
  return totalCap
}
