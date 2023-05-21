// 1) Создайте функцию getTriangleArea(), которая принимает два аргумента h и b и вычисляет площадь треугольника по формуле A = 1/2 * h * b, 
// где h — высота, а b — основание треугольника
// 2) Экспортируйте функцию
// Импортируйте функцию getTriangleArea() из модуля myMathModule.
// Создайте функцию, которая принимает аргумент n и возвращает площадь треугольника высотой n и основанием n2/2. 
// Используйте функцию square() (принимает число и возвращает его квадрат).
// Экспортируйте созданную функцию по умолчанию.

/* myMathModule.js */

export const getTrianglePerimeter = (a, b, c) => a + b + c;

export const getTriangleArea = (h, b) => {
  const area = (h * b) / 2;
  return area;
};

/* solution.js */

import square from './square.js';

import { getTriangleArea } from './myMathModule.js';

const solution = (n) => getTriangleArea(n, square(n) / 2);

export default solution;

/* __tests__ */

import solution from '../solution.js';

test('solution', () => {
  expect(solution(0)).toBe(0);
  expect(solution(10)).toBe(250);
  expect(solution(12)).toBe(432);
  expect(solution(14)).toBe(686);
});
