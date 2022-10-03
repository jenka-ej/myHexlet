export default (f1, f2) => (x) => f1(f2(x));

/* __tests__ */

import compose from '../compose';

test('compose', () => {
  expect(compose((v) => v, (v) => v)(10)).toBe(10);
  expect(compose((v) => v + 2, (v) => v)(10)).toBe(12);
  expect(compose((v) => v, (v) => v - 2)(10)).toBe(8);
  expect(compose((v) => v ** 2, (v) => v - 2)(2)).toBe(0);
  expect(compose((v) => v - 2, (v) => v ** 2)(2)).toBe(2);
});
