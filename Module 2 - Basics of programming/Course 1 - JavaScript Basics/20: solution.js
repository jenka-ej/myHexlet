// Данные, вводимые пользователями, часто содержат лишние пробельные символы в конце или начале строки. 
// Обычно их вырезают с помощью метода .trim(), например, было: ' hello\n ', стало: 'hello'.
// Обновите переменную firstName записав в неё то же самое значение, но обработанное методом .trim(). Распечатайте то, что получилось, на экран.

let firstName = '  Grigor   \n';

firstName = firstName.trim();
console.log(firstName);

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
  const expected = 'Grigor';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
