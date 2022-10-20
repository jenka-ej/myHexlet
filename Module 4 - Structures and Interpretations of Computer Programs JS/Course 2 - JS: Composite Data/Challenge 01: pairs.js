// Пары неотрицательных целых чисел можно представить числами и арифметическими операциями. Можно считать, что пара чисел a и b – это 2^a * 3^b.
// Функции car() и cdr() при этом будут просто вычислять значения a и b (кратности двойки и тройки, соответственно), раскладывая аргумент на множители.
// Например, имея пару 5, 8 в виде числа 209952 (2^5 * 3^8), можно получить первый элемент пары, разложив число на множители и вычислив факторизацию для числа 2, 
// а второй элемент пары – разложив число на множители и вычислив факторизацию для числа 3.
// Реализуйте и экспортируйте следующие функции в соответствии с алгоритмом выше:
// cons
// car
// cdr

export const cons = (a, b) => (2 ** a) * (3 ** b);

export const car = (pair) => {
  const recursion = (iter, num) => {
    if (num % 2 === 0) {
      return recursion(iter + 1, num / 2);
    }
    return iter;
  };
  return recursion(0, pair);
};

export const cdr = (pair) => {
  const recursion = (iter, num) => {
    if (num % 3 === 0) {
      return recursion(iter + 1, num / 3);
    }
    return iter;
  };
  return recursion(0, pair);
};

/* __tests__ */

import { cons, car, cdr } from '../pairs.js';

describe('Pairs', () => {
  it('1 set', () => {
    const pair = cons(0, 0);
    expect(pair).toBe(1);
    expect(car(pair)).toBe(0);
    expect(cdr(pair)).toBe(0);
  });

  it('2 set', () => {
    const pair = cons(1, 2);
    expect(pair).toBe(18);
    expect(car(pair)).toBe(1);
    expect(cdr(pair)).toBe(2);
  });

  it('3 set', () => {
    const pair = cons(2, 1);
    expect(pair).toBe(12);
    expect(car(pair)).toBe(2);
    expect(cdr(pair)).toBe(1);
  });

  it('4 set', () => {
    const pair = cons(5, 8);
    expect(pair).toBe(209952);
    expect(car(pair)).toBe(5);
    expect(cdr(pair)).toBe(8);
  });

  it('5 set', () => {
    const pair = cons(0, 0);
    const transit = cons(1, 1);
    expect(pair).toBe(1);
    expect(car(pair)).toBe(0);
    expect(cdr(pair)).toBe(0);
    expect(car(transit)).toBe(1);
    expect(cdr(transit)).toBe(1);
  });
});
