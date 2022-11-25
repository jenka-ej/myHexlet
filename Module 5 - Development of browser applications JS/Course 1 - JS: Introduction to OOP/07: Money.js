// Реализуйте и экспортируйте по умолчанию абстракцию "Деньги". Она знает о валюте денег, позволяет их конвертировать в другие валюты, 
// выполнять арифметические операции и форматировать вывод. Список методов:
// Money(value, currency = 'usd') – создает объект-деньги.
// Money.prototype.getValue() – возвращает стоимость в виде числа
// Money.prototype.getCurrency() – возвращает валюту денег
// Money.prototype.exchangeTo(currency) – возвращает новый объект-деньги, где значение конвертировано в указанную валюту
// Money.prototype.add(money) – возвращает новый объект-деньги, который представляет из себя сумму исходных и переданных денег, 
// в валюте исходных денег (внутри возможна конвертация если валюты не совпадают)
// Money.prototype.format() – возвращает локализованное представление денег удобное для вывода

function Money(value, currency = 'usd') {
  this.value = value;
  this.currency = currency;
}

Money.prototype.getValue = function getValue() {
  return this.value;
};

Money.prototype.getCurrency = function getCurrency() {
  return this.currency;
};

Money.prototype.exchangeTo = function exchangeTo(currency) {
  if (currency === this.getCurrency()) {
    return new Money(this.getValue(), this.getCurrency());
  }
  const usdToEur = new Money(this.getValue() * 0.7, currency);
  const eurToUsd = new Money(this.getValue() * 1.2, currency);
  return currency === 'eur' ? usdToEur : eurToUsd;
};

Money.prototype.add = function add(money) {
  const currCurency = this.getCurrency();
  const currValue = this.getValue();
  if (currCurency !== money.getCurrency()) {
    return new Money(currValue + money.exchangeTo(currCurency).getValue(), currCurency);
  }
  return new Money(currValue + money.getValue(), currCurency);
};

Money.prototype.format = function format() {
  const currCurency = this.getCurrency();
  const usdFormat = (this.getValue()).toLocaleString(undefined, { style: 'currency', currency: 'usd' });
  const eurFormat = (this.getValue()).toLocaleString(undefined, { style: 'currency', currency: 'eur' });
  return currCurency === 'usd' ? usdFormat : eurFormat;
};

export default Money;

/* __tests__ */

import Money from '../Money.js';

test('Money', () => {
  const money1 = new Money(100);
  expect(money1.getValue()).toBe(100);
  expect(money1.exchangeTo('eur').getValue()).toBe(70);
  expect(money1.exchangeTo('eur').getCurrency()).toBe('eur');
  expect(money1.exchangeTo('usd').getValue()).toBe(100);
  const money2 = new Money(200, 'eur');
  expect(money2.getValue()).toBe(200);
  const money3 = money2.add(money1);
  expect(money3.getValue()).toBe(270);
  const money4 = money1.add(money2);
  expect(money4.getValue()).toBe(340);

  expect(money1.format()).toBe('$100.00');
  expect(money2.format()).toBe('€200.00');

  const money5 = new Money(10000);
  expect(money5.format()).toBe('$10,000.00');

  const money6 = money3.add(money2);
  expect(money6.getValue()).toBe(470);
  const money7 = new Money(10.20);
  expect(money7.format()).toBe('$10.20');
});
