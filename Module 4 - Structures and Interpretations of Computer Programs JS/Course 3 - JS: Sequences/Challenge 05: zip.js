// Напишите и экспортируйте по умолчанию функцию zip(), которая принимает на вход два списка и возвращает третий, 
// в котором каждый элемент — это список элементов исходных списков, стоящих на тех же позициях.

import { l, isEmpty, head, tail, cons, reverse, toString as listToString } from '@hexlet/pairs-data'; // eslint-disable-line

const zip = (list1, list2) => {
  if (!isEmpty(list1) && !isEmpty(list2)) {
    if (!isEmpty(tail(list1)) && !isEmpty(tail(list2))) {
      return cons(l(head(list1), head(list2)), zip(tail(list1), tail(list2)));
    }
    return l(l(head(list1), head(list2)));
  }
  return l();
};
export default zip;

/* __tests__ */

import { l, toString as listToString } from '@hexlet/pairs-data';
import zip from '../zip.js';

describe('Zip', () => {
  it('set 1', () => {
    const list1 = l();
    const list2 = l();

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('()');
  });

  it('set 2', () => {
    const list1 = l(1, 5, 3, 8, 9);
    const list2 = l(2, 3, 2, 1);

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('((1, 2), (5, 3), (3, 2), (8, 1))');
  });

  it('set 3', () => {
    const list1 = l(2, 3, 2, 1);
    const list2 = l(1, 5, 3, 8, 9);

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('((2, 1), (3, 5), (2, 3), (1, 8))');
  });

  it('set 4', () => {
    const list1 = l(8, 3, 5, 1);
    const list2 = l(1, 2, 3, 2);

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('((8, 1), (3, 2), (5, 3), (1, 2))');
  });

  it('set 5', () => {
    const list1 = l(1, 2, 3);
    const list2 = l();

    const result = zip(list1, list2);
    expect(listToString(result)).toBe('()');
  });
});
