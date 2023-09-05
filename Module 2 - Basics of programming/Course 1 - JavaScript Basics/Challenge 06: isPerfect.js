// Создайте функцию isPerfect(), которая принимает число и возвращает true, если оно совершенное, и false — в ином случае.
// Совершенное число — положительное целое число, равное сумме его положительных делителей (не считая само число).
// Делитель — это число, на которое делится исходное число. Например, у числа 6 три делителя: 1, 2 и 3. Число 6 делится на любое из этих чисел.
// Так же 6 — идеальное число, потому что 6 = 1 + 2 + 3.
// isPerfect(6); // true
// isPerfect(7); // false

const isPerfect = (num) => {
  if (num === 0) {
    return false;
  }
  let sum = 0;
  for (let i = 1; i < num; i += 1) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num;
};

export default isPerfect;

/* __tests__ */

import isPerfect from '../isPerfect.js';

describe('isPerfect', () => {
  test('should return true', () => {
    expect(isPerfect(6)).toBe(true);
    expect(isPerfect(28)).toBe(true);
    expect(isPerfect(496)).toBe(true);
    expect(isPerfect(8128)).toBe(true);
  });

  test('should return false', () => {
    expect(isPerfect(-6)).toBe(false);
    expect(isPerfect(-28)).toBe(false);
    expect(isPerfect(44)).toBe(false);
    expect(isPerfect(0)).toBe(false);
    expect(isPerfect(10)).toBe(false);
    expect(isPerfect(44)).toBe(false);
  });
});
