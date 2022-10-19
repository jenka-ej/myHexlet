// Реализуйте абстракцию для работы с рациональными числами, используя пары:
// Конструктор make(numer, denom).
// Селекторы numer (числитель) и denom (знаменатель).
// Функцию toString, возвращающую строковое представление рационального числа. Например для дроби 3/4 созданной так make(3, 4), строковым представлением будет 3 / 4.
// Функцию-предикат isEqual, проверяющую равенство двух рациональных чисел. Например isEqual(make(1, 2), make(2, 4)).
// Функцию add, выполняющую сложение дробей.
// Функцию sub, выполняющую вычитание дробей.
// Функцию mul, выполняющую умножение дробей.
// Функцию div, выполняющую деление дробей.
// Экспортируйте созданные функции.

import { cons, car, cdr } from '@hexlet/pairs';

export const make = (numer, denom) => cons(numer, denom);

export const numer = (rat) => car(rat);

export const denom = (rat) => cdr(rat);

export const toString = (rat) => `${numer(rat)} / ${denom(rat)}`;

export const isEqual = (rat1, rat2) => {
  const n1 = numer(rat1);
  const n2 = numer(rat2);
  const d1 = denom(rat1);
  const d2 = denom(rat2);
  if ((n1 * d2) === (n2 * d1)) {
    return true;
  }
  return false;
};

export const add = (rat1, rat2) => {
  const n1 = numer(rat1);
  const n2 = numer(rat2);
  const d1 = denom(rat1);
  const d2 = denom(rat2);
  return make(n1 * d2 + n2 * d1, d1 * d2);
};

export const sub = (rat1, rat2) => {
  const n1 = numer(rat1);
  const n2 = numer(rat2);
  const d1 = denom(rat1);
  const d2 = denom(rat2);
  return make(n1 * d2 - n2 * d1, d1 * d2);
};

export const mul = (rat1, rat2) => {
  const n1 = numer(rat1);
  const n2 = numer(rat2);
  const d1 = denom(rat1);
  const d2 = denom(rat2);
  return make(n1 * n2, d1 * d2);
};

export const div = (rat1, rat2) => {
  const n1 = numer(rat1);
  const n2 = numer(rat2);
  const d1 = denom(rat1);
  const d2 = denom(rat2);
  return make(n1 * d2, n2 * d1);
};

/* __tests__ */

import {
  make, numer, denom, add, toString, isEqual, sub, mul, div,
} from '../rational.js';

const rat1 = make(2, 3);
const rat12 = make(1, 4);
const rat2 = make(3, 2);
const rat11 = make(2, 3);

test('selectors', () => {
  expect(numer(rat1)).toBe(2);
  expect(denom(rat1)).toBe(3);

  expect(numer(rat12)).toBe(1);
  expect(denom(rat12)).toBe(4);

  expect(numer(rat2)).toBe(3);
  expect(denom(rat2)).toBe(2);
});

test('toString', () => {
  expect(toString(rat12)).toBe('1 / 4');
});

test('isEqual', () => {
  expect(isEqual(rat1, rat12)).toBe(false);
  expect(isEqual(rat1, rat11)).toBe(true);
  expect(isEqual(rat1, rat2)).toBe(false);
});

test('add', () => {
  expect(toString(add(rat1, rat2)))
    .toBe(toString(make(13, 6)));

  expect(toString(add(rat1, rat12)))
    .toBe(toString(make(11, 12)));
});

test('sub', () => {
  expect(toString(sub(rat2, rat1)))
    .toBe(toString(make(5, 6)));

  expect(toString(sub(rat1, rat2)))
    .toBe(toString(make(-5, 6)));
});

test('mul', () => {
  expect(toString(mul(rat2, rat12)))
    .toBe(toString(make(3, 8)));

  expect(toString(mul(rat1, rat11)))
    .toBe(toString(make(4, 9)));
});

test('div', () => {
  expect(toString(div(rat1, rat2)))
    .toBe(toString(make(4, 9)));

  expect(toString(div(rat12, rat11)))
    .toBe(toString(make(3, 8)));
});
