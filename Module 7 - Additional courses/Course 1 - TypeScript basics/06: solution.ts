// Напишите функцию, которая возвращает массив четных чисел из массива numbers.

const numbers = [1, 3, 8, 9, 100, 23, 55, 34];

const getEvenNumbers = () => numbers.filter((num) => num % 2 === 0);

export default getEvenNumbers;

/* __tests__ */

import * as ta from 'type-assertions';

import getEvenNumbers from '../solution';

test('function', () => {
  expect(getEvenNumbers()).toEqual([8, 100, 34]);

  ta.assert<ta.Equal<ReturnType<typeof getEvenNumbers>, number[]>>();
});
