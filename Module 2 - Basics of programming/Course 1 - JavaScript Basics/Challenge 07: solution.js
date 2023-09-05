// Реализуйте и экспортируйте по умолчанию функцию, которая переворачивает цифры в переданном числе и возвращает новое число.

// Примеры:
// reverseInt(13); // 31
// reverseInt(-123); // -321
// reverseInt(8900); // 98


const reverseInt = (num) => {
  if (num < 0) {
    return Number(String(Math.abs(num)).split('').reverse().join('')) * -1;
  }
  return Number(String(num).split('').reverse().join(''));
};

export default reverseInt;

/* __tests__ */

import reverseInt from '../solution.js';

test('reverseInt', () => {
  expect(reverseInt(12)).toBe(21);
  expect(reverseInt(-122)).toBe(-221);
  expect(reverseInt(8900)).toBe(98);
});
