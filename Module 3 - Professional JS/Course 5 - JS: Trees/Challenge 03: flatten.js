// Реализуйте и экспортируйте по умолчанию функцию, которая делает плоским вложенный массив.
// Для решения задачи нельзя использовать готовые методы для выравнивания массивов.

const flatten = (mass) => {
  const result = [];
  const recursion = (bigmass) => {
    bigmass.map((massive) => {
      if (Array.isArray(massive)) {
        return recursion(massive);
      }
      return result.push(massive);
    });
  };
  recursion(mass);
  return result;
};
export default flatten;

/* __tests__ */

import flatten from '../flatten.js';

describe('Flatten', () => {
  it('set 1', () => {
    const list = [];

    expect(flatten(list)).toEqual([]);
  });

  it('set 2', () => {
    const list = [1, 2, [3, 5], [[4, 3], 2]];

    expect(flatten(list)).toEqual([1, 2, 3, 5, 4, 3, 2]);
  });

  it('set 3', () => {
    const list = [[1, [5], [], [[-3, 'hi']]], 'string', 10, [[[5]]]];

    expect(flatten(list)).toEqual([1, 5, -3, 'hi', 'string', 10, 5]);
  });

  it('set 4', () => {
    const list = [1, 2, { a: 1 }, [3, 5], 2];

    expect(flatten(list)).toEqual([1, 2, { a: 1 }, 3, 5, 2]);
  });
});
