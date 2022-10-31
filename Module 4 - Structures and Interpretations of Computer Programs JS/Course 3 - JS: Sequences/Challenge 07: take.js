// Реализуйте и экспортируйте по умолчанию функцию, которая возвращает список, 
// состоящий из первых n (значение передается первым параметром) элементов исходного (переданного вторым параметром) списка.

import { l, isEmpty, head, tail, cons, toString as listToString } from '@hexlet/pairs-data';

const take = (counter, list) => {
  if (counter === 0) {
    return list;
  }
  if (isEmpty(list)) {
    return list;
  }
  if (counter === 1) {
    return cons(head(list), l());
  }
  return cons(head(list), take(counter - 1, tail(list)));
};
export default take;

/* __tests__ */

import { l, toString as listToString } from '@hexlet/pairs-data'; // eslint-disable-line
import take from '../take.js';

describe('Take', () => {
  it('set 1', () => {
    expect(listToString(take(3, l()))).toBe(listToString(l()));
  });

  it('set 2', () => {
    expect(listToString(take(3, l(1, 2)))).toBe(listToString(l(1, 2)));
  });

  it('set 3', () => {
    expect(listToString(take(1, l('op', 'hop')))).toBe(listToString(l('op')));
  });
});
