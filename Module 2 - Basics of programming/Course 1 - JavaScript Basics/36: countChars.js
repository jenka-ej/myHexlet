// Функция countChars() из теории считает, сколько раз входит буква в предложение и при этом учитывает регистр букв. 
// То есть A и a с её точки зрения разные символы. Реализуйте вариант этой же функции, так чтобы регистр букв был не важен.

const countChars = (str, char) => {
  let i = 0;
  let count = 0;
  while (i < str.length) {
    if (str[i].toLowerCase() === char.toLowerCase()) {
      count = count + 1;
    }
    i = i + 1;
  }

  return count;
};

export default countChars;

/* __tests__ */

import { test, expect } from '@jest/globals';
import countChars from '../countChars';

test('countChars', () => {
  expect(countChars('axe', 'a')).toEqual(1);
  expect(countChars('', 'a')).toEqual(0);
  expect(countChars('OpPa', 'p')).toEqual(2);
  expect(countChars('OpPa', 'P')).toEqual(2);
});
