// Наберите в редакторе код из задания символ в символ и нажмите «Проверить».
// console.log('Hello, World!');
// Внимание: если вы напишете heLLo, woRld! вместо Hello, World!, то это будет считаться другим текстом,
// потому что заглавные и строчные буквы — это разные символы. Размер буквы называют регистром, и говорят: регистр — важен!
// Это касается почти всего в коде, поэтому привыкайте всегда обращать внимание на регистр.

console.log('Hello, World!');

/* __tests__ */

import {
  jest, test, beforeEach, expect,
} from '@jest/globals';

const getPathToSolution = () => `${process.cwd()}/solution.ts`;

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log');
});

test('solution output', async () => {
  const expected = 'Hello, World!';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
