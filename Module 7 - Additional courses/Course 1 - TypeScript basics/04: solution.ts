// Допишите тело функции repeat(), которая повторяет строку указанное количество раз.
// Функция должна возвращать полученный результат. Постарайтесь не использовать встроенные методы, для такой реализации вам понадобится цикл.
// repeat('hexlet', 2); // hexlethexlet
// repeat('wo', 3); // wowowo

function repeat(text: string, count: number) {
  let result = '';
  for (let i = 0; i < count; i += 1) {
    result += text;
  }
  return result;
}

export default repeat;

/* __tests__ */

import * as ta from 'type-assertions';

import repeat from '../solution';

test('repeat', () => {
  expect(repeat('wow', 3)).toBe('wowwowwow');
  expect(repeat('s', 2)).toBe('ss');
  expect(repeat('s', 0)).toBe('');

  ta.assert<ta.Equal<ReturnType<typeof repeat>, string>>();
});
