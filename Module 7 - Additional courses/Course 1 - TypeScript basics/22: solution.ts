// Реализуйте функцию uniq(), которая убирает дубликаты из массива. Функция принимает на вход массив чисел и строк.
// Результатом работы функции должен быть новый массив, в котором сохраняется только первое вхождение каждого элемента. Порядок значений результата определяется порядком их появления в массиве.

// uniq([9, 9, 3, 8, 8]); // [9, 3, 8]
// uniq(['twinkle', 'twinkle', 'little', 'bat']); // ['twinkle', 'little', 'bat']
// uniq([1, 1, 3, 'oops!']); // [1, 3, 'oops!']

function uniq(coll: (number | string)[]): (number | string)[] {
  const result: (number | string)[] = [];
  coll.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });
  return result;
}

export default uniq;

/* __tests__ */

import uniq from '../solution';

test('function', () => {
  expect(uniq([])).toEqual([]);
  expect(uniq([2, 3, -100, -100, -100])).toEqual([2, 3, -100]);
  expect(uniq(['as', 'good', 'as', 'it', 'gets'])).toEqual([
    'as',
    'good',
    'it',
    'gets',
  ]);
  expect(uniq([1, 1, 3, 'oops!'])).toEqual([1, 3, 'oops!']);
});
