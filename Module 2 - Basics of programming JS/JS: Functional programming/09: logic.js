export const If = (f) => f;
export const True = (a) => () => a;
export const False = () => (b) => b;

/* __tests__ */

import { If, True, False } from '../logic.js';

test('Boolean', () => {
  expect(If(True)('fo')('bar')).toBe('fo');
  expect(If(False)('foo')('ba')).toBe('ba');
  expect(True()()).toBeUndefined();
  expect(False()()).toBeUndefined();
});
