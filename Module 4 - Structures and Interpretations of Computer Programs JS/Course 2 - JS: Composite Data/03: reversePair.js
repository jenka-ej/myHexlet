// Реализуйте функцию reversePair(), которая принимает на вход пару и возвращает другую, в которой значения переставлены местами.

import { cons, car, cdr, toString } from '@hexlet/pairs'; // eslint-disable-line

const reversePair = (pair) => cons(cdr(pair), car(pair));

export default reversePair;

/* __tests__ */

import { cons, toString } from '@hexlet/pairs';
import reversePair from '../reversePair.js';

test('reversePair', () => {
  expect(toString(reversePair(cons(4, 3)))).toBe(toString(cons(3, 4)));
  expect(toString(reversePair(cons(-10, 1)))).toBe(toString(cons(1, -10)));
});
