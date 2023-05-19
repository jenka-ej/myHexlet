// Посчитайте программно (а не в голове) минимальное число среди 3, 10, 22, -3, 0 — и выведите его на экран. 
// Воспользуйтесь функцией Math.min(), которая работает аналогично Math.max().

console.log(Math.min(3, -3, 10, 22, 0));

/* __tests__ */

import {
  jest, test, beforeEach, expect,
} from '@jest/globals';

const getPathToSolution = () => `${process.cwd()}/solution.js`;

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log');
});

test('solution output', async () => {
  const expected = '-3';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
