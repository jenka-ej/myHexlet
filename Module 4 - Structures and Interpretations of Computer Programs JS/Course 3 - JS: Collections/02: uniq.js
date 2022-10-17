// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив и возвращает новый массив, полученный из исходного удалением повторяющихся элементов.

const uniq = (array) => array.filter((item, index) => array.indexOf(item) === index);
export default uniq;

/* __tests__ */

import uniq from '../uniq.js';

test('uniq', () => {
  expect(uniq([])).toEqual([]);
  expect(uniq([2, 1])).toEqual([2, 1]);
  expect(uniq([2, 1, 2, 3])).toEqual([2, 1, 3]);
  expect(uniq([-2, 20, 0, 4, 20, 0])).toEqual([-2, 20, 0, 4]);
});
