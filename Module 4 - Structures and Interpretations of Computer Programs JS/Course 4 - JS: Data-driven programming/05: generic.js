// Реализуйте функцию getMethod(), которая производит поиск конкретной реализации функции для переданного типа.

import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs'; // eslint-disable-line
import { cons as consList, isEmpty, l, head, tail } from '@hexlet/pairs-data'; // eslint-disable-line
import { attach, typeTag, contents } from '@hexlet/tagged-types';

let methods = l();

export const getMethod = (obj, methodName) => {
  const recursion = (list) => {
    const currObj = head(list);
    if (typeTag(obj) === typeTag(currObj) && methodName === car(contents(currObj))) {
      return cdr(contents(currObj));
    }
    return recursion(tail(list));
  };
  return recursion(methods);
};

export const definer = (type) => (methodName, f) => {
  methods = consList(attach(type, cons(methodName, f)), methods);
};

/* card.js */
// Реализуйте и экспортируйте обобщенную функцию damage() отвечающую за вычисление нанесённого урона.

import { contents } from '@hexlet/tagged-types';
import { getMethod } from './generic.js';

export const getName = (self) => getMethod(self, 'getName')(contents(self));

export const damage = (self, health) => getMethod(self, 'damage')(contents(self), health);

/* simpleCard.js */
// Реализуйте интерфейс типа SimpleCard.

import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs'; // eslint-disable-line
import { attach } from '@hexlet/tagged-types';
import { definer } from './generic.js';

const defmethod = definer('SimpleCard');

const make = (name, linear) => attach('SimpleCard', cons(name, linear));

export default make;

defmethod('getName', (self) => car(self));

defmethod('damage', (self) => cdr(self));

/* __tests__ */

import { car, cdr, toString as pairToString } from '@hexlet/pairs';
import { l, length, get } from '@hexlet/pairs-data';
import SimpleCard from '../simpleCard.js';
import PercentCard from '../percentCard.js';
import make from '../solution.js';

describe('CardGame', () => {
  it('#flow 1', () => {
    const cards = l(SimpleCard('Королевский хлыст шанса', 6));
    const game = make(cards);
    const log = game('John', 'Ada');

    expect(length(log)).toBe(5);

    const step1 = get(0, log);
    expect(pairToString(car(step1))).toBe('(10, 10)');

    const step2 = get(1, log);
    expect(pairToString(car(step2))).toBe('(10, 4)');
    expect(cdr(step2)).toBe(`Игрок 'John' применил 'Королевский хлыст шанса'
      против 'Ada' и нанес урон '6'`);

    const step3 = get(2, log);
    expect(pairToString(car(step3))).toBe('(4, 4)');

    const step4 = get(3, log);
    expect(pairToString(car(step4))).toBe('(4, -2)');

    const step5 = get(4, log);
    expect(pairToString(car(step5))).toBe('(4, -2)');
  });

  it('#flow 2', () => {
    let cardIndex = 2;
    const cards = l(
      SimpleCard('Бул-Катосова награда издёвки', 7),
      PercentCard('Покрытый царапинами клык демона коряги', 80),
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
    expect(cdr(step3)).toBe(`Игрок 'Ada' применил 'Покрытый царапинами клык демона коряги'
      против 'John' и нанес урон '8'`);

    const step4 = get(3, log);
    expect(pairToString(car(step4))).toBe('(2, -4)');

    const step5 = get(4, log);
    expect(pairToString(car(step5))).toBe('(2, -4)');
  });
});
