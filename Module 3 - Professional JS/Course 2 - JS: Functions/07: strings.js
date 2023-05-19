// Реализуйте внутреннюю функцию takeLast(), которая возвращает последние n символов строки в обратном порядке. 
// Количество символов передаётся в takeLast() вторым параметром. Если передаётся пустая строка или строка меньше необходимой длины, функция должна вернуть null.

const takeLast = (str, length) => {
  if (str.length === 0 || str.length < length) {
    return null;
  }

  const result = [];
  for (let i = str.length - 1; result.length < length; i -= 1) {
    result.push(str[i]);
  }

  return result.join('');
};

/* __tests__ */

import run from '../strings.js';

test('strings test', () => {
  expect(run('')).toBeNull();
  expect(run('cb')).toBeNull();
  expect(run('power')).toBe('rewo');
  expect(run('kids')).toBe('sdik');
  expect(run('hexlet')).toBe('telx');
});
