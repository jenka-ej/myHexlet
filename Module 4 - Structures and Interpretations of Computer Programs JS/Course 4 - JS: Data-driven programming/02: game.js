// Допишите функцию iter(), которая является частью ядра игрового движка и описывает в себе логику одного хода.
// Алгоритм:
// Если здоровье игрока, которого атаковали на предыдущем шаге (в примерах этого и следующего пунктов мы предполагаем, что это первый игрок с именем name1), 
// меньше или равно 0, то добавляем в лог элемент с сообщением вида ${name1} был убит и возвращаем лог. Игра закончена.
// В ином случае, берём рандомную карту, вычисляем урон, записываем новое здоровье, формируем сообщение формата:
// Повторяем.

import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs'; // eslint-disable-line
import { cons as consList, l, random, head, reverse, toString as listToString } from '@hexlet/pairs-data'; // eslint-disable-line

const run = (player1, player2, cards) => {
  const iter = (health1, name1, health2, name2, order, log) => {
    const randomCard = random(cards);
    if (health1 <= 0) {
      const message = `${name1} был убит`;
      return consList(cons(cons(health1, health2), message), log);
    }
    if (health2 <= 0) {
      const message = `${name2} был убит`;
      return consList(cons(cons(health1, health2), message), log);
    }
    if (order === 1) {
      const message = `Игрок '${name1}' применил '${car(randomCard)}' против '${name2}' и нанёс урон '${cdr(randomCard)()}'`;
      const newOrder = 2;
      const newLog = consList(cons(cons(health1, health2 - cdr(randomCard)()), message), log);
      return iter(health1, name1, health2 - cdr(randomCard)(), name2, newOrder, newLog);
    }
    const message = `Игрок '${name2}' применил '${car(randomCard)}' против '${name1}' и нанёс урон '${cdr(randomCard)()}'`;
    const newOrder = 1;
    const newLog = consList(cons(cons(health1 - cdr(randomCard)(), health2), message), log);
    return iter(health1 - cdr(randomCard)(), name1, health2, name2, newOrder, newLog);
  };

  const startHealth = 10;
  const logItem = cons(cons(startHealth, startHealth), 'Начинаем бой!');
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};

export default (cards) => (name1, name2) => run(name1, name2, cards);

/* __tests__ */

import { cons, car, toString as pairToString } from '@hexlet/pairs';
import { l, length, get } from '@hexlet/pairs-data';
import make from '../game.js';

describe('CardGame', () => {
  it('should work 1', () => {
    const cards = l(cons('Костяная кочерга гробницы', () => 6));
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

  it('should work 2', () => {
    const cards = l(cons('Разъяряющая осада отчаяния', () => 5));
    const game = make(cards);
    const log = game('Mike', 'Alan');

    expect(length(log)).toBe(5);

    const step1 = get(0, log);
    expect(pairToString(car(step1))).toBe('(10, 10)');

    const step2 = get(1, log);
    expect(pairToString(car(step2))).toBe('(10, 5)');

    const step3 = get(2, log);
    expect(pairToString(car(step3))).toBe('(5, 5)');

    const step4 = get(3, log);
    expect(pairToString(car(step4))).toBe('(5, 0)');

    const step5 = get(4, log);
    expect(pairToString(car(step5))).toBe('(5, 0)');
  });
});
