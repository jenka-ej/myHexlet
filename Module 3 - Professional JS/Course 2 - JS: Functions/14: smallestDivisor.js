// Реализуйте тело функции smallestDivisor(), используя итеративный процесс. Функция должна находить наименьший делитель заданного числа. 
// Число, передаваемое в функцию, больше нуля.
// Доп. условие: делитель должен быть больше единицы, за исключением случая, когда аргументом является единица (наименьшим делителем которой является также единица).
// Например, наименьший делитель числа 15 это 3.

const smallestDivisor = (num) => {
  const iter = (acc) => {
    if (acc > num / 2) {
      return num;
    }
    if (num % acc === 0) {
      return acc;
    }
    return iter(acc + 1);
  };

  return iter(2);
};

export default smallestDivisor;

/* __tests__ */

import smallestDivisor from '../smallestDivisor.js';

test('smallestDivisor', () => {
  expect(smallestDivisor(1)).toBe(1);
  expect(smallestDivisor(3)).toBe(3);
  expect(smallestDivisor(4)).toBe(2);
  expect(smallestDivisor(8)).toBe(2);
  expect(smallestDivisor(9)).toBe(3);
  expect(smallestDivisor(17)).toBe(17);
  expect(smallestDivisor(15)).toBe(3);
  expect(smallestDivisor(121)).toBe(11);
});
