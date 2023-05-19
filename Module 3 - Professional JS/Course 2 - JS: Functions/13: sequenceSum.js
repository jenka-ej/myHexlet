// Допишите (с использованием рекурсивного процесса) функцию sequenceSum(), которая находит сумму последовательности целых чисел. 
// Последовательность задается двумя значениями: begin - начало последовательности, end - конец последовательности. 
// Например: begin = 2 и end = 6 дают нам такую последовательность 2, 3, 4, 5, 6. Сумма такой последовательности будет: 20.

const sequenceSum = (begin, end) => {
  if (begin > end) {
    return NaN;
  }
  if (begin === end) {
    return begin;
  }
  return begin + sequenceSum(begin + 1, end);
};

export default sequenceSum;

/* __tests__ */

import sequenceSum from '../sequenceSum';

test('solution', () => {
  expect(sequenceSum(0, 0)).toBe(0);
  expect(sequenceSum(1, 1)).toBe(1);
  expect(sequenceSum(1, 5)).toBe(15);
  expect(sequenceSum(2, 6)).toBe(20);
  expect(sequenceSum(-1, -1)).toBe(-1);
  expect(sequenceSum(-5, 4)).toBe(-5);
  expect(Number.isNaN(sequenceSum(2, 1))).toBe(true);
  expect(Number.isNaN(sequenceSum(1, -5))).toBe(true);
});
