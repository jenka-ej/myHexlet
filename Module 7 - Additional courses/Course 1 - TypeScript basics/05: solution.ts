// Реализуйте функцию getHiddenCard(). Она принимает на вход номер кредитки, который состоит из 16 цифр, в виде строки и возвращает его скрытую версию.
// Эта версия может использоваться на сайте для отображения. Например, если номер исходной карты был 2034399002125581, то скрытая версия выглядит так: ****5581.
// Получается, функция заменяет первые 12 символов на звездочки. Количество звездочек регулируется вторым необязательным параметром. Значение по умолчанию — 4.

// Кредитка передается внутрь как строка
// getHiddenCard('1234567812345678', 2) // "**5678"
// getHiddenCard('1234567812345678', 3) // "***5678"
// getHiddenCard('1234567812345678')    // "****5678"
// getHiddenCard('2034399002121100', 1) // "*1100"

function getHiddenCard(nums: string, hidden = 4): string {
  let hiddenStars = '';
  for (let i = 0; i < hidden; i += 1) {
    hiddenStars += '*';
  }
  return `${hiddenStars}${nums.slice(-4)}`;
}

export default getHiddenCard;

/* __tests__ */

import * as ta from 'type-assertions';

import getHiddenCard from '../solution';

test('getHiddenCard', () => {
  expect(getHiddenCard('1234123412341234')).toEqual('****1234');
  expect(getHiddenCard('1234123412344321')).toEqual('****4321');
  expect(getHiddenCard('1234123412344321', 2)).toEqual('**4321');
  expect(getHiddenCard('1234123412341234', 12)).toEqual('************1234');

  ta.assert<ta.Equal<ReturnType<typeof getHiddenCard>, string>>();
});
