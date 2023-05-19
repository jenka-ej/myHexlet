// Выведите на экран абсолютное значение числа, находящегося в константе fruitsCount, используя функцию Math.abs(). 
// Эта функция возвращает абсолютное значение переданного числа. Абсолютное значения числа — это само это число без знака перед ним.

const fruitsCount = -2309;
console.log(Math.abs(fruitsCount));

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
  const expected = '2309';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
