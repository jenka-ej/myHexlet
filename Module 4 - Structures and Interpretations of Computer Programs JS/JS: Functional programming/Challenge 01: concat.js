// Реализуйте и экспортируйте по умолчанию каррированую версию функции, которая принимает на вход три строки и возвращает новую строчку составленную из трех входных.

export default (str1) => (str2) => (str3) => str1 + str2 + str3;

/* __tests__ */

import concat from '../concat.js';

test('compose', () => {
  expect(concat('')('')('')).toBe('');
  expect(concat('a')('bc')('f')).toBe('abcf');
});
