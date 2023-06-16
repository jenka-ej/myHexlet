// Реализуйте недостающую часть логики функции игрового движка run().

import { cons, car, toString as pairToString } from '@hexlet/pairs'; // eslint-disable-line
import { cons as consList, l, random, head, reverse, toString as listToString } from '@hexlet/pairs-data'; // eslint-disable-line
import { typeTag } from '@hexlet/tagged-types';
import { getName as getSimpleCardName, damage as simpleCardDamage } from './simpleCard.js';
import { getName as getPercentCardName, damage as percentCardDamage } from './percentCard.js';

const isSimpleCard = (card) => typeTag(card) === 'SimpleCard';
const isPercentCard = (card) => typeTag(card) === 'PercentCard';

const run = (player1, player2, cards, customRandom) => {
  const iter = (health1, name1, health2, name2, order, log) => {
    if (health1 <= 0) {
      return consList(cons(car(head(log)), `${name1} был убит`), log);
    }
    const card = customRandom(cards);

    let cardName;
    let damage;

    if (isSimpleCard(card)) {
      cardName = getSimpleCardName(card);
      damage = simpleCardDamage(card);
    }
    if (isPercentCard(card)) {
      cardName = getPercentCardName(card);
      damage = percentCardDamage(card, health2);
    }

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

export default (cards, customRandom = random) => {
  const inner = (name1, name2) => run(name1, name2, cards, customRandom);
  return inner;
};

/* simpleCard.js */
// Реализуйте интерфейс работы карты с типом SimpleCard по аналогии с типом PercentCard. Второй параметр у конструктора - урон.

import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs'; // eslint-disable-line
import { attach, contents } from '@hexlet/tagged-types';

export const make = (name, linear) => attach('SimpleCard', cons(name, linear));

export const getName = (self) => car(contents(self));

export const damage = (self) => cdr(contents(self));

/* __tests__ */

import { car, toString as pairToString } from '@hexlet/pairs';
import { l, length, get } from '@hexlet/pairs-data';
import { make as makeSimpleCard } from '../simpleCard.js';
import { make as makePercentCard } from '../percentCard.js';
import make from '../solution.js';

describe('CardGame', () => {
  it('#flow 1', () => {
    const cards = l(makeSimpleCard('Жесткий ломатель мироздания', 6));
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
      makeSimpleCard('Ошарашивающие шорты равновесия', 7),
      makePercentCard('Фаланговая знатность утешения', 80),
    );
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
});
