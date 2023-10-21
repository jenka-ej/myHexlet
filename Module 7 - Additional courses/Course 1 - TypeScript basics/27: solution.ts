// Реализуйте функцию lastIndex(str, char), возвращающую индекс последнего вхождения символа в строку или null, если такого символа нет.

// const str = 'test';
// lastIndex(str, 't'); // 3
// lastIndex(str, 'p'); // null

function lastIndex(str: string, el: string): number | null {
  let result: number | null = null;
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === el) {
      result = i;
    }
  }
  return result;
}

export default lastIndex;

/* __tests__ */

import * as ta from 'type-assertions';

import lastIndex from '../solution';

test('lastIndex', () => {
  const str = 'jest';
  expect(lastIndex(str, 'j')).toBe(0);
  expect(lastIndex(str, 't')).toBe(3);
  expect(lastIndex(str, 'e')).toBe(1);
  expect(lastIndex(str, 'p')).toBeNull();
  expect(lastIndex('test', 't')).toBe(3);

  ta.assert<ta.Equal<ReturnType<typeof lastIndex>, number | null>>();
});
