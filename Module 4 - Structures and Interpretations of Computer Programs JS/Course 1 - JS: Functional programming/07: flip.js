// Реализуйте и экспортируйте по умолчанию функцию, которая работает с функциями принимающими только два аргумента. 
// Единственная цель этой функции — это преобразовать другую функцию так, чтобы порядок её аргументов был обратным.

const flip = (f) => (a, b) => f(b, a);
export default flip;

/* __tests__ */

import flip from '../flip';

test('reverseSub', () => {
  const sub = (a, b) => a - b;
  const reverseSub = flip(sub);
  expect(reverseSub(1, 2)).toBe(1);
  expect(reverseSub(5, 3)).toBe(-2);
});

test('wop', () => {
  const wop = flip((a, b) => a ** b);
  expect(wop(1, 2)).toBe(2);
  expect(wop(3, 2)).toBe(8);
});
