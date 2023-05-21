// Реализуйте функцию isInternationalPhone(), которая проверяет формат указанного телефона. Если телефон начинается с +, значит это международный формат.

const isInternationalPhone = (phone) => phone[0] === '+';

export default isInternationalPhone;

/* __tests__ */

import { test, expect } from '@jest/globals';
import isInternationalPhone from '../isInternationalPhone';

test('Check International Phone', () => {
  expect(isInternationalPhone('89602223423')).toBe(false);
  expect(isInternationalPhone('+79602223423')).toBe(true);
});
