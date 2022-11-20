// Функция игрового движка run() реализована только частично. Допишите недостающую часть логики отвечающую за итерации игровых ходов.
// В прошлых практиках отдельные элементы лога мы формировали с помощью пар: cons(cons(health1, health2), message). 
// Сейчас же каждый элемент лога сформируйте с помощью типа данных object со свойствами health1, health2 и message. 
// Таким образом, итоговый log должен содержать список объектов.

import { cons as consList, l, random, head, reverse, toString as listToString } from '@hexlet/pairs-data';

const run = (player1, player2, cards, customRandom) => {
  const iter = (h1, pl1, h2, pl2, order, list) => {
    const card = customRandom(cards);
    if (h1 <= 0) {
      const log = {
        health1: h1,
        health2: h2,
        message: `${pl1} был убит`,
      };
      return consList(log, list);
    }
    if (h2 <= 0) {
      const log = {
        health1: h1,
        health2: h2,
        message: `${pl2} был убит`,
      };
      return consList(log, list);
    }
    if (order === 1) {
      const { name } = card;
      const damage = card.damage(h2);
      const log = {
        health1: h1,
        health2: h2 - damage,
        message: `Игрок ${pl1} применил ${name} против ${pl2} и нанес урон ${damage}`,
      };
      return iter(h1, pl1, log.health2, pl2, 0, consList(log, list));
    }
    const { name } = card;
    const damage = card.damage(h1);
    const log = {
      health1: h1 - damage,
      health2: h2,
      message: `Игрок ${pl2} применил ${name} против ${pl1} и нанес урон ${damage}`,
    };
    return iter(log.health1, pl1, h2, pl2, 1, consList(log, list));
  };

  const startHealth = 10;
  const logItem = {
    health1: startHealth,
    health2: startHealth,
    message: 'Начинаем бой!',
  };
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};

export default (cards, customRandom = random) => (
  (name1, name2) => run(name1, name2, cards, customRandom)
);

/* __tests__ */

import { l, length, get } from '@hexlet/pairs-data';
import simpleCard from '../simpleCard.js';
import percentCard from '../percentCard.js';
import make from '../solution.js';

describe('CardGame', () => {
  it('#flow 1', () => {
    const cards = l(simpleCard('Королевский хлыст шанса', 5));
    const game = make(cards);
    const log = game('John', 'Ada');

    expect(length(log)).toBe(5);

    const step1 = get(0, log);
    expect(step1.health1).toBe(10);
    expect(step1.health2).toBe(10);

    const step2 = get(1, log);
    expect(step2.health1).toBe(10);
    expect(step2.health2).toBe(5);

    const step3 = get(2, log);
    expect(step3.health1).toBe(5);
    expect(step3.health2).toBe(5);

    const step4 = get(3, log);
    expect(step4.health1).toBe(5);
    expect(step4.health2).toBe(0);

    const step5 = get(4, log);
    expect(step5.health1).toBe(5);
    expect(step5.health2).toBe(0);
  });

  it('#flow 2', () => {
    let cardIndex = 2;
    const cards = l(
      simpleCard('Бул-Катосова награда издёвки', 7),
      percentCard('Покрытый царапинами клык демона коряги', 80),
    );
    const game = make(cards, (c) => {
      cardIndex = cardIndex === 0 ? 1 : 0;
      return get(cardIndex, c);
    });
    const log = game('John', 'Ada');

    expect(length(log)).toBe(5);

    const step1 = get(0, log);
    expect(step1.health1).toBe(10);
    expect(step1.health2).toBe(10);

    const step2 = get(1, log);
    expect(step2.health1).toBe(10);
    expect(step2.health2).toBe(3);

    const step3 = get(2, log);
    expect(step3.health1).toBe(2);
    expect(step3.health2).toBe(3);

    const step4 = get(3, log);
    expect(step4.health1).toBe(2);
    expect(step4.health2).toBe(-4);

    const step5 = get(4, log);
    expect(step5.health1).toBe(2);
    expect(step5.health2).toBe(-4);
  });

  it('#flow 3 (health order in log)', () => {
    let cardIndex = 2;
    const cards = l(
      simpleCard('Бул-Катосова награда издёвки', 3),
      simpleCard('Покрытый царапинами клык демона коряги', 10),
    );
    const game = make(cards, (c) => {
      cardIndex = cardIndex === 0 ? 1 : 0;
      return get(cardIndex, c);
    });
    const log = game('John', 'Ada');

    expect(length(log)).toBe(4);

    const step1 = get(0, log);
    expect(step1.health1).toBe(10);
    expect(step1.health2).toBe(10);

    const step2 = get(1, log);
    expect(step2.health1).toBe(10);
    expect(step2.health2).toBe(7);

    const step3 = get(2, log);
    expect(step3.health1).toBe(0);
    expect(step3.health2).toBe(7);

    const step4 = get(3, log);
    expect(step4.health1).toBe(0);
    expect(step4.health2).toBe(7);
  });
});
