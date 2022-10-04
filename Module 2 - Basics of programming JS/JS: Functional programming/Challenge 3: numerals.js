export const Zero = () => (z) => z;
export const Succ = (n) => (s) => (z) => s(n(s)(z));

/* __tests__ */

import { Zero, Succ } from '../numerals.js';

it('numerals', () => {
  const two = Succ(Succ(Zero));
  expect(two((x) => x + 1)(0)).toBe(2);

  const four = Succ(Succ(two));
  expect(four((x) => x + 1)(0)).toBe(4);

  expect(four(two((x) => x + 1))(0)).toBe(8);
});
