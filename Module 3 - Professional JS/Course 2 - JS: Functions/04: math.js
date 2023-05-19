// Реализуйте и экспортируйте по умолчанию функцию, которая возвращает среднее арифметическое всех переданных аргументов. 
// Если функции не передать ни одного аргумента, то она должна вернуть null.

import _ from 'lodash';

const average = (...numbers) => {
  const count = numbers.length;

  if (count === 0) {
    return null;
  }

  return _.sum(numbers) / count;
};

export default average;

/* __tests__ */

import average from '../math.js';

it('average', () => {
  expect(average(0)).toBe(0);
  expect(average(0, 10)).toBe(5);
  expect(average(-3, 4, 2, 10)).toBe(3.25);
  expect(average()).toBeNull();
});
