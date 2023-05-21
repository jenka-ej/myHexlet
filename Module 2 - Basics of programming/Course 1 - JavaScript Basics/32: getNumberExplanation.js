// Реализуйте функцию getNumberExplanation(), которая принимает на вход число и возвращает объяснение этого числа. 
// Если для числа нет объяснения, то возвращается just a number. Объяснения есть только для следующих чисел:
// * 666 - devil number
// * 42 - answer for everything
// * 7 - prime number

const getNumberExplanation = (number) => {
  switch (number) {
    case 666:
      return 'devil number';
    case 7:
      return 'prime number';
    case 42:
      return 'answer for everything';
    default:
      return 'just a number';
  }
};

export default getNumberExplanation;

/* __tests__ */

import { test, expect } from '@jest/globals';
import getNumberExplanation from '../getNumberExplanation';

test('getNumberExplanation', () => {
  expect(getNumberExplanation(0)).toBe('just a number');
  expect(getNumberExplanation(666)).toBe('devil number');
  expect(getNumberExplanation(42)).toBe('answer for everything');
  expect(getNumberExplanation(7)).toBe('prime number');
});
