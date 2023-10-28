// Реализуйте дженерик last(), который извлекает последний элемент из массива если он есть или null если его нет

// last([]); // null
// last([3, 2]); // 2
// last(['code-basics', 'hexlet']); // hexlet

function last<T>(coll: T[]): T {
  return coll[coll.length - 1] ?? null;
}

export default last;

/* __tests__ */

import * as ta from 'type-assertions';

import last from '../solution';

test('function', () => {
  expect(last([])).toBe(null);
  expect(last([3, 4])).toBe(4);
  expect(last(['cat', 'dog'])).toBe('dog');

  ta.assert<ta.Equal<ReturnType<typeof last<number>>, number | null>>();
});
