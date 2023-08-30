// Реализуйте функцию fib() и экспортируйте её по умолчанию. Функция вычисляет положительные числа Фибоначчи.
// Аргументом является порядковый номер числа, нумерация чисел в последовательности начинается с нуля.

const fib = (iter) => {
  const mass = [];
  for (let i = 0; i <= iter; i += 1) {
    if (i === 0 || i === 1) {
      mass.push(i);
    } else {
      mass.push(mass[mass.length - 1] + mass[mass.length - 2]);
    }
  }
  return mass[mass.length - 1];
};

export default fib;

/* __tests__ */

import fib from '../solution.js';

test('solution', () => {
  expect(fib(0)).toBe(0);
  expect(fib(1)).toBe(1);
  expect(fib(2)).toBe(1);
  expect(fib(3)).toBe(2);
  expect(fib(4)).toBe(3);
  expect(fib(5)).toBe(5);
  expect(fib(10)).toBe(55);
});
