// https://www.educative.io/courses/grokking-the-coding-interview/3YxNVYwNR5p
//
// The Euclidean distance between a point(x, y) and the origin is sqrt(x^2 + y^2);
// Hence, we keep a maxHeap ordered by the distance between the point to the origin;
// Everytime we encounter a new point, compare it to the heapTop to see if the new point
//  is closer to the origin
// If true, we know that the point should be in the k closest points while the heaptop
//  should be kicked out
// The maxHeap maintains the k closest points.
//
// Time: O(klogk + (n - k)logk)
// Space: O(k)

import { Heap } from 'typescript-collections'

class Point {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

type PointDist = {
  point: Point
  distSq: number
}

export const kClosestPoints = (points: Point[], k: number): Point[] => {
  const result: Point[] = []
  const maxHeap = new Heap<PointDist>((a, b) => a.distSq - b.distSq)
  let idx = 0
  for (idx = 0; idx < k && idx < points.length; idx += 1) {
    maxHeap.add({
      point: points[idx],
      distSq: points[idx].x ** 2 + points[idx].y ** 2
    })
  }
  for (idx = k; idx < points.length; idx += 1) {
    if (maxHeap.peek() !== undefined) {
      const top = maxHeap.peek() as PointDist
      const newDistSq = points[idx].x ** 2 + points[idx].y ** 2
      if (newDistSq < top.distSq) {
        maxHeap.removeRoot()
        maxHeap.add({
          point: points[idx],
          distSq: points[idx].x ** 2 + points[idx].y ** 2
        })
      }
    }
  }
  maxHeap.forEach((pd) => {
    result.push(pd.point)
  })
  return result
}
