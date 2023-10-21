// Реализуйте функцию formatPrice(), которая принимает число и возвращает строку с округлением до второго числа после запятой, если пришел null или undefined должна вернуться '$0.00'.

// formatPrice(3.145); // '$3.15'
// formatPrice(200); // '$200.00'
// formatPrice(); // '$0.00'
// formatPrice(null); // '$0.00'

function formatPrice(value?: number | null): string {
  const result: string = value ? `$${value.toFixed(2)}` : '$0.00';
  return result;
}

export default formatPrice;

/* __tests__ */

import formatPrice from '../solution';

test('formatPrice', () => {
  expect(formatPrice()).toBe('$0.00');
  expect(formatPrice(null)).toBe('$0.00');
  expect(formatPrice(200)).toBe('$200.00');
  expect(formatPrice(3.145)).toBe('$3.15');
});
