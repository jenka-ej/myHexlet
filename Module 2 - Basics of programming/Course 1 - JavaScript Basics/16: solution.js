// Выведите на экран первую и последнюю буквы предложения, записанного в константу text, в следующем формате:
// First: N
// Last: t
// Постарайтесь создать только одну константу, в которую сразу запишется нужный текст перед печатью на экран. 
// В этом уроке мы отрабатываем умение собирать составное выражение.

import length from './src/string.js';

const text = 'Never forget what you are, for surely the world will not';

const result = `First: ${text[0]}\nLast: ${text[length(text) - 1]}`;
console.log(result);

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
  const expected = 'First: N\nLast: t';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
