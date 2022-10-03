const partialApply = (f, fix) => (a) => f(a, fix);
export default partialApply;

/* __tests__ */

import partialApply from '../partialApply';

test('partialApply', () => {
  const f1 = partialApply((a, b) => a ** b, 2);
  expect(f1(1)).toBe(1);
  expect(f1(10)).toBe(100);

  const f2 = partialApply((a, b) => a * b, 5);
  expect(f2(2)).toBe(10);
  expect(f2(5)).toBe(25);
});
