// https://www.educative.io/courses/grokking-the-coding-interview/xVoBRZz7RwP
//
// We use an array to keep record of all the meetings we need and the last ending time of meetings
//  in that room.
// 1. sort the meetings on their end time
// 2. iterate every meeting
//   inspect every meeting room and see if we can assign the meeting in that room:
//   if meeting.start < roomN's last end -> cannot assign it in that room, must assign a new room.
//    insert a room in room array with last end === meeting.end
//   else (meeting.start >= roomN' last end) -> can assign it to roomN, but have to update the room's
//    last end -- room.lastend = meeting.end
// 3. when there are more than one available meeting rooms, we should assign the meeting to the room that
//   ends later. Because in that way, we can make more use of the meeting rooms' vacancy time, so that
//   the rest meetings may make use of.
// return the length of our room array
//
// Time: O(N^2) -- if we need N rooms for N meetings, actually in every itereation, we only inspect room0
//  but the number of room we need to inspect is at most N

import { Interval } from './mergeIntervals'

export const minMeetingRooms = (meetings: Interval[]): number => {
  const rooms: number[] = []
  meetings.sort((a, b) => a.end - b.end)
  meetings.forEach((meeting) => {
    let idx = rooms.length - 1
    while (idx >= 0 && meeting.start < rooms[idx]) {
      idx -= 1
    }
    if (idx >= 0) {
      // room #idx is available
      rooms[idx] = meeting.end
    } else {
      // no rooms are available, assign new
      rooms.push(meeting.end)
    }
  })
  return rooms.length
}

// Solution 2.
// Another way of thinking the problem is, say we have N meetings that mutually overlapped with
//  each other, then N rooms are needed.
// If any one of the meeting is mutually exclusive with any one another of the meeting, we can reduce
//  the room number needed by 1.
// Hence, the problem calls us to find the maxmum number of the 'mutually overlapped meetings'. That is
//  the room number we need.
// To determine if m2 is overlapped with m1, say m2 has a larger starting time, we need to see if
//  m2.start < m1.end.
// Thus, we use a minHeap to store all the current overlapped meetings, according to their end time -- why?
//  becasue each time to determine if the new meeting overlaps with the current ones, we need to compare
//  newMeeting.start with minHeap.peek().start repeatedly.
// The process are as follows:
// 1. sort the meeting on staring times so that it is easier to see if the meeting overlaps with the current
//  overlapping group.
// 2. iterate through the meeting, each time
//  pop all from the minHeap (according to the end time), -- not overlapped meetings
//  push in the new meeting
//  record the minHeap's size
// 3. the largest size of the minHeap of all time is the number of rooms needed.
