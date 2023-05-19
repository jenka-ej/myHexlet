// Напишите программу, которая берет исходное количество евро, записанное в константу eurosCount, переводит евро в доллары и выводит на экран.
// Затем полученное значение переводит в рубли и выводит на новой строчке.

const dollarsCount = eurosCount * 1.25;
console.log(dollarsCount);
const rublesCount = dollarsCount * 60;
console.log(rublesCount);

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
  const expected = '125\n7500';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
