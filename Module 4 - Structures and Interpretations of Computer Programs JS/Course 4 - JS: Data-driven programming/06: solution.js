// Допишите недостающую логику работы с картами в функции игрового движка run().

import { cons, car } from '@hexlet/pairs';
import {
  cons as consList, l, random, head, reverse,
} from '@hexlet/pairs-data';

const run = (player1, player2, cards, customRandom) => {
  const iter = (health1, name1, health2, name2, order, log) => {
    if (health1 <= 0) {
      return consList(cons(car(head(log)), `${name1} был убит`), log);
    }
    const card = customRandom(cards);
    const damage = card('damage', health2);
    const cardName = card('getName');
    const newHealth = health2 - damage;

    const message = `Игрок '${name1}' применил '${cardName}' против '${name2}' и нанес урон '${damage}'`;
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

export default (cards, customRandom = random) => (name1, name2) => (
  run(name1, name2, cards, customRandom)
);

/* simpleCard.js */
// Реализуйте интерфейс типа simpleCard по аналогии с типом percentCard.

const make = (name, damage) => (message) => {
  switch (message) {
    case 'getName':
      return name;
    case 'damage':
      return damage;
    default:
      return 'undefined method';
  }
};

export default make;

/* __tests__ */

import { car, cdr, toString as pairToString } from '@hexlet/pairs';
import { l, length, get } from '@hexlet/pairs-data';
import simpleCard from '../simpleCard.js';
import percentCard from '../percentCard.js';
import make from '../solution.js';

describe('CardGame', () => {
  it('#flow 1', () => {
    const cards = l(simpleCard('Королевский хлыст шанса', 6));
    const game = make(cards);
    const log = game('John', 'Ada');

    expect(length(log)).toBe(5);

    const step1 = get(0, log);
    expect(pairToString(car(step1))).toBe('(10, 10)');

    const step2 = get(1, log);
    expect(pairToString(car(step2))).toBe('(10, 4)');

    const step3 = get(2, log);
    expect(pairToString(car(step3))).toBe('(4, 4)');

    const step4 = get(3, log);
    expect(pairToString(car(step4))).toBe('(4, -2)');

    const step5 = get(4, log);
    expect(pairToString(car(step5))).toBe('(4, -2)');
  });

  it('#flow 2', () => {
    let cardIndex = 1;
    const cards = l(
      simpleCard('Бул-Катосова награда издёвки', 4),
      percentCard('Покрытый царапинами клык демона коряги', 50),
    );
    const game = make(cards, (c) => {
      cardIndex = cardIndex === 0 ? 1 : 0;
      return get(cardIndex, c);
    });
    const log = game('John', 'Ada');

    expect(length(log)).toBe(7);

    const step1 = get(0, log);
    expect(pairToString(car(step1))).toBe('(10, 10)');

    const step2 = get(1, log);
    expect(pairToString(car(step2))).toBe('(10, 6)');

    const step3 = get(2, log);
    expect(pairToString(car(step3))).toBe('(5, 6)');
    expect(cdr(step3)).toBe("Игрок 'Ada' применил 'Покрытый царапинами клык демона коряги' против 'John' и нанес урон '5'");

    const step4 = get(3, log);
    expect(pairToString(car(step4))).toBe('(5, 2)');

    const step5 = get(4, log);
    expect(pairToString(car(step5))).toBe('(2, 2)');

    const step6 = get(5, log);
    expect(pairToString(car(step6))).toBe('(2, -2)');

    const step7 = get(6, log);
    expect(pairToString(car(step7))).toBe('(2, -2)');
  });
});
