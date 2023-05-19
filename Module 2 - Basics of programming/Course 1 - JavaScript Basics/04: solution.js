// Напишите программу, которая считает и выводит на экран последовательно (по одному значению в каждой строке) значения следующих математических выражений:
// 1) 3 в степени 5
// 2) -8 разделить на -4
// 3) остаток от деления 100 на 3
// 4) сумму трёх предыдущих выражений

console.log(3 ** 5);
console.log(-8 / -4);
console.log(100 % 3);
console.log((3 ** 5) + (-8 / -4) + (100 % 3));

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
  const expected = '243\n2\n1\n246';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
