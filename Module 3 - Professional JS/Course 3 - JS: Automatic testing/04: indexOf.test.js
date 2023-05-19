// Напишите тесты для функции indexOf(items, value, [fromIndex=0]), которая возвращает индекс первого вхождения переданного элемента в массив, 
// начиная поиск с индекса fromIndex, значение которого по умолчанию равно нулю.

import _ from 'lodash';

const functions = {
  right1: (items, value, fromIndex = 0) => items.indexOf(value, fromIndex),
  wrong1: (items, value, fromIndex = 1) => items.indexOf(value, fromIndex),
  wrong2: (items, value, fromIndex) => {
    const index = items.indexOf(value, fromIndex);
    return index === -1 ? 0 : index;
  },
  wrong3: (items, value) => items.indexOf(value),
  wrong4: (items, value) => _.lastIndexOf(items, value),
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import assert from 'power-assert';
import getFunction from '../functions.js';

const indexOf = getFunction();

assert(indexOf(['one', 'two', 8], 'one') === 0);
assert(indexOf([1, 8, 9, 3, 9], 9) === 2);
assert(indexOf([1, 8, 9, 3, 9], 9, 3) === 4);
assert(indexOf([], 9) === -1);
