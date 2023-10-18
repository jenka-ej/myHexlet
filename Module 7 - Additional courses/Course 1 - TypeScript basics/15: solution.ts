// Попробуйте самостоятельно определить функцию forEach() для чисел:

// forEach([1, 2, 3], (n) => console.log(n));
// 1
// 2
// 3
 
// const result = [];
// forEach([1, 2, 3], (n) => result.push(n));
// [1, 2, 3]

// Параметры функции:
// 1) Массив чисел
// 2) Анонимная функция, которая принимает на вход число и возвращает void. У этой функции есть необязательный параметр — индекс элемента в массиве
// forEach([8, 9], (n, index) => console.log(index + n));
// 8
// 10

function forEach(coll: number[], callback: (num: number, index: number) => void): void {
  for (let i = 0; i < coll.length; i += 1) {
    callback(coll[i], i);
  }
}

export default forEach;

/* __tests__ */

import forEach from '../solution';

test('forEach', () => {
  const result: number[] = [];
  forEach([], (n: number) => result.push(n));
  expect(result).toEqual([]);

  const result2: number[] = [];
  forEach([3, 9], (n: number) => result2.push(n + 1));
  expect(result2).toEqual([4, 10]);

  const result3: number[] = [];
  forEach([8, 9], (n: number, i) => result3.push(n + i));
  expect(result3).toEqual([8, 10]);
});
