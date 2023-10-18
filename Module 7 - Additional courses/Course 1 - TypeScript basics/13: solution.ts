// Реализуйте функцию filter(), которая принимает на вход массив чисел и предикат.
// Последний будет использоваться для проверки каждого числа на соответствие требованиям:

// const numbers = [1, -5, 2, 3, 4, 133];
// filter(numbers, (n) => n > 3); // [4, 133]
// filter(numbers, (n) => n % 2 == 0); // [2, 4]

// Параметры функции:
// 1) Массив чисел
// 2) Анонимная функция, которая принимает на вход число и возвращает логическое значение

function filter(numbers: number[], callback: (num: number) => boolean) {
  const result: number[] = [];
  numbers.forEach((n) => {
    if (callback(n)) {
      result.push(n);
    }
  });
  return result;
}

export default filter;

/* __tests__ */

import filter from '../solution';

test('function', () => {
  const result = filter([], (n) => n > 3);
  expect(result).toEqual([]);

  const result2 = filter([3, 2, 8, 9], (n) => n > 3);
  expect(result2).toEqual([8, 9]);

  const result3 = filter([3, 2, 8, 9], (n) => n < 8);
  expect(result3).toEqual([3, 2]);
});
