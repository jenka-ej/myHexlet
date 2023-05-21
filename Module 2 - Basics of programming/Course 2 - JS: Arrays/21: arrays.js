// Реализуйте и экспортируйте функцию flatten(). Эта функция принимает на вход массив и выпрямляет его: если элементами массива являются массивы, 
// то flatten сводит всё к одному массиву, раскрывая один уровень вложенности.

export const flatten = (coll) => {
  let result = [];
  for (const item of coll) {
    if (Array.isArray(item)) {
      result = [...result, ...item];
    } else {
      result = [...result, item];
    }
  }

  return result;
};

/* __tests__ */

import { flatten } from '../arrays.js';

test('flatten', () => {
  expect(flatten([])).toEqual([]);
  expect(flatten([1, [3, 2], 9])).toEqual([1, 3, 2, 9]);
  expect(flatten([[9, 8], [], [0], 10])).toEqual([9, 8, 0, 10]);
  expect(flatten([1, [[2], [3]], [9]])).toEqual([1, [2], [3], 9]);
});
