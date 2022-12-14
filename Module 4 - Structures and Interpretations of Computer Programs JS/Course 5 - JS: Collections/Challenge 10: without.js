// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход массив и элементы, которые должны отсутствовать в возвращаемом массиве.

const without = (coll, ...params) => {
  const newArray = [...params];
  return coll.filter((item) => !newArray.includes(item));
};
export default without;

/* __tests__ */

import without from '../without.js';

describe('Without', () => {
  it('should works', () => {
    const result = without([], 1, 2, 5);
    expect(result).toEqual([]);

    const result1 = without([2, 1, 2, 3], 1, 2, 5);
    expect(result1).toEqual([3]);

    const result2 = without([10, 'str', -3, 'world', 'hello', ''], 'hello', -3);
    expect(result2).toEqual([10, 'str', 'world', '']);
  });
});
