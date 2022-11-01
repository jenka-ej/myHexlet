// Реализуйте и экспортируйте по умолчанию функцию, которая делает плоским вложенный список.

import { l, reverse, toString as listToString, isList, cons, reduce, concat } from '@hexlet/pairs-data'; // eslint-disable-line

const flatten = (list) => {
  const cb = (element, acc) => {
    if (isList(element)) {
      return reduce(cb, acc, element);
    }
    return cons(element, acc);
  };
  return reverse(reduce(cb, l(), list));
};
export default flatten;

/* __tests__ */

import { l, toString as listToString } from '@hexlet/pairs-data';
import flatten from '../flatten.js';

describe('Flatten', () => {
  it('set 1', () => {
    const list = l();

    expect(listToString(flatten(list))).toBe('()');
  });

  it('set 2', () => {
    const list = l(1, 2, l(3, 5), l(l(4, 3), 2));

    expect(listToString(flatten(list))).toBe('(1, 2, 3, 5, 4, 3, 2)');
  });

  it('set 3', () => {
    const list = l(l(1, l(5), l(), l(l(-3, 'hi'))), 'string', 10, l(l(l(5))));

    expect(listToString(flatten(list))).toBe('(1, 5, -3, hi, string, 10, 5)');
  });
});
