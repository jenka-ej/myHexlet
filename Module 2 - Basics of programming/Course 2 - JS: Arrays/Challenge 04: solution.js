// Треугольник Паскаля — бесконечная таблица биномиальных коэффициентов, имеющая треугольную форму. В этом треугольнике на вершине и по бокам стоят единицы. 
// Каждое число равно сумме двух расположенных над ним чисел. Строки треугольника симметричны относительно вертикальной оси.
// Напишите функцию generate, которая возвращает указанную строку треугольника паскаля в виде массива. Экспортируйте функцию по умолчанию.

// Пример:
// generate(1); // [1, 1]
// generate(4); // [1, 4, 6, 4, 1]

export default (string) => {
  const fac = (num) => {
    if (num === 0 || num === 1) {
      return 1;
    }
    return num * fac(num - 1);
  };

  const calcNumber = (index, row) => fac(row) / (fac(index) * (fac(row - index)));

  const result = [];
  for (let i = 0; i <= string; i += 1) {
    result.push(calcNumber(i, string));
  }
  return result;
};

/* __tests__ */

import generate from '../solution.js';

test('Pascal\'s Triangle', () => {
  expect(generate(0)).toEqual([1]);
  expect(generate(1)).toEqual([1, 1]);
  expect(generate(2)).toEqual([1, 2, 1]);
  expect(generate(3)).toEqual([1, 3, 3, 1]);
  expect(generate(4)).toEqual([1, 4, 6, 4, 1]);
  expect(generate(7)).toEqual([1, 7, 21, 35, 35, 21, 7, 1]);
  expect(generate(12)).toEqual([1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1]);
});
