// "Счастливым" называют билет с номером, в котором сумма первой половины цифр равна сумме второй половины цифр.
// Номера могут быть произвольной длины, с единственным условием, что количество цифр всегда чётно, например: 33 или 2341 и так далее.
// Билет с номером 385916 — счастливый, так как 3 + 8 + 5 === 9 + 1 + 6. Билет с номером 231002 не является счастливым, так как 2 + 3 + 1 !== 0 + 0 + 2.
// Реализуйте и экспортируйте по умолчанию функцию, проверяющую является ли номер счастливым (номер — всегда строка).
// Функция должна возвращать true, если билет счастливый, или false, если нет.

const isHappyTicket = (str) => {
  const middleIndex = str.length / 2;
  let firstSum = 0;
  let secondSum = 0;
  for (let i = 0; i < middleIndex; i += 1) {
    firstSum += Number(str[i]);
  }
  for (let k = middleIndex; k < str.length; k += 1) {
    secondSum += Number(str[k]);
  }
  return firstSum === secondSum;
};

export default isHappyTicket;

/* __tests__ */

import isHappyTicket from '../isHappyTicket.js';

test('is happy ticket', () => {
  expect(isHappyTicket('060006')).toBe(true);
  expect(isHappyTicket('123321')).toBe(true);
  expect(isHappyTicket('341800')).toBe(true);
  expect(isHappyTicket('812146')).toBe(true);
});

test('is not happy ticket', () => {
  expect(isHappyTicket('000001')).toBe(false);
  expect(isHappyTicket('123567')).toBe(false);
  expect(isHappyTicket('213612')).toBe(false);
});
