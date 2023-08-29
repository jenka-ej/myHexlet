// Реализуйте и экспортируйте по умолчанию функцию, которая меняет в строке регистр каждой буквы на противоположный.
// Функция должна возвращать полученный результат.

const invertCase = (str) => {
  const mass = str.split('');
  return mass.map((word) => {
    if (word.toUpperCase() === word) {
      return word.toLowerCase();
    }
    return word.toUpperCase();
  }).join('');
};

export default invertCase;

/* __tests__ */

import invertCase from '../invertCase.js';

test('should work', () => {
  expect(invertCase('Hello, World!')).toBe('hELLO, wORLD!');
  expect(invertCase('I loVe JS')).toBe('i LOvE js');
});
