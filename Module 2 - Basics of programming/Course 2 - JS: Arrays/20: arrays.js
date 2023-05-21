// Реализуйте и экспортируйте функцию getMax(), которая ищет в массиве максимальное значение и возвращает его.

export const getMax = (coll) => {
  if (coll.length === 0) {
    return null;
  }

  let [max, ...rest] = coll;
  for (const value of rest) {
    if (value > max) {
      max = value;
    }
  }

  return max;
};

/* __tests__ */

import { getMax } from '../arrays.js';

test('max', () => {
  expect(getMax([])).toEqual(null);
  expect(getMax([1, 10, 8])).toEqual(10);
  expect(getMax([11, -3, 8, 1])).toEqual(11);
  expect(getMax([1, 8, -3, 11])).toEqual(11);
});
