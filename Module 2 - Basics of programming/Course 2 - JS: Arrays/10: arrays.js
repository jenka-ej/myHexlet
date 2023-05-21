// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход в виде массива кошелек с деньгами и название валюты и 
// возвращает сумму денег указанной валюты.
// Параметры функции:
// 1) Массив, содержащий купюры разных валют с различными номиналами
// 2) Наименование валюты

const getTotalAmount = (money, currency) => {
  let sum = 0;

  for (const bill of money) {
    const currentCurrency = bill.slice(0, 3);
    if (currentCurrency !== currency) {
      continue;
    }
    const denomination = Number(bill.slice(4));
    sum += denomination;
  }

  return sum;
};

export default getTotalAmount;

/* __tests__ */

import getTotalAmount from '../arrays.js';

describe('getTotalAmount', () => {
  it('#test 1', () => {
    const money = ['eur 10', 'usd 1', 'usd 10', 'rub 50', 'usd 5'];
    expect(getTotalAmount(money, 'usd')).toBe(16);
  });

  it('#test 2', () => {
    const money = ['eur 10', 'usd 1', 'eur 5', 'rub 100', 'eur 20', 'eur 100', 'rub 200'];
    expect(getTotalAmount(money, 'eur')).toBe(135);
  });

  it('#test 3', () => {
    const money = ['eur 10', 'rub 50', 'eur 5', 'rub 10', 'rub 10', 'eur 100', 'rub 200'];
    expect(getTotalAmount(money, 'rub')).toBe(270);
  });
});
