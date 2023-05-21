// С помощью метода .slice() получите часть предложения, записанного в константу text, c 5 по 15 символы включительно. 
// Полученную подстроку обработайте методом .trim() и выведите на экран длину итоговой подстроки. 
// Выполните эти методы подряд в цепочке без создания промежуточных переменных:
// 1) slice()
// 2) trim()

const text = 'When \t\n you play a \t\n game of thrones you win or you die.';

console.log(text.slice(4, 15).trim().length);

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
  const expected = '7';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
