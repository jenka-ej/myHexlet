// Определите и экспортируйте тип CustomType, который может принимать следующие значения:
// 1) null
// 2) undefined
// 3) числа

export type CustomType = null | undefined | number;

/* __tests__ */

import type { CustomType } from '../solution';

test('CustomType', () => {
  const numberValue: CustomType = 1;
  expect(numberValue).toBe(1);

  const nullValue: CustomType = null;
  expect(nullValue).toBe(null);

  const undefinedValue: CustomType = undefined;
  expect(undefinedValue).toBe(undefined);
});
