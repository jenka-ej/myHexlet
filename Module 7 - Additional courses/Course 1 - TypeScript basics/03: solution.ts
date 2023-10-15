// По образцу примера с суммой из урока напишите функцию, которая находит произведение переданных чисел:
// multiply(3, 8); // 24
// multiply(1, 2); // 2

function multiply(a: number, b: number) {
  return a * b;
}

export default multiply;

/* __tests__ */

import * as ta from 'type-assertions';

import multiply from '../solution';

test('multiply', () => {
  expect(multiply(1, 3)).toBe(3);

  ta.assert<ta.Equal<ReturnType<typeof multiply>, number>>();
});
