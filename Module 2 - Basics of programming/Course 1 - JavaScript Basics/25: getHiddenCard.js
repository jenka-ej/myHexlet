// Реализуйте функцию getHiddenCard(), который принимает на вход номер кредитки (состоящий из 16 цифр) в виде строки и возвращает его скрытую версию, 
// которая может использоваться на сайте для отображения. Если исходная карта имела номер 2034399002125581, то скрытая версия выглядит так ****5581. 
// Другими словами, функция заменяет первые 12 символов, на звездочки. Количество звездочек регулируется вторым необязательным параметром. Значение по умолчанию — 4.
// Для выполнения задания вам понадобится метод строки repeat(), который повторяет строку указанное количество раз.

const getHiddenCard = (cardNumber, starsCount = 4) => {
  const visibleDigitsLine = cardNumber.slice(12);
  return `${'*'.repeat(starsCount)}${visibleDigitsLine}`;
};

export default getHiddenCard;

/* __tests__ */

import { test, expect } from '@jest/globals';
import getHiddenCard from '../getHiddenCard';

test('getHiddenCard', () => {
  expect(getHiddenCard('1234123412341234')).toEqual('****1234');
  expect(getHiddenCard('1234123412344321')).toEqual('****4321');
  expect(getHiddenCard('1234123412344321', 2)).toEqual('**4321');
  expect(getHiddenCard('1234123412341234', 12)).toEqual('************1234');
});
