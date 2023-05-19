// Выведите на экран строку Do you want to eat, <name>?, где вместо <name> должна использоваться константа stark. Вывод должен получиться таким:
// Do you want to eat, Arya?

const stark = 'Arya';
console.log(`Do you want to eat, ${stark}?`);

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
  const expected = 'Do you want to eat, Arya?';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
