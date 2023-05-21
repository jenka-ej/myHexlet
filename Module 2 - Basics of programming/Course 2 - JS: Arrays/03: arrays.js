// Реализуйте и экспортируйте функцию swap(), которая меняет местами первый и последний элемент массива. 
// Если массив содержит меньше двух элементов, то он возвращается как есть.

export const swap = (items) => {
  if (items.length < 2) {
    return items;
  }
  const lastIndex = items.length - 1;
  const last = items[lastIndex];
  items[lastIndex] = items[0];
  items[0] = last;

  return items;
};

/* __tests__ */

import { swap } from '../arrays.js';

test('get', () => {
  expect(swap([])).toEqual([]);
  expect(swap([1])).toEqual([1]);
  expect(swap([1, 2])).toEqual([2, 1]);
  expect(swap(['one', 'two', 'three'])).toEqual(['three', 'two', 'one']);
  expect(swap(['one', 'two', 'three', 'four'])).toEqual(['four', 'two', 'three', 'one']);
});
