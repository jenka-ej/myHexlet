// Создайте и экспортируйте по умолчанию функцию, которая принимает на вход колоду карт и функцию выбора случайного элемента из списка (списка карт). 
// Второй аргумент — опциональный, его значение по умолчанию — функция random() из @hexlet/pairs-data. Ваша функция будет возвращать другую функцию. 
// При этом возвращаемая функция работает следующим образом:
// 1) Принимает на вход имена игроков
// 2) Запускает игру
// 3) Возвращает лог игры
// Допишите вызов пользовательской функции random() в функции run().

import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs'; // eslint-disable-line
import { cons as consList, l, random, head, reverse, toString as listToString } from '@hexlet/pairs-data'; // eslint-disable-line

const run = (player1, player2, cards, customRandom) => {
  const iter = (health1, name1, health2, name2, order, log) => {
    if (health1 <= 0) {
      return consList(cons(car(head(log)), `${name1} был убит`), log);
    }
    // BEGIN (write your solution here)
    const card = customRandom(cards);
    // END
    const cardName = car(card);
    const damage = cdr(card)(health2);
    const newHealth = health2 - damage;

    const message = `Игрок '${name1}' применил '${cardName}'
      против '${name2}' и нанес урон '${damage}'`;
    let stats;
    if (order === 1) {
      stats = cons(cons(health1, newHealth), message);
    } else if (order === 2) {
      stats = cons(cons(newHealth, health1), message);
    }
    const newLog = consList(stats, log);
    return iter(newHealth, name2, health1, name1, order === 1 ? 2 : 1, newLog);
  };

  const startHealth = 10;
  const logItem = cons(cons(startHealth, startHealth), 'Начинаем бой!');
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};

// BEGIN (write your solution here)
const game = (collCards, fRandom = random) => {
  const start = (name1, name2) => run(name1, name2, collCards, fRandom);
  return start;
};
export default game;

/* __tests__ */

import { cons, car, toString as pairToString } from '@hexlet/pairs';
import { l, length, get } from '@hexlet/pairs-data';
import make from '../game.js';

const cards = l(
  cons('Костяная кочерга гробницы', () => 7),
  cons('Памятный металл палача', (health) => Math.round(health * 0.8)),
);

test('CardGame', () => {
  let cardIndex = 1;
  const game = make(cards, (c) => {
    cardIndex = cardIndex === 0 ? 1 : 0;
    return get(cardIndex, c);
  });
  const log = game('John', 'Ada');

  expect(length(log)).toBe(5);

  const step1 = get(0, log);
  expect(pairToString(car(step1))).toBe('(10, 10)');

  const step2 = get(1, log);
  expect(pairToString(car(step2))).toBe('(10, 3)');

  const step3 = get(2, log);
  expect(pairToString(car(step3))).toBe('(2, 3)');

  const step4 = get(3, log);
  expect(pairToString(car(step4))).toBe('(2, -4)');

  const step5 = get(4, log);
  expect(pairToString(car(step5))).toBe('(2, -4)');
});

test('default', () => {
  const game = make(cards);
  const log = game('John', 'Ada');
  expect(log).not.toBeUndefined();
});
