// Определите функцию max(), которая отличается от примера из урока только тем, что у нее первый параметр обязательный.

// Например:
// max(1,2,3);
// max(234);

function max(num: number, ...params: number[]): number {
  return Math.max(num, ...params);
}

export default max;

/* __tests__ */

import max from '../solution';

test('function', () => {
  expect(max(1, 3, 8)).toBe(8);
  expect(max(10)).toBe(10);
  expect(max(4, 1)).toBe(4);
});
