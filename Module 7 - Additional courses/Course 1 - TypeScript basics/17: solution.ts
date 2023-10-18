// Реализуйте функцию isPlainObject(), которая проверяет, является ли переданное значение объектом. Эта функция считает, что массив не объект:
// isPlainObject(1); // false
// isPlainObject('hexlet'); // false
// isPlainObject({}); // true
// isPlainObject({ name: 'code-basics' }); // true
// isPlainObject([1, 8]); // false
// isPlainObject(null); // false

function isPlainObject(arg: unknown): boolean {
  return arg instanceof Object && !Array.isArray(arg);
}

export default isPlainObject;

/* __tests__ */

import isPlainObject from '../solution';

test('function', () => {
  expect(isPlainObject(3)).toBe(false);
  expect(isPlainObject('hexlet')).toBe(false);
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject(null)).toBe(false);
});
