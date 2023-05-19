// Реализуйте и экспортируйте по умолчанию функцию, которая проверяет переданное число на простоту и печатает на экран yes или no.

const isPrime = (num) => {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const sayPrimeOrNot = (num) => {
  const text = isPrime(num) ? 'yes' : 'no';
  console.log(text);
};

export default sayPrimeOrNot;

/* __tests__ */

import { jest } from '@jest/globals';
import sayPrimeOrNot from '../prime.js';

beforeEach(() => {
  console.log = jest.fn();
});

describe('should be prime', () => {
  const numbers = [2, 3, 19, 23, 47, 5, 7, 13];

  test.each(numbers)('check with %i', (num) => {
    sayPrimeOrNot(num);
    expect(console.log).toHaveBeenLastCalledWith('yes');
  });
});

describe('should not be prime', () => {
  const numbers = [49, 8, 4, 1, 0, -3, 9, 25];

  test.each(numbers)('check with number %i', (num) => {
    sayPrimeOrNot(num);
    expect(console.log).toHaveBeenLastCalledWith('no');
  });
});
