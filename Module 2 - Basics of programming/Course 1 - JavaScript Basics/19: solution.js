// Оператор typeof позволяет определить тип передаваемого операнда. Название типа возвращается в виде строки. 
// Например, вызов typeof 'go go go' вернёт строку 'string' (number — число).
// console.log(typeof 3); // => 'number'
// Выведите на экран тип значения константы motto.

const motto = 'Family, Duty, Honor';

console.log(typeof motto);

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
  const expected = 'string';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
