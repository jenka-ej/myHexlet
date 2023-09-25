/* Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает переданные версии version1 и version2.
Если version1 > version2, то функция должна вернуть 1, если version1 < version2, то - -1, если же version1 === version2, то - 0.
Версия - это строка, в которой два числа (мажорная и минорные версии) разделены точкой, например: 12.11.
Важно понимать, что версия - это не число с плавающей точкой, а несколько чисел не связанных между собой.
Проверка на больше/меньше производится сравнением каждого числа независимо. Поэтому версия 0.12 больше версии 0.2.

Пример порядка версий:

0.1 < 1.1 < 1.2 < 1.11 < 13.37 */

export default (ver1, ver2) => {
  const [majorVer1, minorVer1] = ver1.split('.');
  const [majorVer2, minorVer2] = ver2.split('.');
  const diffMajor = Math.sign(majorVer1 - majorVer2);
  return diffMajor === 0 ? Math.sign(minorVer1 - minorVer2) : diffMajor;
};

/* __tests__ */

import compareVersion from '../solution.js';

test('compare version', () => {
  expect(compareVersion('0.1', '0.2')).toBe(-1);
  expect(compareVersion('0.2', '0.1')).toBe(1);
  expect(compareVersion('4.2', '4.2')).toBe(0);
  expect(compareVersion('0.2', '0.12')).toBe(-1);
  expect(compareVersion('3.2', '4.12')).toBe(-1);
  expect(compareVersion('3.2', '2.12')).toBe(1);
  expect(compareVersion('10.2', '2.12')).toBe(1);
});
