// Реализуйте и экспортируйте по умолчанию функцию, которая высчитывает среднее арифметическое элементов переданного массива.
// В случае пустого массива функция должна вернуть значение null (используйте в коде для этого guard expression).

export default (coll) => {
  const itemsCount = coll.length;

  if (itemsCount === 0) {
    return null;
  }

  let sum = 0;
  for (const item of coll) {
    sum += item;
  }

  return sum / itemsCount;
};

/* __tests__ */

import calculateAverage from '../arrays.js';

describe('calculateAverage', () => {
  it('#calculate', () => {
    const temperatures1 = [37.5, 34, 39.3, 40, 38.7, 41.5];
    expect(calculateAverage(temperatures1)).toBe(38.5);

    const temperatures2 = [36, 37.4, 39, 41, 36.6];
    expect(calculateAverage(temperatures2)).toBe(38);
  });

  it('#should be null', () => {
    const temperatures = [];
    expect(calculateAverage(temperatures)).toBeNull();
  });
});
