// Реализуйте функцию joinNumbersFromRange(), которая объединяет все числа из диапазона в строку и возвращает её.

const joinNumbersFromRange = (start, finish) => {
  let i = start;
  let result = '';

  while (i <= finish) {
    result = `${result}${i}`;
    i = i + 1;
  }

  return result;
};

export default joinNumbersFromRange;

/* __tests__ */

import { test, expect } from '@jest/globals';
import joinNumbersFromRange from '../joinNumbersFromRange';

test('joinNumbersFromRange', () => {
  expect(joinNumbersFromRange(2, 2)).toEqual('2');
  expect(joinNumbersFromRange(1, 5)).toEqual('12345');
  expect(joinNumbersFromRange(10, 12)).toEqual('101112');
});
