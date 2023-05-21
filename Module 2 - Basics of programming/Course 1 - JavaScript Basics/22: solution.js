// Реализуйте функцию с именем printMotto(), которая выведет на экран фразу Winter is coming.
// printMotto(); // => "Winter is coming"
// В задачах, в которых нужно реализовать функцию, эту функцию вызывать не нужно. 
// Вызывать функцию будут автоматизированные тесты, которые проверяют его работоспособность. 
// Пример с вызовом выше показан только для того, чтобы вы понимали, как ваша функция будет использоваться.

const printMotto = () => {
  console.log('Winter is coming');
};

export default printMotto;

/* __tests__ */

import {
  jest, test, beforeEach, expect,
} from '@jest/globals';
import printMotto from '../solution.js';

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation(() => {});
});

test('solution output', async () => {
  const expected = 'Winter is coming';
  printMotto();

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
