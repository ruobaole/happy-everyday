import { twoSum } from './twoSum'

test('case1', () => {
  const input1 = [1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1]
  const input2 = 11
  const output = [5, 11]
  expect(twoSum(input1, input2)).toStrictEqual(output)
})
