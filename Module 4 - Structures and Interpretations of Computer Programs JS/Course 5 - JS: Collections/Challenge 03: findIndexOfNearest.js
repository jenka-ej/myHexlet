// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив чисел и искомое число. 
// Задача функции — найти в массиве ближайшее число к искомому и вернуть его индекс в массиве. 
// Если в массиве содержится несколько чисел, одновременно являющихся ближайшими к искомому числу, то возвращается наименьший из индексов ближайших чисел.

const findIndexOfNearest = (array, num) => {
  if (array.length === 0) {
    return null;
  }
  const diff = array.map((digit) => Math.abs(digit - num));
  const min = Math.min(...diff);
  let result;
  for (let i = 0; i < diff.length; i += 1) {
    if (diff[i] === min) {
      result = diff.indexOf(diff[i]);
      break;
    }
  }
  return result;
};
export default findIndexOfNearest;

/* __tests__ */

import findIndexOfNearest from '../findIndexOfNearest.js';

it('findIndexOfNearest', () => {
  expect(findIndexOfNearest([], 2)).toBeNull();
  expect(findIndexOfNearest([10], 0)).toBe(0);
  expect(findIndexOfNearest([10, 15], 0)).toBe(0);
  expect(findIndexOfNearest([15, 10], 0)).toBe(1);
  expect(findIndexOfNearest([15, 10], 12)).toBe(1);
  expect(findIndexOfNearest([15, 10, 3, 4], 0)).toBe(2);
  expect(findIndexOfNearest([7, 5, 3, 2], 4)).toBe(1);
  expect(findIndexOfNearest([7, 5, 4, 4, 3, 6], 4)).toBe(2);
});
