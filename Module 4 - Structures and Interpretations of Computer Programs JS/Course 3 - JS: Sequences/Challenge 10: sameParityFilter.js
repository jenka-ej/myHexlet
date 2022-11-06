// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список и возвращает новый, 
// состоящий из элементов, у которых такая же чётность, как и у первого элемента входного списка.

import { l, isEmpty, head, tail, filter, toString as listToString } from '@hexlet/pairs-data';

const sameParity = (list) => {
  if (isEmpty(list)) {
    return list;
  }
  if (head(list) % 2 === 0) {
    return filter((el) => el % 2 === 0, list);
  }
  return filter((el) => el % 2 !== 0, list);
};
export default sameParity;

/* __tests__ */

import { l, toString as listToString } from '@hexlet/pairs-data';
import sameParity from '../sameParityFilter.js';

test('SameParity', () => {
  const result = sameParity(l(5, 0, 1, -3, 10));
  expect(listToString(result)).toBe(listToString(l(5, 1, -3)));

  const result2 = sameParity(l(2, 0, 1, -3, 10, -2));
  expect(listToString(result2)).toBe(listToString(l(2, 0, 10, -2)));

  const result3 = sameParity(l(-1, 0, 1, -3, 10, -2));
  expect(listToString(result3)).toBe(listToString(l(-1, 1, -3)));

  const result4 = sameParity(l(10, -1.5, 1.3, -3, 25, -2));
  expect(listToString(result4)).toBe(listToString(l(10, -2)));

  const result5 = sameParity(l());
  expect(listToString(result5)).toBe(listToString(l()));
});
