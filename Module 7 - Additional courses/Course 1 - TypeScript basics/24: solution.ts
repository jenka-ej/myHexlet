// Реализуйте функцию reverse(), которая переворачивает массив чисел. Технически она должна возвращать новый массив, в котором элементы расположены в обратном порядке.
// Используйте модификатор readonly для входящего массива. Не используйте встроенный метод reverse().

// reverse([1, 2, 8]); // [8, 2, 1]
// reverse([10, 33, 7, 0]); // [0, 7, 33, 10]

function reverse(coll: readonly number[]): number[] {
  const result: number[] = [];
  for (let i = coll.length - 1; i >= 0; i -= 1) {
    result.push(coll[i]);
  }
  return result;
}

export default reverse;

/* __tests__ */

import reverse from '../solution';

test('function', () => {
  expect(reverse([])).toEqual([]);
  expect(reverse([1, 2])).toEqual([2, 1]);
  expect(reverse([8, 3, 9])).toEqual([9, 3, 8]);
});
