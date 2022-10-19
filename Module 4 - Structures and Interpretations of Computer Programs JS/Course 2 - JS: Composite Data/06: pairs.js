// Напишите и экспортируйте функции car() и cdr(), основываясь на реализации функции cons().

export const cons = (x, y) => (f) => f(x, y);

export const car = cons((x) => x);

export const cdr = cons((x, y) => y);

/* __tests__ */

import { cons, car, cdr } from '../pairs.js';

describe('Pairs', () => {
  it('test car', () => {
    const pair = cons(1, 5);

    const actualCar = car(pair);
    const expectedCar = 1;
    expect(actualCar).toBe(expectedCar);
  });

  it('test cdr', () => {
    const pair = cons(44, 4);

    const actualCdr = cdr(pair);
    const expectedCdr = 4;
    expect(actualCdr).toBe(expectedCdr);
  });

  it('pair 1', () => {
    const pair = cons(10, 100);

    const actualCar = car(pair);
    const expectedCar = 10;
    expect(actualCar).toBe(expectedCar);

    const actualCdr = cdr(pair);
    const expectedCdr = 100;
    expect(actualCdr).toBe(expectedCdr);
  });

  it('pair 2', () => {
    const pair = cons(-5, 'hello');

    const actualCar = car(pair);
    const expectedCar = -5;
    expect(actualCar).toBe(expectedCar);

    const actualCdr = cdr(pair);
    const expectedCdr = 'hello';
    expect(actualCdr).toBe(expectedCdr);
  });
});
