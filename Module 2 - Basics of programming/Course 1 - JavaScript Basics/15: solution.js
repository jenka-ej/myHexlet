// Теперь ваша очередь посмотреть на сигнатуру функции в документации и разобраться, как её использовать. 
// Можете читать документацию на русском языке, но программист должен уметь читать документацию на английском. 
// Используйте словари или переводчики при необходимости. Лучше сразу привыкать и подтягивать навыки чтения на английском, иначе будут сложности в будущем.
// В Math есть функция ceil(). Изучите её документацию.
// Напишите программу, которая использует функцию Math.ceil() с константой number и выводит результат на экран.

console.log(Math.ceil(number));

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
  const expected = '924';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
