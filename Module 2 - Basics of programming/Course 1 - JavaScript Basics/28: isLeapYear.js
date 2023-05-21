// Реализуйте функцию isLeapYear(), которая определяет, является ли год високосным или нет. 
// Год будет високосным, если он кратен (то есть делится без остатка) 400 или он одновременно кратен 4 и не кратен 100. 
// Как видите, в определении уже заложена вся необходимая логика, осталось только переложить её на код.

const isLeapYear = (year) => {
  const result = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  return result;
};

export default isLeapYear;

/* __tests__ */

import { test, expect } from '@jest/globals';
import isLeapYear from '../isLeapYear';

test('isLeapYear', () => {
  expect(isLeapYear(2016)).toBe(true);
  expect(isLeapYear(2000)).toBe(true);
  expect(isLeapYear(2017)).toBe(false);
  expect(isLeapYear(2018)).toBe(false);
  expect(isLeapYear(1900)).toBe(false);
});
