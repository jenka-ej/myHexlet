// Все создаваемые функции, в рамках этого задания, должны быть реализованы независимо друг от друга, то есть их нельзя использовать для реализации друг друга.
// Реализуйте и экспортируйте функцию has(), которая проверяет, является ли переданное значение элементом списка.
// Реализуйте и экспортируйте функцию reverse(), которая переворачивает список, используя итеративный процесс.
// Реализуйте и экспортируйте функцию concat(), которая соединяет два списка, 
// используя рекурсивный процесс (попробуйте сначала представить, как работала бы функция copy(), которая принимает на вход список и возвращает его копию).

export const has = (list, number) => {
  if (isEmpty(list)) {
    return false;
  }
  if (head(list) !== number) {
    return has(tail(list), number);
  }
  return true;
};

export const reverse = (list1) => {
  const re = (list, iter) => (isEmpty(list) ? iter : re(tail(list), consList(head(list), iter)));
  return re(list1, null);
};

export const concat = (list1, list2) => {
  const re = (list, iter) => (isEmpty(list) ? iter : re(tail(list), consList(head(list), iter)));
  return re(re(list1, null), list2);
};

/* __tests__ */

import { l, toString as listToString } from '@hexlet/pairs-data';
import { has, reverse, concat } from '../list.js';

describe('Data', () => {
  it('#has', () => {
    const numbers = l(3, 4, 5, 8);
    expect(has(numbers, 3)).toBe(true);
    expect(has(numbers, 8)).toBe(true);
    expect(has(numbers, 0)).toBe(false);
    expect(has(numbers, 7)).toBe(false);
  });

  it('#reverse', () => {
    const numbers = l(3, 4, 5);
    const numbers2 = l(1, 5, 2, 8);
    expect(listToString(reverse(numbers))).toBe('(5, 4, 3)');
    expect(listToString(reverse(numbers2))).toBe('(8, 2, 5, 1)');
    expect(listToString(reverse(l()))).toBe('()');
    expect(listToString(reverse(l(1)))).toBe('(1)');
    expect(listToString(reverse(l(1, 2)))).toBe('(2, 1)');
  });

  it('#concat', () => {
    const numbers = l(3, 4, 5, 8);
    const numbers2 = l(3, 2, 9);
    expect(listToString(concat(numbers, numbers2))).toBe('(3, 4, 5, 8, 3, 2, 9)');
    expect(listToString(concat(numbers, l()))).toBe('(3, 4, 5, 8)');
    expect(listToString(concat(l(), numbers2))).toBe('(3, 2, 9)');
    expect(listToString(concat(l(1, 7, 8, 13, 5, 17, 22, 99, 53, 19), numbers2)))
      .toBe('(1, 7, 8, 13, 5, 17, 22, 99, 53, 19, 3, 2, 9)');
  });
});
