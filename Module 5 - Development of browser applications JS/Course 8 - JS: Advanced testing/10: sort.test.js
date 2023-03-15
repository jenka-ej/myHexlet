// Протестируйте функцию sort(), которая сортирует массив целых чисел по возрастанию. Функция возвращает новый отсортированный массив. 
// При тестировании используйте комбинированный подход.

// const numbers = [3, 1, 0, 7, 5];
// const sorted = sort(numbers);
// console.log(sorted); // => [0, 1, 3, 5, 7]

/* functions.js */

const functions = {
  right1: (data) => data.slice().sort((a, b) => a - b),
  wrong1: (data) => data.slice().sort((a, b) => b - a),
  wrong2: (data) => data.slice().reverse(),
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import fc from 'fast-check';
import getFunction from '../functions.js';

const sort = getFunction();

const numbers = [0, 3, 2, 1, 1, 4, 2];
test('usual', () => {
  expect(sort(numbers)).toBeSorted();
});

test('property-based', () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
      expect(sort([a, b, c])).toBeSorted();
    }),
  );
});
