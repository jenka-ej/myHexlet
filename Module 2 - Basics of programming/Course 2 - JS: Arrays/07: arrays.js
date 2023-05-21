// Реализуйте и экспортируйте по умолчанию функцию. Она должна высчитывать сумму всех элементов массива, которые делятся без остатка на три.
// В случае пустого массива функция должна вернуть 0 (для этого в коде можно использовать guard expression).

const calculateSum = (coll) => {
  let sum = 0;
  for (let i = 0; i < coll.length; i += 1) {
    const value = coll[i];
    if (value % 3 === 0) {
      sum += value;
    }
  }

  return sum;
};

export default calculateSum;

/* __tests__ */

import calculateSum from '../arrays.js';

describe('calculateSum', () => {
  it('#calculate', () => {
    const coll1 = [8, 9, 21, 19, 18, 22, 7];
    expect(calculateSum(coll1)).toBe(48);

    const coll2 = [2, 0, 17, 3, 9, 15, 4];
    expect(calculateSum(coll2)).toBe(27);
  });

  it('#should be zero', () => {
    const coll1 = [2, 17, 4, 10, 16, 14, 1];
    expect(calculateSum(coll1)).toBe(0);

    const coll2 = [];
    expect(calculateSum(coll2)).toBe(0);
  });
});
