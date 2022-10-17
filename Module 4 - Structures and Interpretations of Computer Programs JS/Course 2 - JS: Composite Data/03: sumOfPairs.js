// Реализуйте функцию sumOfPairs(), которая принимает на вход две пары и возвращает новую пару, в элементах которой находятся суммы элементов из исходных пар.

import { cons, car, cdr, toString } from '@hexlet/pairs'; 

const sumOfPairs = (pair1, pair2) => {
  const sumCar = car(pair1) + car(pair2);
  const sumCdr = cdr(pair1) + cdr(pair2);
  return cons(sumCar, sumCdr);
};
export default sumOfPairs;

/* __tests__ */

import { cons, toString } from '@hexlet/pairs';
import sumOfPairs from '../sumOfPairs.js';

test('sumOfPairs', () => {
  expect(toString(sumOfPairs(cons(1, 8), cons(8, 3)))).toBe(toString(cons(9, 11)));
  expect(toString(sumOfPairs(cons(10, -1), cons(93, 100)))).toBe(toString(cons(103, 99)));
});
