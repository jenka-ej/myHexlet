// Модифицируйте функцию printNumbers() так, чтобы она выводила числа в обратном порядке. Для этого нужно идти от верхней границы к нижней. 
// То есть счётчик должен быть инициализирован максимальным значением, а в теле цикла его нужно уменьшать до нижней границы.

const printNumbers = (initialNumber) => {
  let i = initialNumber;
  while (i >= 1) {
    console.log(i);
    i -= 1;
  }
  console.log('finished!');
};

export default printNumbers;

/* __tests__ */

import {
  jest, test, beforeEach, expect,
} from '@jest/globals';
import printNumbers from '../solution.js';

let spy;
const logs = [];

beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation((...args) => logs.push(args));
});

test('solution output', async () => {
  const expected = '6\n5\n4\n3\n2\n1\nfinished!';
  printNumbers(6);

  const output = logs.join('\n');
  expect(output).toEqual(expected);
});
