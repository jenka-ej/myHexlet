// Функция Math.random() возвращает случайное число от 0 до 1 с большим количеством знаков после запятой. 
// Но в реальных задачах бывает нужно получать случайные целые числа, например, в диапазоне от 0 до 10. 
// Реализуйте код, который выводит на экран именно такое число. Для этой задачи вам понадобятся функции Math.random() и Math.floor()
// Попробуйте решить это задание в одну строчку.

console.log(Math.floor(Math.random() * 11));

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
  await import(getPathToSolution());

  const output = spy.mock.calls.join('\n');
  expect(output).not.toEqual('');
  const value = Number(output);
  expect(Number.isInteger(value)).toEqual(true);
  expect(value).toBeGreaterThanOrEqual(0);
  expect(value).toBeLessThanOrEqual(10);
});
