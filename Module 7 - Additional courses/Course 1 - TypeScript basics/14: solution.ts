// Реализуйте функцию map(). Она должна принимать на вход массив чисел и колбек, который будет использоваться для преобразования
// каждого числа из массива в другое число. Функция возвращает массив с новыми числами:

// map([3, 9], (n) => n - 3);
// [0, 6]
 
// map([8, 9], (n) => n + 8);
// [16, 17]

// Параметры функции:
// 1) Массив чисел
// 2) Анонимная функция, которая принимает на вход число и возвращает число. У этой функции есть необязательный параметр — индекс элемента в массиве

// map([8, 9], (n, index) => index + n);
// [8, 10]

function map(coll: number[], callback: (num: number, index: number) => number): number[] {
  const result: number[] = [];
  coll.forEach((n, index) => result.push(callback(n, index)));
  return result;
}

export default map;

/* __tests__ */

import map from '../solution';

test('map', () => {
  const result = map([], (n: number) => n + 3);
  expect(result).toEqual([]);

  const result2 = map([3, 9], (n: number) => n - 3);
  expect(result2).toEqual([0, 6]);

  const result3 = map([8, 9], (n: number) => n + 8);
  expect(result3).toEqual([16, 17]);

  const result4 = map([10, 10, 10], (n: number, index) => n + index);
  expect(result4).toEqual([10, 11, 12]);
});
