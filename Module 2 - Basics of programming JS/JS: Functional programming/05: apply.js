const apply = (count, func, data) => {
  let result = data;
  for (let i = 0; i < count; i += 1) {
    result = func(result);
  }
  return result;
};
export default apply;

/* __tests__ */

import apply from '../apply';

test('apply', () => {
  expect(apply(0, Math.sqrt, 4)).toBe(4);
  expect(apply(1, Math.sqrt, 4)).toBe(2);
  expect(apply(2, Math.sqrt, 16)).toBe(2);

  expect(apply(1, (v) => v ** 2, 3)).toBe(9);
  expect(apply(5, (v) => v + 10, 3)).toBe(53);
});
