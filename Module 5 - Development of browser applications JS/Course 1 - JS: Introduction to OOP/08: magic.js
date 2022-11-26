// Реализуйте и экспортируйте по умолчанию функцию, которая работает следующим образом:
// 1) Принимает на вход любое количество аргументов и возвращает функцию, которая, в свою очередь, 
// принимает на вход любое количество аргументов и так до бесконечности (привет, рекурсия ;)).
// 2) Аргументами могут быть только числа.
// 3) Результат вызова этой функции при проверке на равенство должен быть равен сумме всех аргументов всех подфункций.

const magic = (...nums) => {
  const result = nums.reduce((acc, num) => acc + num, 0);
  const inner = (...newNums) => magic(result, ...newNums);
  inner.valueOf = () => nums.reduce((acc, num) => acc + num, 0);
  return inner;
};

export default magic;

/* __tests__ */

import magic from '../magic.js';

describe('magic', () => {
  it('calculate sum', () => {
    expect(magic() + 0).toBe(0);
    expect(magic() + 1).toBe(1);
    expect(magic(5, 2, -8) + 2).toBe(1);
    expect(magic(1, 2)(3, 4, 5)(6)(7, 10) - 8).toBe(30);
    expect(magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) + 7).toBe(20);
  });

  it('shouldn\'t have global state', () => {
    expect(magic() + 0).toBe(0);
    expect(magic() + 1).toBe(1);

    magic(4, 5);

    expect(magic(5, 2, -8) + 2).toBe(1);
    expect(magic(1, 2)(3, 4, 5)(6)(7, 10) - 8).toBe(30);
    expect(magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) + 7).toBe(20);

    magic(1, 3, 4);
    expect(magic(5) + 1).toBe(6);
  });

  it('shouldn\'t have shared state', () => {
    const func = magic(4, 5);

    expect(func(5) + 1).toBe(15);
    expect(func(5) + 1).toBe(15);
  });
});
